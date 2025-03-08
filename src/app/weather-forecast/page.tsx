import Main from "./Main";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">天気予報アプリ</h1>
      <Main />
    </main>
  );
}
