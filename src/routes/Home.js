import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import { db } from "fbase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  // 데이터 실시간 조회
  useEffect(() => {
    // const querySnapshot = await getDocs(collection(db, "nweets"));
    // querySnapshot.forEach((doc) => {
    //   const nweetObject = { ...doc.data(), id: doc.id };
    //   setNweets((prev) => [nweetObject, ...prev]);
    // }); // 실시간으로 바뀌지 않음, 실시간으로 바뀌려면 onSnapshot 사용 해야함.
    const q = query(collection(db, "nweets"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      //   querySnapshot.forEach((doc) => {
      //     const nweetObject = { ...doc.data(), id: doc.id };
      //     setNweets((prev) => [nweetObject, ...prev]);
      //   }); // 기존의 데이터가 남아 있는채로 중첩되어 랜더링됌, 실시간으로 바뀌긴함
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setNweets(newArray);
    });

    return () => {
      unsubscribe(); //불필요한 통신을 끊기 위해서 => 좀 더 찾아보기
    };
  }, []);

  return (
    <>
      <NweetFactory userObj={userObj} />
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid} // 내가 쓴 댓글을 boolean값으로 전달해준다.
          />
        ))}
      </div>
    </>
  );
};

export default Home;
