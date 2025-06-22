
import emailjs from '@emailjs/browser';
import type { ContactFormData } from '../pages/Contact';

class EmailService {
  async sendEmail(
    templateParams: ContactFormData,
    {
      successCallback,
      errorCallback,
    }: { successCallback?: () => void; errorCallback?: () => void }
  ) {
    emailjs
      .send(
        'service_lt95iyl',
        'template_b2df2pj',
        templateParams,
        'QH95aW218AysPlCDI'
      )
      .then(
        () => successCallback?.(),
        () => errorCallback?.()
      );
  }
}

export const emailService = new EmailService();