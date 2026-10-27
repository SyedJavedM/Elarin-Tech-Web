import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { const base=process.env.SITE_URL||"https://example.com"; const routes=["","about","contact","start-project","institutions","corporate-training","internships","courses","workshops","webinars","bootcamps","certifications","services","technologies","blog","faq","verify","privacy-policy","terms-and-conditions","refund-policy","cookie-policy","disclaimer"]; return routes.map(path=>({url:`${base}/${path}`,changeFrequency:"weekly",priority:path===""?1:0.6})); }


