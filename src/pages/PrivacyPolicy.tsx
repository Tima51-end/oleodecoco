const PrivacyPolicy = () => {
  return (
    <div className="py-12 px-4 md:px-8">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 md:mb-12 tracking-tight bg-gradient-to-r from-gray-700 to-gray-500 text-transparent bg-clip-text text-center">
        Privacy Policy
      </h1>

      <div className="space-y-12 max-w-4xl mx-auto">
        <div className="text-sm text-gray-500 text-center mb-6">
          Last Updated: December 23, 2025
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2">
            Introduction
          </h2>
          <p className="text-gray-600 leading-relaxed text-base md:text-lg">
            Welcome to our website! This Privacy Policy outlines how we collect, use, store, and protect your personal data. We are committed to ensuring your privacy is respected and that your information is handled with care, in compliance with applicable data protection laws. Our goal is to provide a transparent and secure online experience for all visitors.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2">
            1. Data Collection
          </h2>
          <ul className="list-disc list-inside space-y-4 text-gray-600 text-base md:text-lg">
            <li>
              We do not actively collect personally identifiable information unless you voluntarily provide it through the contact form on our "Contact" page.
            </li>
            <li>
              Data you may share (e.g., name, email address) is used solely to respond to your inquiries and will not be shared with third parties, except as required by law or to fulfill your request.
            </li>
            <li>
              We may collect non-personal data (e.g., IP address, browser type) anonymously to improve website functionality, but this cannot be linked to any individual.
            </li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2">
            2. Cookies and Tracking Technologies
          </h2>
          <ul className="list-disc list-inside space-y-4 text-gray-600 text-base md:text-lg">
            <li>
              <strong>Technical Cookies:</strong> Essential for website operation, enabling navigation and access to secure areas.
            </li>
            <li>
              <strong>Analytical Cookies:</strong> Gather anonymous statistics on visitor trends to optimize our content.
            </li>
            <li>
              <strong>Third-Party Cookies:</strong> Embedded content may set cookies from third-party providers. Review their privacy policies for details.
            </li>
            <li>
              You can manage or disable cookies via your browser settings, though this may affect some site features.
            </li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2">
            3. Data Protection
          </h2>
          <p className="text-gray-600 leading-relaxed text-base md:text-lg">
            We implement robust technical and organizational measures to safeguard your data, including encryption, secure servers, and restricted access. While we strive for maximum security, no online transmission is 100% secure, and we are not liable for breaches beyond our control. Our team regularly updates these measures to ensure ongoing protection.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2">
            4. User Rights
          </h2>
          <ul className="list-disc list-inside space-y-4 text-gray-600 text-base md:text-lg">
            <li>Request access to your personal data we hold.</li>
            <li>Request correction of inaccurate or incomplete data.</li>
            <li>Request deletion of your data under certain conditions.</li>
            <li>Object to data processing or restrict its use.</li>
          </ul>
          <p className="text-gray-600 leading-relaxed text-base md:text-lg mt-4">
            To exercise these rights, contact us via the "Contact" page. We aim to respond within 30 days in accordance with legal requirements.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2">
            5. Changes to the Privacy Policy
          </h2>
          <p className="text-gray-600 leading-relaxed text-base md:text-lg">
            We may update this Privacy Policy to reflect changes in our practices or legal requirements. Significant updates will be announced on our website, and we encourage periodic reviews. The last update date is always noted at the top.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2">
            6. Contact Us
          </h2>
          <p className="text-gray-600 leading-relaxed text-base md:text-lg">
            For questions, concerns, or requests about this Privacy Policy or your data, feel free to reach out. You can use the contact form on our{" "}
            <a
              href="/contact"
              className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-200 underline decoration-2 decoration-blue-300 hover:decoration-blue-500"
            >
              Contact
            </a>{" "}
            page or email us at [insert email address]. Our team is dedicated to assisting you promptly.
          </p>
          <div className="mt-6 p-4 bg-gray-100 rounded-lg border border-gray-200">
            <p className="text-gray-700 text-base md:text-lg font-medium">
              <strong>What is the Contact Page?</strong>
            </p>
            <p className="text-gray-600 leading-relaxed mt-2">
              This is a dedicated section where you can send us your inquiries, feedback, or requests regarding your personal data or any other matters. Simply fill out the form, and we’ll get back to you as soon as possible!
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;