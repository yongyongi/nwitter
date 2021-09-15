import AuthForm from "components/AuthForm";
import {
  authService,
  googleProvider,
  signInWithPopup,
  githubProvider,
} from "fbase";
import React from "react";

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
    <div>
      <AuthForm />

      <div>
        <button name="google" onClick={socialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={socialClick}>
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
