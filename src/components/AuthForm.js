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
        const data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        //log in
        const data = await signInWithEmailAndPassword(
          authService,
          email,
          password
        );
      }
    } catch (err) {
      setError(err.message);
    }

    setEmail("");
    setPassword("");
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="email"
          placeholder="email"
          name="email"
          required
          value={email}
        />
        <input
          onChange={onChange}
          type="password"
          placeholder="password"
          name="password"
          required
          value={password}
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error}
      </form>
      <button onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </button>
    </>
  );
};

export default AuthForm;
