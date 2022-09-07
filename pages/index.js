import Head from "next/head";
import useSwr from "swr";
import toast from "react-hot-toast";
import { server } from '../config';

const Home = ({ props }) => {
  const fetcher = (url) => fetch(url).then((r) => r.json());


  const { data , error } = useSwr("/api/profiles", fetcher);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");
    const email = formData.get("email");

    const data = await fetch("/api/profiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    toast.success("Posted");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">

      {/* We will make a handleSubmit function */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Please enter your name" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;

Home.getInitialProps = async function() {

  const res = await fetch(`${server}/api/profiles`)
  const data = await res.json()

  console.log(data)
  console.log(`Showed data fetched. Count ${data.length}`)

  return {
    products: data
  }
}