import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { brand } from "@/lib/brand";
import "./globals.css";
const origin=brand.siteUrl||"https://your-domain.example";
export const metadata:Metadata={metadataBase:new URL(origin),title:{default:`${brand.name} | Education & Technology`,template:`%s | ${brand.name}`},description:brand.description,alternates:{canonical:"/"},openGraph:{type:"website",siteName:brand.name,title:`${brand.name} | Education & Technology`,description:brand.description,url:origin},twitter:{card:"summary_large_image",title:`${brand.name} | Education & Technology`,description:brand.description},robots:{index:true,follow:true}};
export const viewport:Viewport={themeColor:"#f3f1ec",colorScheme:"light"};
export default function RootLayout({children}:{children:React.ReactNode}){const structured={"@context":"https://schema.org","@type":"Organization",name:brand.name,url:origin,description:brand.description,...(brand.email.startsWith("[")?{}:{email:brand.email})};return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,"\\u003c")}}/><SiteHeader/><main id="main-content">{children}</main><SiteFooter/></body></html>}
