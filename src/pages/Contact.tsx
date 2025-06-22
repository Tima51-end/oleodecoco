import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailService } from '../utils/EmailService.ts';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
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
        alert('Oops! Something went wrong. Please try again later');
      },
    });
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-base font-medium text-gray-900 mb-2">
            Your Name
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            placeholder="Enter your name"
            className="mt-1 block w-full rounded-xl border-gray-200 p-3 shadow-sm focus:border-green-500 focus:ring-green-500 bg-gray-50 hover:bg-white transition-colors"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-base font-medium text-gray-900 mb-2">
            Email
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            placeholder="Enter your email"
            className="mt-1 block w-full rounded-xl border-gray-200 p-3 shadow-sm focus:border-green-500 focus:ring-green-500 bg-gray-50 hover:bg-white transition-colors"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-base font-medium text-gray-900 mb-2">
            Subject
          </label>
          <input
            {...register('subject')}
            type="text"
            id="subject"
            placeholder="Enter subject"
            className="mt-1 block w-full rounded-xl border-gray-200 p-3 shadow-sm focus:border-green-500 focus:ring-green-500 bg-gray-50 hover:bg-white transition-colors"
          />
          {errors.subject && (
            <p className="mt-2 text-sm text-red-600">{errors.subject.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-base font-medium text-gray-900 mb-2">
            Message
          </label>
          <textarea
            {...register('message')}
            id="message"
            placeholder="Enter your message"
            className="mt-1 block w-full rounded-xl border-gray-200 p-3 shadow-sm focus:border-green-500 focus:ring-green-500 bg-gray-50 hover:bg-white transition-colors"
            rows={5}
          ></textarea>
          {errors.message && (
            <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
        {submitSuccess && (
          <p className="mt-4 text-green-600">Message sent successfully!</p>
        )}
      </form>
    </div>
  );
};

export default Contact;