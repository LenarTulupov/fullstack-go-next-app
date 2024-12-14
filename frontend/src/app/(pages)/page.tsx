import dynamic from "next/dynamic";

const Home = dynamic(() => import("@/client-pages/pages/home/home"), { 
  ssr: false 
});

export default function Page() {
  return <Home />;
}
