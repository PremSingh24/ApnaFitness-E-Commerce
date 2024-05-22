import useLoginStore from "../store/login.store";
import Link from "next/link";

export function RequiresAuth({ children }: { children: JSX.Element }) {
  const loggedIn =
    useLoginStore((state) => state.login) ||
    document.cookie === "loggedIn=true";

  return <>{loggedIn ? children : <Link href="/login" />}</>;
}
