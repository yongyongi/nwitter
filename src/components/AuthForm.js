import React, { useState } from "react";
import {
  authService,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "fbase";
const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [newAccount, setNewAccount] = useState(true);

  // 실행시마다 NewAccount 값이 반대로 바뀜(true, false)
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newAccount) {
        //create Id
        await createUserWithEmailAndPassword(authService, email, password);
      } else {
        //log in
        await signInWithEmailAndPassword(authService, email, password);
      }
    } catch (err) {
      setError(err.message);
    }

    setEmail("");
    setPassword("");
  };
  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          onChange={onChange}
          type="email"
          placeholder="email"
          name="email"
          required
          value={email}
          className="authInput"
        />
        <input
          onChange={onChange}
          type="password"
          placeholder="password"
          name="password"
          required
          value={password}
          className="authInput"
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
          className="authInput authSubmit"
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Sign In" : "Create Account"}
      </span>
    </>
  );
};

export default AuthForm;
