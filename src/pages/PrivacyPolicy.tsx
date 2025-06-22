const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-md border border-gray-200">
      <h1 className="text-4xl font-extrabold mb-10 text-gray-900 tracking-tight">
        Privacy Policy
      </h1>
      <div className="prose prose-green max-w-none">
        <p className="text-sm text-gray-500 mb-6">
          Last updated: June 21, 2025
        </p>

        <p className="leading-relaxed text-gray-700">
          We value your privacy and are committed to protecting your personal
          information. This Privacy Policy explains how we collect, use, and
          safeguard your data.
        </p>

        <h2>Information We Collect</h2>
        <p className="leading-relaxed text-gray-700">
          We may collect personal information such as your name and email
          address when you submit a contact form.
        </p>

        <h2>How We Use Your Information</h2>
        <p className="leading-relaxed text-gray-700">
          Your information is used to respond to your inquiries and improve our
          services.
        </p>

        <h2>Data Security</h2>
        <p className="leading-relaxed text-gray-700">
          We implement reasonable measures to protect your data, but no method
          of transmission over the Internet is 100% secure.
        </p>

        <h2>Contact Us</h2>
        <p className="leading-relaxed text-gray-700">
          If you have any questions about this Privacy Policy, please contact us
          via our{" "}
          <a
            href="/contact"
            className="text-green-700 font-semibold underline decoration-2 decoration-green-400 hover:decoration-green-600 transition"
          >
            Contact
          </a>{" "}
          page.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
