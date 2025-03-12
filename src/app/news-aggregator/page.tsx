import { DateTime } from "luxon";
import { newsSchema } from "./schema";

const now = DateTime.now();

export const endpoint = `
  https://newsapi.org/v2/everything?q=Apple&from=${now.minus({ months: 1 }).toFormat("yyyy-MM-dd")}&sortBy=popularity&apiKey=${process.env.NEWS_API_KEY}
`;

export default async function Home() {
  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error("ニュースの取得に失敗しました");
  }
  const news = newsSchema.parse(await res.json());
  return (
    <main className="container mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.articles.map((article, index) => (
          <a
            key={index}
            href={`/news-aggregator/article?url=${encodeURIComponent(article.url)}`}
            rel="noopener noreferrer"
            className="block p-4 border rounded shadow hover:bg-gray-500"
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-auto rounded mb-4"
              />
            )}
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <p>{article.description}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
