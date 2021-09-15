import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "fbase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const NweetFactory = ({ userObj }) => {
  const inputAttachment = useRef();
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  };

  // 데이터 생성
  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      //파일 경로 참조 만들기
      const fileRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
      //storage 참조 경로로 파일 업로드 하기
      const uploadFile = await uploadString(fileRef, attachment, "data_url");
      console.log(uploadFile);
      //storage에 있는 파일 URL로 다운로드 받기
      attachmentUrl = await getDownloadURL(uploadFile.ref);
      inputAttachment.current.value = null;
    }

    //트윗할때, 메시지와 사진도 같이 firestore에 생성
    const nweetPosting = {
      nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await addDoc(collection(db, "nweets"), nweetPosting);
    setNweet("");
    setAttachment("");
  };
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;

    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => {
    setAttachment("");
    inputAttachment.current.value = null;
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        value={nweet}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input
        ref={inputAttachment}
        onChange={onFileChange}
        type="file"
        accept="image/*"
      />
      <input type="submit" value="Nweet" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;
