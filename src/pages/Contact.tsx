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
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h1 className="text-4xl font-extrabold mb-10 text-gray-900 tracking-tight">
        Contact Us
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-lg font-semibold text-gray-700"
          >
            Your Name
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            placeholder="Enter your name"
            className="w-full rounded-lg border border-gray-300 p-4 text-base text-gray-900 placeholder-gray-400 shadow-sm
                       focus:border-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none transition duration-200"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-lg font-semibold text-gray-700"
          >
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full rounded-lg border border-gray-300 p-4 text-base text-gray-900 placeholder-gray-400 shadow-sm
                       focus:border-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none transition duration-200"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block mb-2 text-lg font-semibold text-gray-700"
          >
            Subject
          </label>
          <input
            {...register("subject")}
            type="text"
            id="subject"
            placeholder="Enter subject"
            className="w-full rounded-lg border border-gray-300 p-4 text-base text-gray-900 placeholder-gray-400 shadow-sm
                       focus:border-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none transition duration-200"
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
            className="block mb-2 text-lg font-semibold text-gray-700"
          >
            Message
          </label>
          <textarea
            {...register("message")}
            id="message"
            placeholder="Enter your message"
            rows={5}
            className="w-full rounded-lg border border-gray-300 p-4 text-base text-gray-900 placeholder-gray-400 shadow-sm resize-none
                       focus:border-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none transition duration-200"
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
          className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition duration-200"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>

        {submitSuccess && (
          <p className="mt-4 text-center text-green-600 font-medium">
            Message sent successfully!
          </p>
        )}
      </form>
    </div>
  );
};

export default Contact;
