import { useEffect } from "react";

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/20">
      <div className="bg-white rounded-2xl shadow-xl p-12 max-w-3xl w-full mx-6 relative">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">
          Data & Privacy Notice
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          This website uses essential and analytical cookies to ensure functionality and improve your experience. We do not collect personal data unless you submit it voluntarily through our contact form.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Any information you provide is handled securely and will never be shared without your consent, except as required by law. Non-personal usage data may be collected anonymously to enhance website performance.
        </p>
        <p className="text-gray-600 mb-6 text-sm">
          By continuing to use this site, you agree to our data practices as outlined in the full privacy policy.
        </p>
        <div className="flex justify-between items-center">
          <a
            href="/privacy"
            target="_blank"
            className="text-green-800 underline hover:text-green-600 transition"
          >
            View Privacy Policy
          </a>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
          >
            I Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
