import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import BHWContactFrom from '../emailTemplates/BHW_contact_form';


// Load and validate environment variables
const config = {
  emailHost: process.env.EMAIL_HOST!,
  senderEmail: process.env.SENDER_EMAIL!,
  senderPassword: process.env.SENDER_PASSWORD!,
  senderName: process.env.SENDER_NAME || '"Adaired Digital" <info@adaired.com>',
  adminEmails: [process.env.SUPER_ADMIN_EMAIL, process.env.CONTENT_MANAGER_EMAIL || ''].filter((email) => email),
  recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
};

// Create a transporter object for sending emails
const transporter = nodemailer.createTransport({
  host: config.emailHost,
  port: 465,
  secure: true,
  auth: {
    user: config.senderEmail,
    pass: config.senderPassword,
  },
});


async function sendMail(mailOptions: Mail.Options): Promise<string> {
  try {
    await transporter.sendMail(mailOptions);
    return 'Email sent';
  } catch (err: unknown) {
    console.log(err);
    if (err instanceof Error) {
      throw new Error(`Failed to send email: ${err.message}`);
    } else {
      throw new Error('An unknown error occurred while sending the email');
    }
  }
}

// Define the payload type for form submissions
interface FormPayload {
  formId: string;
  gRecaptchaToken: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  interest?: string;
  budget?: string;
}

