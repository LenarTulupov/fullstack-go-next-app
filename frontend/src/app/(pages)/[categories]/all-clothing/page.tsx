import dynamic from "next/dynamic";

const AllClothing = dynamic(() => import("@/client-pages/categories/all-clothing/page"), { 
  ssr: false 
});

export default function AllClothingPage() {
  return <AllClothing />;
}
