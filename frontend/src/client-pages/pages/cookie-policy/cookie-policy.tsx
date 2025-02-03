import Container from "@/components/ui/container/container";

export default function CookiePolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Container>

    <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
    
    <div className="prose prose-neutral dark:prose-invert">
      <h2 className="text-2xl font-semibold mt-8 mb-4">What are cookies?</h2>
      <p className="mb-4">
        Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide a better user experience.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">How we use cookies</h2>
      <p className="mb-4">
        We use cookies for several purposes, including:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Essential cookies: Required for the website to function properly</li>
        <li>Analytics cookies: Help us understand how visitors interact with our website</li>
        <li>Preference cookies: Remember your settings and preferences</li>
        <li>Marketing cookies: Used to deliver relevant advertisements</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Managing cookies</h2>
      <p className="mb-4">
        You can control and manage cookies in various ways. You can:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Accept or decline cookies through our consent banner</li>
        <li>Modify your browser settings to accept or reject cookies</li>
        <li>Delete cookies that have already been stored on your device</li>
      </ul>

      <p className="mb-4">
        Please note that disabling certain cookies may impact the functionality of our website.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Updates to this policy</h2>
      <p className="mb-4">
        We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Contact us</h2>
      <p className="mb-4">
        If you have any questions about our Cookie Policy, please contact us.
      </p>
    </div>
      </Container>
  </div>
  )
}
