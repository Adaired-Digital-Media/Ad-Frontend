interface BHWContactFormProps {
  subject: string;
  name: string;
  email: string;
  phoneNo: string;
  message: string;
  greeting: string;
  closing: string;
}

const BHWContactFrom = ({
  subject,
  name,
  email,
  phoneNo,
  message,
  greeting,
  closing,
}: BHWContactFormProps) => {
  return `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1f1f1; color: #000000;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background: linear-gradient(135deg, #1B5A96, #000000); padding: 20px 0;">
    <tr>
      <td align="center">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15); overflow: hidden; border: 1px solid #e0e0e0;">
          <tr>
            <td style="background-color: #3478C8; padding: 25px; text-align: center;">
              <img src="https://res.cloudinary.com/adaired/image/upload/c_limit,w_384/f_auto/q_auto/v1/Static%20Website%20Images/adaired_logo.png" alt="Adaired" style="max-width: 200px; height: auto; filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));">
            </td>
          </tr>
          <tr>
            <td style="padding: 35px 40px; border: 1px solid #e0e0e0; border-top: none; border-bottom: none;">
              <h2 style="margin: 0; line-height: 36px; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 30px; font-weight: normal; color: #333333; text-align: center;"><strong>${subject}</strong></h2>
              <p style="margin: 0; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 27px; color: #333333; font-size: 18px; padding: 10px 0; text-align: center;"><strong>${greeting}</strong></p>
              <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse: separate; border-spacing: 0px; border-width: 1px; border-style: solid; border-color: #e0e0e0; border-radius: 10px; background-color: #f9f9f9;" bgcolor="#f9f9f9" role="presentation">
                <tbody>
                  <tr>
                    <td align="left" style="margin: 0; padding-bottom: 15px; padding-top: 20px; padding-left: 20px; padding-right: 20px;">
                      <h2 style="margin: 0; line-height: 36px; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 30px; font-weight: normal; color: #333333;"><strong>Form Submission Details</strong></h2>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0; margin: 0;">
                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="border-collapse: collapse; border-spacing: 0px;">
                        <tbody>
                          <tr>
                            <td align="left" valign="top" width="50%" style="margin: 0; padding-right: 5px; padding-top: 10px; padding-bottom: 10px; padding-left: 20px; border: 0;">
                              <span style="font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #666666; font-size: 18px; font-weight: 500;">Name</span>
                            </td>
                            <td align="right" valign="top" width="50%" style="margin: 0; padding-left: 5px; padding-top: 10px; padding-bottom: 10px; padding-right: 20px; border: 0;">
                              <span style="font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333333; font-size: 18px; font-weight: 600;">${name}</span>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" valign="top" width="50%" style="margin: 0; padding-right: 5px; padding-top: 10px; padding-bottom: 10px; padding-left: 20px; border: 0;">
                              <span style="font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #666666; font-size: 18px; font-weight: 500;">Email</span>
                            </td>
                            <td align="right" valign="top" width="50%" style="margin: 0; padding-left: 5px; padding-top: 10px; padding-bottom: 10px; padding-right: 20px; border: 0;">
                              <span style="font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333333; font-size: 18px; font-weight: 600;">${email}</span>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" valign="top" width="50%" style="margin: 0; padding-right: 5px; padding-top: 10px; padding-bottom: 10px; padding-left: 20px; border: 0;">
                              <span style="font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #666666; font-size: 18px; font-weight: 500;">Phone No.</span>
                            </td>
                            <td align="right" valign="top" width="50%" style="margin: 0; padding-left: 5px; padding-top: 10px; padding-bottom: 10px; padding-right: 20px; border: 0;">
                              <span style="font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333333; font-size: 18px; font-weight: 600;">${phoneNo}</span>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" valign="top" width="50%" style="margin: 0; padding-right: 5px; padding-top: 10px; padding-bottom: 15px; padding-left: 20px; border: 0;">
                              <span style="font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #666666; font-size: 18px; font-weight: 500;">Message</span>
                            </td>
                            <td align="right" valign="top" width="50%" style="margin: 0; padding-left: 5px; padding-top: 10px; padding-bottom: 15px; padding-right: 20px; border: 0;">
                              <span style="font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333333; font-size: 18px; font-weight: 600;">${message}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size: 16px; line-height: 1.6; margin: 0; color: #000000; text-align: center; padding-top: 30px;">${closing}</p>
            </td>
          </tr>
          <tr>
            <td style="background: linear-gradient(135deg, #000000, #1B5A96); padding: 20px; text-align: center; color: #ffffff;">
              <p style="margin: 0; font-size: 14px; opacity: 0.9;">© 2025 Adaired. All rights reserved.</p>
              <p style="margin: 10px 0 0; font-size: 12px;">
                <a href="https://adaired.com" style="color: #FB9100; text-decoration: none; margin: 0 10px;">Visit our website</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
};

export default BHWContactFrom;
