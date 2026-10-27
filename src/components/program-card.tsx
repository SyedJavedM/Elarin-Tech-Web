import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
type Item={title:string;slug:string;summary:string;category?:string|null;duration?:string|null;mode?:string|null};
export function ProgramCard({item,collection}:{item:Item;collection:string}){return <Link href={`/${collection}/${item.slug}`} className="program-card"><div className="card-topline"><span>{item.category||collection}</span><ArrowUpRight size={17}/></div><h3>{item.title}</h3><p>{item.summary}</p><div className="card-meta"><span><Clock3 size={14}/>{item.duration||"Flexible"}</span><span>{item.mode||"Online"}</span></div></Link>}
