import AppRouter from "components/Route";
import React, { useEffect, useState } from "react";
import { authService } from "fbase";

function App() {
  // 유저 로그인 유무
  const [isLogin, setIsLogin] = useState(false);
  // useEffect에서 데이터를 가져오기 전까지의 상태를 초기화한다.
  // Login확인 유무를 기다리는 로딩이라고 생각하면 될 것 같다.
  const [init, setInit] = useState(false);

  useEffect(() => {
    // 이 작업은 바로 되지 않고 조금의 시간이 걸린다.
    authService.onAuthStateChanged((user) => {
      if (user) setIsLogin(true);
      else setIsLogin(false);
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLogin={isLogin} /> : "initalization"}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
