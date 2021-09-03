import React from "react";
import { signOut, authService } from "fbase";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const logoutClick = async () => {
    await signOut(authService);
    history.push("/");
  };
  return (
    <>
      <button onClick={logoutClick}>logout</button>
    </>
  );
};
export default Profile;