export async function POST(request: NextRequest) {
  const payload = await request.json() as FormPayload;

  // Verify the reCAPTCHA token
  try {
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${config.recaptchaSecretKey}&response=${payload.gRecaptchaToken}`
    ).then((res) => res.json());

    if (!recaptchaResponse.success || recaptchaResponse.score < 0.5) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return NextResponse.json(
      { error: 'reCAPTCHA verification error' },
      { status: 500 }
    );
  }

  // Define form templates mapping
  const formTemplates: { [key: string]: { html: string } } = {
    'Homepage Form': {
      html: BHWContactFrom({
        subject: 'Homepage Form Submission',
        name: payload.name,
        email: payload.email,
        phoneNo: payload.phone || 'Not provided',
        message: payload.message || 'Not provided',
        greeting: `Hello ${payload.name},`,
        closing: 'Best regards,<br>The Adaired Team',
      }),
    },
    'Contact page Form': {
      html: BHWContactFrom({
        subject: 'Contact Page Form Submission',
        name: payload.name,
        email: payload.email,
        phoneNo: payload.phone || 'Not provided',
        message: payload.message || 'Not provided',
        greeting: `Hello ${payload.name},`,
        closing: 'Best regards,<br>The Adaired Team',
      }),
    },
    'Get in Touch Form': {
      html: BHWContactFrom({
        subject: 'Get in Touch Form Submission',
        name: payload.name,
        email: payload.email,
        phoneNo: 'Not provided', // This form doesn't include Phone
        message: payload.message || 'Not provided',
        greeting: `Hello ${payload.name},`,
        closing: 'Best regards,<br>The Adaired Team',
      }),
    },
    'Newsletter Form': {
      html: BHWContactFrom({
        subject: 'Newsletter Form Submission',
        name: 'Not provided', // Newsletter form doesn't include Name
        email: payload.email,
        phoneNo: 'Not provided',
        message: 'Not provided',
        greeting: `Hello Subscriber,`,
        closing: 'Best regards,<br>The Adaired Team',
      }),
    },
    'BHW Contact Form': {
      html: BHWContactFrom({
        subject: 'Contact Page Form Submission',
        name: payload.name,
        email: payload.email,
        phoneNo: payload.phone || 'Not provided',
        message: payload.message || 'Not provided',
        greeting: `Hello ${payload.name},`,
        closing: 'Best regards,<br>The Adaired Team',
      }),
    },
  };

  const template = formTemplates[payload.formId];
  if (!template) {
    return NextResponse.json(
      { error: 'Invalid request type' },
      { status: 400 }
    );
  }

  // // Prepare mail options for the user
  // const userMailOptions: Mail.Options = {
  //   from: config.senderName,
  //   to: payload.email,
  //   subject: `${payload.formId
  //     .replace(/Form$/, '')
  //     // .replace(/([A-Z])/g, ' $1')
  //     .trim()} Submission`,
  //   html: template.html,
  // };

  // Prepare mail options for admins
  const adminMailOptions: Mail.Options = {
    from: config.senderName,
    to: config.adminEmails.filter((email): email is string => email !== undefined),
    subject: `New ${payload.formId
      .replace(/Form$/, '')
      // .replace(/([A-Z])/g, ' $1')
      .trim()} Submission`,
    html: BHWContactFrom({
      subject: `New ${payload.formId
        .replace(/Form$/, '')
        // .replace(/([A-Z])/g, ' $1')
        .trim()} Submission`,
      name: payload.name || 'Not provided',
      email: payload.email,
      phoneNo: payload.phone || 'Not provided',
      message: payload.message || 'Not provided',
      greeting: 'Hello Admin Team,',
      closing: 'Regards,<br>Adaired System',
    }),
  };

  // Send email to the user and admins
  try {
    // // Send to user
    // await sendMail(userMailOptions);
    // Send to admins (if there are any admin emails)
    if (config.adminEmails.length > 0) {
      await sendMail(adminMailOptions);
    }
    return NextResponse.json({
      sendMailSuccess: true,
      message: 'Emails sent successfully',
    });
  } catch (err) {
    console.error('Failed to send emails:', err);
    return NextResponse.json(
      { error: 'Failed to send emails' },
      { status: 500 }
    );
  }
}



// import { type NextRequest, NextResponse } from 'next/server';
// import { Resend } from 'resend';
// import BHWContactFrom from '../emailTemplates/BHW_contact_form';

// // Load environment variables
// const config = {
//   resendApiKey: process.env.RESEND_API_KEY,
//   senderEmail: process.env.SENDER_EMAIL || 'info@adaired.com',
//   senderName: process.env.SENDER_NAME || '"Adaired Digital" <info@adaired.com>',
//   adminEmails: [process.env.SUPER_ADMIN_EMAIL, process.env.CONTENT_MANAGER_EMAIL || ''].filter((email) => email),
//   recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
// };

// // Initialize Resend
// const resend = new Resend(config.resendApiKey);

// interface SendMailOptions {
//   to: string | string[];
//   subject: string;
//   html: string;
// }

// async function sendMail(to: SendMailOptions['to'], subject: SendMailOptions['subject'], html: SendMailOptions['html']): Promise<string> {
//   try {
//     const send = await resend.emails.send({
//       from: config.senderName,
//       to,
//       subject,
//       html,
//     });
//     console.log(send);
//     return 'Email sent';
//   } catch (err) {
//     console.log(err);
//     throw new Error('Failed to send email');
//   }
// }

// interface FormPayload {
//   formId: string;
//   gRecaptchaToken: string;
//   name: string;
//   email: string;
//   phone?: string;
//   message?: string;
//   interest?: string;
//   budget?: string;
// }

// export async function POST(request: NextRequest) {
//   const payload = await request.json() as FormPayload;

//   // Verify reCAPTCHA
//   try {
//     const recaptchaResponse = await fetch(
//       `https://www.google.com/recaptcha/api/siteverify?secret=${config.recaptchaSecretKey}&response=${payload.gRecaptchaToken}`
//     ).then((res) => res.json());

//     if (!recaptchaResponse.success || recaptchaResponse.score < 0.5) {
//       return NextResponse.json(
//         { error: 'reCAPTCHA verification failed' },
//         { status: 400 }
//       );
//     }
//   } catch (error) {
//     console.error('reCAPTCHA verification error:', error);
//     return NextResponse.json(
//       { error: 'reCAPTCHA verification error' },
//       { status: 500 }
//     );
//   }

//   // Define form templates mapping
//   const formTemplates = {
//     'Homepage Form': {
//       subject: 'Homepage Form Submission',
//       greeting: `Hello ${payload.name},`,
//       closing: 'Best regards,<br>The Adaired Team',
//     },
//     'Contact page Form': {
//       subject: 'Contact Page Form Submission',
//       greeting: `Hello ${payload.name},`,
//       closing: 'Best regards,<br>The Adaired Team',
//     },
//     'Get in Touch Form': {
//       subject: 'Get in Touch Form Submission',
//       greeting: `Hello ${payload.name},`,
//       closing: 'Best regards,<br>The Adaired Team',
//     },
//     'Newsletter Form': {
//       subject: 'Newsletter Form Submission',
//       greeting: `Hello Subscriber,`,
//       closing: 'Best regards,<br>The Adaired Team',
//     },
//     'BHW Contact Form': {
//       subject: 'Contact Page Form Submission',
//       greeting: `Hello ${payload.name},`,
//       closing: 'Best regards,<br>The Adaired Team',
//     },
//   };

//   const template = formTemplates[payload.formId as keyof typeof formTemplates];
//   if (!template) {
//     return NextResponse.json(
//       { error: 'Invalid request type' },
//       { status: 400 }
//     );
//   }

//   // Prepare email content for admins
//   const adminSubject = `New ${payload.formId.replace(/Form$/, '').trim()} Submission`;
//   const adminHtml = BHWContactFrom({
//     subject: adminSubject,
//     name: payload.name || 'Not provided',
//     email: payload.email,
//     phoneNo: payload.phone || 'Not provided',
//     message: payload.message || 'Not provided',
//     greeting: 'Hello Admin Team,',
//     closing: 'Regards,<br>Adaired System',
//   });

//   // Send email to admins
//   try {
//     if (config.adminEmails.length > 0) {
//       await sendMail(config.adminEmails.filter((email): email is string => email !== undefined), adminSubject, adminHtml);
//     }
//     return NextResponse.json({
//       sendMailSuccess: true,
//       message: 'Emails sent successfully',
//     });
//   } catch (err) {
//     console.error('Failed to send emails:', err);
//     return NextResponse.json(
//       { error: 'Failed to send emails' },
//       { status: 500 }
//     );
//   }
// }