import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailService } from "../utils/EmailService.ts";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof formSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    emailService.sendEmail(data, {
      successCallback: () => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        reset();
      },
      errorCallback: () => {
        setIsSubmitting(false);
        alert("Oops! Something went wrong. Please try again later");
      },
    });
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: "url(/palma.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10" />

      <div className="h-24 md:h-32 lg:h-24" />

      <div className="relative z-10 max-w-4xl mx-auto p-8 bg-white bg-opacity-90 rounded-xl shadow-xl border border-gray-200">
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 tracking-tight bg-gradient-to-r from-green-600 to-green-400 text-transparent bg-clip-text">
            Join Our Natural Living Community
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            At Oleodecoco, we’re building a community of individuals passionate
            about natural wellness, sustainability, and mindful living. Whether
            you have questions, feedback, or simply want to connect, we’re here
            to listen and support you on your journey.
          </p>
          <p className="text-gray-600 text-base italic">
            Reach out, share your story, or ask about coconut oil benefits — we
            can’t wait to hear from you!
          </p>
        </section>

        <div className="text-center mb-6">
          <a
            href="/privacy"
            className="inline-block bg-gray-700 text-white font-semibold px-6 py-3 rounded-md hover:bg-gray-800 transition duration-200 text-lg"
          >
            View our Privacy Policy
          </a>
        </div>

        <h1 className="text-4xl font-extrabold mb-4 text-gray-900 tracking-tight text-center">
          Contact Us
        </h1>

        <p className="text-center text-gray-700 text-lg mb-6">
          Got questions, feedback, or just want to say hi? We're always happy to
          hear from you. Fill out the form and we’ll get back to you shortly.
        </p>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-around text-gray-800 mb-4 gap-4 text-center">
            <div>
              <p className="text-sm font-semibold">Location</p>
              <p className="text-sm">will be later</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Email</p>
              <p className="text-sm">oleodecoco@gmail.com</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Phone</p>
              <p className="text-sm">+48 43 374 43 55</p>
            </div>
          </div>
          <hr className="border-gray-300" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-xl font-semibold text-gray-800"
            >
              Your Full Name
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              placeholder="Enter your full name"
              className="w-full rounded-md border border-gray-300 p-4 text-lg text-gray-900 placeholder-gray-500 shadow-sm focus:border-gray-600 focus:ring-2 focus:ring-gray-200 focus:outline-none transition duration-200"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-xl font-semibold text-gray-800"
            >
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="Enter your email address"
              className="w-full rounded-md border border-gray-300 p-4 text-lg text-gray-900 placeholder-gray-500 shadow-sm focus:border-gray-600 focus:ring-2 focus:ring-gray-200 focus:outline-none transition duration-200"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-xl font-semibold text-gray-800"
            >
              Subject
            </label>
            <input
              {...register("subject")}
              type="text"
              id="subject"
              placeholder="Enter the subject"
              className="w-full rounded-md border border-gray-300 p-4 text-lg text-gray-900 placeholder-gray-500 shadow-sm focus:border-gray-600 focus:ring-2 focus:ring-gray-200 focus:outline-none transition duration-200"
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600">
                {errors.subject.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-xl font-semibold text-gray-800"
            >
              Your Message
            </label>
            <textarea
              {...register("message")}
              id="message"
              placeholder="Enter your message"
              rows={6}
              className="w-full rounded-md border border-gray-300 p-4 text-lg text-gray-900 placeholder-gray-500 shadow-sm resize-none focus:border-gray-600 focus:ring-2 focus:ring-gray-200 focus:outline-none transition duration-200"
            ></textarea>
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gray-700 text-white font-semibold py-4 rounded-md hover:bg-gray-800 disabled:bg-gray-400 transition duration-200 text-lg"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {submitSuccess && (
            <p className="mt-4 text-center text-gray-700 font-medium text-lg">
              Message sent successfully!
            </p>
          )}
        </form>

        <div className="mt-10 text-center text-gray-600 text-base leading-relaxed">
          <p>
            We take your privacy seriously. Your message will be reviewed by our
            team and we’ll do our best to respond as soon as possible.
          </p>
          <p className="mt-2">
            Our working hours are Monday to Friday, 9:00 – 18:00 CET.
          </p>
        </div>
      </div>

      <div className="h-24 md:h-32 lg:h-24" />
    </div>
  );
};

export default Contact;
