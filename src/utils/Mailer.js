
import dotenv from 'dotenv';
import emailer from '@sendgrid/mail';

dotenv.config();
/**
 *
 *
 * @class PasswordEmail
 */
class passwordEmail {
  /** @static
   *
   *
   * @static
   * @param {props} userEmail
   * @param {email} template
   * @param {string} subjectTopic
   * @returns{object} Success Message
   * @memberof PasswordEmail
   */
  static async sendEmail(userEmail, template, subjectTopic) {
    emailer.setApiKey(process.env.SENDGRID_API_KEY);

    const detail = {

      to: userEmail,
      from: { email: process.env.WEB_MAIL_URL, name: 'BareFoot Nomad' },
      subject: subjectTopic,
      html: template,
    };

    try {
      await emailer.send(detail);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default passwordEmail;
