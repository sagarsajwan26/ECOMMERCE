import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);





export const sendEmail = async (to, subject, html) => {

 const data =resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'kilob15321@mvpmedix.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});
  console.log(data);
  
return { success: true, message: 'Email sent successfully' };
}