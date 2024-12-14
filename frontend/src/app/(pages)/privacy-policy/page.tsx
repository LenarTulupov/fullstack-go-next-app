import dynamic from "next/dynamic";

const PrivacyPolicy = dynamic(() => import("@/client-pages/pages/privacy-policy/page"), { 
  ssr: false 
});

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
