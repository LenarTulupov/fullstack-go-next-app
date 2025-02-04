import Title from "@/components/ui/title/title";

export default function CookiePolicy() {
  return (
    <div className="flex justify-center !mt-5">
      <div className="max-w-[860px]">
        <Title weight="bold" className="!mb-[50px]">
          Cookie Policy
        </Title>
        <div className="flex flex-col gap-y-[30px]">
          <div>
            <Title weight="bold" className="!mb-5">
              What are cookies?
            </Title>
            <p className="mb-4">
              Cookies are small text files that are placed on your computer or
              mobile device when you visit a website. They are widely used to
              make websites work more efficiently and provide a better user
              experience.
            </p>
          </div>

          <div>
            <Title weight="bold" className="!mb-5">
              How we use cookies
            </Title>
            <p className="mb-4">
              We use cookies for several purposes, including:
            </p>
            <ul className="flex flex-col gap-y-[20px] mt-[20px]">
              <li>
                Essential cookies: Required for the website to function properly
              </li>
              <li>
                Analytics cookies: Help us understand how visitors interact with
                our website
              </li>
              <li>
                Preference cookies: Remember your settings and preferences
              </li>
              <li>
                Marketing cookies: Used to deliver relevant advertisements
              </li>
            </ul>
          </div>

          <div>
            <Title weight="bold" className="!mb-5">
              Managing cookies
            </Title>
            <p className="mb-4">
              You can control and manage cookies in various ways. You can:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Accept or decline cookies through our consent banner</li>
              <li>Modify your browser settings to accept or reject cookies</li>
              <li>
                Delete cookies that have already been stored on your device
              </li>
            </ul>

            <p className="mb-4">
              Please note that disabling certain cookies may impact the
              functionality of our website.
            </p>
          </div>

          <div>
            <Title weight="bold" className="!mb-5">
              Updates to this policy
            </Title>
            <p className="mb-4">
              We may update this Cookie Policy from time to time. Any changes
              will be posted on this page with an updated revision date.
            </p>
          </div>

          <div>
            <Title weight="bold" className="!mb-5">
              Contact us
            </Title>
            <p className="mb-4">
              If you have any questions about our Cookie Policy, please contact
              us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
