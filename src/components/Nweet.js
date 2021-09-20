import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "fbase";
import { deleteObject, ref } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.nweet);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    // console.log("집중", nweetObj); button은 각각의 Nweet에 붙어있으므로 클릭시 각각 다른 데이터를 props해온다.
    if (ok) {
      // 데이터 삭제
      await deleteDoc(doc(db, `nweets/${nweetObj.id}`)); // 컬렉션/문서
      if (nweetObj.attachmentUrl)
        await deleteObject(ref(storage, nweetObj.attachmentUrl));
    }
  };
  const toggleEditing = () => {
    setEditing((prev) => !prev);
    setNewNweet(nweetObj.nweet);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, `nweets/${nweetObj.id}`), {
      nweet: newNweet,
    });
    setEditing((prev) => !prev);
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewNweet(value);
  };
  return (
    <div className="nweet">
      {editing ? (
        <>
          {isOwner && ( //보안을 높이려고 설정.
            <>
              <form onSubmit={onSubmit} className="container nweetEdit">
                <input
                  type="text"
                  placeholder="Edit your nweet"
                  value={newNweet}
                  required
                  autoFocus
                  onChange={onChange}
                  className="formInput"
                />
                {/* <button onClick={onSubmit}>Edit</button> */}
                <input type="submit" value="Update Nweet" className="formBtn" />
              </form>
              <span className="formBtn cancelBtn" onClick={toggleEditing}>
                Cancel
              </span>
              {/* <button onClick={onSubmit}>Edit</button> 같은 form안에 넣어주면 enter키를 눌러도 제출이 된다.
            submit이 필요한 경우에는 input 아닐 경우에 button을 사용해도 상관없을 것 같다.
          */}
            </>
          )}
        </>
      ) : (
        <>
          <h4>{nweetObj.nweet}</h4>
          {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}

          {/* 내가 쓴 댓글만 삭제,수정 버튼 만들기 */}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
