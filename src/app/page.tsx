import Link from "next/link";
import { db } from "@/db";

// export const dynamic = "force-dynamic";
export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderedSnippents = snippets.map((snippet) => {
    return (
      <Link
        href={`/snippets/${snippet.id}`}
        className="flex justify-between items-center p-2 border rounded"
        key={snippet.id}
      >
        {snippet.title}
        <div>View</div>
      </Link>
    );
  });

  return (
    <div className="">
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link href="/snippets/new" className="border p-2 rounded">
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2">{renderedSnippents}</div>
    </div>
  );
}
