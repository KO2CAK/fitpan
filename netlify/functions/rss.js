/**
 * Netlify Function: RSS 2.0 feed for Fitpan Blog
 * URL: /.netlify/functions/rss
 *
 * Required Netlify environment variables:
 *   SUPABASE_URL        — your Supabase project URL
 *   SUPABASE_ANON_KEY   — public anon key (reads only published rows)
 *
 * Security: only title, slug, image_url, author, published_at, and a
 * plain-text excerpt of content are exposed. cost_price and owner_id
 * are never fetched or returned.
 */

const SITE_URL = "https://fitpan.netlify.app";
const FEED_TITLE = "Fitpan Blog";
const FEED_DESCRIPTION = "Tips sehat, inspirasi, dan cerita dari Fitpan — camilan sehat Balikpapan.";
const MAX_ITEMS = 20;

/** Escape XML special characters to prevent injection. */
function escapeXml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Strip HTML tags and collapse whitespace to produce a plain-text excerpt. */
function toPlainExcerpt(html = "", maxLen = 200) {
  const plain = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return plain.length > maxLen ? plain.slice(0, maxLen) + "…" : plain;
}

export const handler = async () => {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return {
      statusCode: 503,
      body: "RSS feed temporarily unavailable — missing configuration.",
    };
  }

  const endpoint =
    `${supabaseUrl}/rest/v1/blogs` +
    `?select=title,slug,image_url,author,published_at,content,tags` +
    `&status=eq.published` +
    `&order=published_at.desc` +
    `&limit=${MAX_ITEMS}`;

  let posts = [];
  try {
    const res = await fetch(endpoint, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      console.error("Supabase fetch failed:", res.status, await res.text());
      return { statusCode: 502, body: "Failed to fetch blog posts." };
    }

    posts = await res.json();
  } catch (err) {
    console.error("RSS function error:", err);
    return { statusCode: 500, body: "Internal error generating RSS feed." };
  }

  const items = posts
    .map((post) => {
      const link = `${SITE_URL}/inspiration/${escapeXml(post.slug)}`;
      const title = escapeXml(post.title || "Untitled");
      const description = escapeXml(toPlainExcerpt(post.content));
      const author = escapeXml(post.author || "Fitpan");
      const pubDate = post.published_at
        ? new Date(post.published_at).toUTCString()
        : new Date().toUTCString();

      return `
    <item>
      <title>${title}</title>
      <link>${link}</link>
      <description>${description}</description>
      <author>${author}</author>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="true">${link}</guid>
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>id</language>
    <atom:link href="${SITE_URL}/.netlify/functions/rss" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
    body: rss,
  };
};
