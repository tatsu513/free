import { redirect } from "next/navigation";
import { newsSchema } from "../schema";
import Image from "next/image";
import { endpoint } from "../page";

export default async function Home({
  searchParams,
}: {
  searchParams: { url?: string };
}) {
  const params = await searchParams;
  const articleUrl = params?.url ? decodeURIComponent(params.url) : null;
  if (!articleUrl) {
    console.error("記事のURLが不正");
    redirect("/news-aggregator");
  }
  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error("ニュースの取得に失敗しました");
  }
  const news = newsSchema.parse(await res.json());
  const target = news.articles.find((a) => a.url === articleUrl);

  if (target == null) {
    console.error("記事が見つかりませんでした");
    redirect("/news-aggregator");
  }

  return (
    <main className="container mt-4 flex flex-col items-center pb-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">{target.title}</h1>
        {target.urlToImage && (
          <img
            src={target.urlToImage}
            alt={target.title}
            className="w-full h-auto rounded mb-4"
          />
        )}
        <p className="mb-4">{target.content}</p>
      </div>
      <a
        href={target.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        元記事を読む
      </a>
    </main>
  );
}
