import { Navigate } from "react-router-dom";
import { useLoginStore } from "../contexts";

export function RequiresAuth({ children }: { children: JSX.Element }) {
  const loggedIn =
    useLoginStore((state) => state.login) ||
    document.cookie === "loggedIn=true";

  return <>{loggedIn ? children : <Navigate to="/login" />}</>;
}
