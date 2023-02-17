import { RequestInfo } from "node-fetch";

const fetch = (url: RequestInfo) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url));

const fetchLinks = async (query: string) => {
  const SERVER_URL =
    (process.env.SERVER_URL as string) || "http://localhost:3001";

  try {
    const res = await fetch(`${SERVER_URL}/api/search?q=${query}`);
    const data = await res.json();

    const reply = data.data
      .slice(0, 10)
      ?.map((item: any) => {
        const title = `**${item.starred ? "⭐️ " : ""}${item.title}**`;
        const links = item.link?.map((url: string) => `• ${url}\n `).join("");

        return `${title}\n${links}\n`;
      })
      .join("");

    return reply;
  } catch (err) {
    return "Something went wrong " + err.message;
  }
};

export default fetchLinks;
