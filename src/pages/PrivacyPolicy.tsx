const PrivacyPolicy = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose max-w-none">
        <p>Last updated: June 21, 2025</p>
        <p>
          We value your privacy and are committed to protecting your personal
          information. This Privacy Policy explains how we collect, use, and
          safeguard your data.
        </p>
        <h2>Information We Collect</h2>
        <p>
          We may collect personal information such as your name and email
          address when you submit a contact form.
        </p>
        <h2>How We Use Your Information</h2>
        <p>
          Your information is used to respond to your inquiries and improve our
          services.
        </p>
        <h2>Data Security</h2>
        <p>
          We implement reasonable measures to protect your data, but no method
          of transmission over the Internet is 100% secure.
        </p>
        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          via our{" "}
          <a href="/contact" className="text-green-600 hover:underline">
            Contact
          </a>{" "}
          page.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
