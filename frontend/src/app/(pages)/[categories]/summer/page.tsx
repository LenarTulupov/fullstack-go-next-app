import dynamic from "next/dynamic";

const Summer = dynamic(() => import("@/client-pages/categories/summer/page"), { 
  ssr: false 
});

export default function SummerPage() {
  return <Summer />;
}
