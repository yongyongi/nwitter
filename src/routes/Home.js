import { db } from "fbase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  orderBy,
  quer,
} from "firebase/firestore";

import React, { useEffect, useState } from "react";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

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
      unsubscribe();
    };
  }, []);
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "nweets"), {
      nweet,
      createdAt: Date.now(),
    });
    setNweet("");
  };
  console.log(nweets);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="nweet" />
      </form>

      {nweets.map((nweet) => (
        <div key={nweet.id}>
          <h4>{nweet.nweet}</h4>
        </div>
      ))}
    </>
  );
};

export default Home;
