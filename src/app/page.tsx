import LoginPage from "./login/page";

export default function Home() {
  console.log("GRAPHQL ENDPOINT:", process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT);

  return (
    <>
      <LoginPage />
    </>
  );
}
