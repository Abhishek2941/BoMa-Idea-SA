import { useRouter } from "next/router";
import Router from 'next/router'

export const Navbar = ({ state }) => {
  const router = useRouter();

  return (
    <>
      <button type="button" onClick={() => router.push("/")}>
        Click here to go main
      </button>

      {!state && (
        <button type="button" onClick={() => Router.back()}>
          Click here to go back
        </button>
      )}
    </>
  );
};
