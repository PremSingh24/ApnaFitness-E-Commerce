"use client";
import { useEffect, useState } from "react";
import useLoginStore from "../store/login.store";

const useAuth = () => {
  const login = useLoginStore((state) => state.login);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(
    login ? true : null
  );

  useEffect(() => {
    setIsLoggedIn(document.cookie === "loggedIn=true");
  }, [login]);

  return isLoggedIn;
};

export default useAuth;
