"use client";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    setIsLoggedIn(document.cookie === "loggedIn=true");
  }, []);

  return isLoggedIn;
};

export default useAuth;
