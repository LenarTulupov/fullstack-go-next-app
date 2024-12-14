import dynamic from "next/dynamic";

const Favorite = dynamic(() => import("@/client-pages/pages/favorite/page"), { 
  ssr: false 
});

export default function FavoritePage() {
  return <Favorite />;
}