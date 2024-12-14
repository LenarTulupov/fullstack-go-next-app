import dynamic from "next/dynamic";

const Search = dynamic(() => import("@/client-pages/pages/search/page"), { 
  ssr: false 
});

export default function SearchPage() {
  return <Search />;
}
