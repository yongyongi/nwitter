import { db } from "fbase";
import { addDoc, collection, getDocs } from "firebase/firestore";

import React, { useEffect, useState } from "react";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  useEffect(async () => {
    const querySnapshot = await getDocs(collection(db, "nweets"));
    querySnapshot.forEach((doc) => {
      const nweetObject = { ...doc.data(), id: doc.id };
      setNweets((prev) => [nweetObject, ...prev]);
    });
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
