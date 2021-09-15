import AuthForm from "components/AuthForm";
import {
  authService,
  googleProvider,
  signInWithPopup,
  githubProvider,
} from "fbase";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
  const socialClick = async (e) => {
    const {
      target: { name },
    } = e;
    if (name === "google") await signInWithPopup(authService, googleProvider);
    else if (name === "github")
      await signInWithPopup(authService, githubProvider);
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />

      <div className="authBtns">
        <button name="google" onClick={socialClick} className="authBtn">
          Continue with Google
          <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button name="github" onClick={socialClick} className="authBtn">
          Continue with Github
          <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Auth;
