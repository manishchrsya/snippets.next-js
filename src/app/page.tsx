import { db } from "@/db";

export default async function Home() {
  const snippets = await db.snippet.findMany();
  console.log("snippets", snippets);

  const renderedSnippents = snippets.map((snippet) => {
    return <div key={snippet.id}>{snippet.title}</div>;
  });

  return <div>{renderedSnippents}</div>;
}
