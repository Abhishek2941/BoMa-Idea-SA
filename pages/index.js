import Head from "next/head";
import useSwr from "swr";
import toast from "react-hot-toast";
import { server } from '../config';
import { useRouter } from 'next/router'


const Home = ({ props }) => {
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const id = formData.get("id");
    router.push(`/views?id=${id}`)
    localStorage.setItem('user',id)
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">

      {/* We will make a handleSubmit function */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="id" placeholder="Please enter user id" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;