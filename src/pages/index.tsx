import { trpc } from "@/utilis/trpc";

const Home = () => {
  const callAPI = async () => {
    try {
      const getToken = await fetch("/api/auth0-token", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!getToken) {
        throw new Error("No token found");
      }

      const token = await getToken.json();

      const res = await fetch(`/api/hello`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      document.write("My name is ", data.name + "</br>");

      const response = await fetch("/api/getDetails", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data2 = await response.json();
      document.write(data2 + "</br>");

      const resp = await fetch("/api/postSum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ num1: 5, num2: 10 }),
      });
      const data3 = await resp.json();
      document.write("Sum is ", data3);
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
