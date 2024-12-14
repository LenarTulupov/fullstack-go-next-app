import dynamic from "next/dynamic";

const Bikinis = dynamic(() => import("@/client-pages/categories/bikinis/page"), { 
  ssr: false 
});

export default function BikinisPage() {
  return <Bikinis />;
}
