import dynamic from "next/dynamic";

const NewIn = dynamic(() => import("@/client-pages/categories/new-in/page"), { 
  ssr: false 
});

export default function NewInPage() {
  return <NewIn />;
}
