import dynamic from "next/dynamic";

const Dresses = dynamic(() => import("@/client-pages/categories/dresses/page"), { 
  ssr: false 
});

export default function DressesPage() {
  return <Dresses />;
}
