import { trpc } from "@/utilis/trpc";

const Home = () => {
  const callAPI = async () => {
    try {
      const res = await fetch(`/api/hello`, {
        method: "GET",
        headers: {
          "Content-type": "Application/json",
        },
      });

      const data = await res.json();
      document.write("Get data is", data.name);
    } catch (err) {
      console.log(err);
    }
  };

  const hello = trpc.userQuery.hello.useQuery({ text: "vishal" });
  if (!hello.data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>{hello.data.greeting}</p>
      <button onClick={callAPI}>Make an API Call</button>
    </div>
  );
};
export default Home;
