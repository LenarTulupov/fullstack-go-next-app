import dynamic from "next/dynamic";

const Trends = dynamic(() => import("@/client-pages/categories/trends/page"), { 
  ssr: false 
});

export default function TrendsPage() {
  return <Trends />;
}
