import { SITE_URL } from "@/lib/site";

// /robots.txt: todo indexable, con la URL del sitemap.
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
