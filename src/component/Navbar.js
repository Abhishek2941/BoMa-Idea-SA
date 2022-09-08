import Router from 'next/router'


export const Navbar = () => {
  return (
    <>
     <button type="button" onClick={() => Router.back()}>
      Click here to go back
    </button>
      
    </>
  );
};