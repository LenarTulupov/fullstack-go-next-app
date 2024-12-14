import dynamic from "next/dynamic";

const Trousers = dynamic(() => import("@/client-pages/categories/trousers/page"), { 
  ssr: false 
});

export default function TrousersPage() {
  return <Trousers />;
}
