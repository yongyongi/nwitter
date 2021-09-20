import React, { useState } from "react";
import { signOut, authService } from "fbase";
import { useHistory } from "react-router-dom";
import { updateProfile } from "firebase/auth";

const Profile = ({ refreshUser, userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const history = useHistory();

  const onLogOutClick = async () => {
    await signOut(authService);
    history.push("/");
  };

  //   //데이터베이스에서 내 nweet만 불러오기
  // const getMyNweets = async () => {
  //   const q = query(
  //     collection(db, "nweets"),
  //     orderBy("createdAt", "desc"),
  //     where("creatorId", "==", userObj.uid)
  //   );
  //   const querySnapshot = await getDocs(q);
  // };
  // useEffect(() => {
  //   getMyNweets();
  // });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, { displayName: newDisplayName });
    }
    refreshUser();
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          className="formInput"
        />
        <input type="submit" value="Update Profile" className="formBtn" />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};
export default Profile;
