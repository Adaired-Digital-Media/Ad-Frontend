import { siteConfig } from '@/config/site.config';
import MaxWidthWrapper from '@web-components/MaxWidthWrapper';
import PageBanner from '@web-components/PageBanner';
import Link from 'next/link';
import React, { FC } from 'react';

interface IProps {}

export const metadata = {
  title: 'Privacy Policy | How Adaired Protects Your Data',
  description:
    'Read Adaired’s Privacy Policy to understand how we collect, use, and protect your personal information while providing our services.',
};

const Privacy: FC<IProps> = (props) => {
  return (
    <>
      <PageBanner title="Privacy Policy" />
      <MaxWidthWrapper className="py-10 lg:py-16">
        <div className="space-y-6">
          <p>
            At AdAired Digital Media, your privacy is our priority. We take
            great care in every detail and strive to provide you with a clear
            understanding of what information we collect and how we use it.
            Below is a summary of our privacy policy.
          </p>

          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl lg:text-2xl">
              Our Commitment to You
            </h3>
            <p>
              We regularly update our website to improve the user experience and
              security. Any policy changes will be promptly communicated to you.
            </p>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl">
              What Information We Collect
            </h3>
            <ul className="mx-4 my-1 list-disc px-1">
              <li>
                <strong>Personal Details:</strong> We only collect your name,
                email address, and message when you provide them voluntarily.
              </li>
              <li>
                <strong>Cookies:</strong> We use cookies to enhance your
                browsing experience and customize our services to your
                preferences.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl">
              How We Use Your Information
            </h3>
            <ul className="mx-4 my-1 list-disc px-1">
              <li>
                <strong>Communication:</strong>
                Your information is used to respond to inquiries and improve
                your interactions with us. Unsolicited emails won’t be sent.
              </li>
              <li>
                <strong>Security Measures: </strong>
                If there are any issues, we take action to protect your data and
                address your concerns.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl">
              Who Collects Your Information?
            </h3>
            <p>
              The AdAired Digital Media team collects your information when you
              interact with our website.
            </p>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl">
              Do we share your information?
            </h3>
            <p>
              We do not share your information with third parties or affiliates
              for marketing or promotional purposes. This excludes text
              messaging originator opt-in data and consent, which will also not
              be shared with any third parties.
            </p>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl">
              Cookies and Tracking
            </h3>
            <p>
              We may use cookies and other technologies to learn about your
              preferences and improve your overall experience. These cookies may
              contain information such as your browser type, IP address, and
              usage patterns.
            </p>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl">Contact Us</h3>
            <p>
              If you have any questions or concerns about our privacy practices,
              feel free to contact us:
            </p>
          </div>
          <div>
            <p>
              <strong>Address: </strong>
              B-509, 5th Floor, Bestech Business Towers, Sector 66, Sahibzada
              Ajit Singh Nagar, Punjab 160066
            </p>
            <p>
              <strong> Tel:</strong>
              <Link href="tel:+91-8907400008">
                {' '}
                <strong>+91-8907400008</strong>
              </Link>
            </p>
            <p>
              <strong>Email:</strong>
              <Link href="mailto:info@adaired.com">
                {' '}
                <strong>info@adaired.com</strong>
              </Link>
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default Privacy;
