import dynamic from "next/dynamic";

const Jackets = dynamic(() => import("@/client-pages/categories/jackets/page"), { 
  ssr: false 
});

export default function JacketsPage() {
  return <Jackets />;
}
