import { trpc } from "@/utilis/trpc";

export default function Home() {
  const hello = trpc.userQuery.hello.useQuery({ text: "vishal" });
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>{hello.data.greeting}</p>
    </div>
  );
}
