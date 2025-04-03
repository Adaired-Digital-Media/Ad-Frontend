import MaxWidthWrapper from "@web-components/MaxWidthWrapper/";
import PageBanner from "@web-components/PageBanner/";
import Link from "next/link";
import React, { FC } from "react";

interface IProps {}

export const metadata = {
  title: 'Terms and Conditions | Adaired Digital Media',
  description:
    'Review Adaired’s Terms and Conditions to understand the guidelines and policies for using our services and website. Stay informed and protected.',
};

const Terms: FC<IProps> = (props) => {
  return (
    <>
      <PageBanner title="Terms and Conditions" />
      <MaxWidthWrapper className="py-10 lg:py-16 ">
        <div className="space-y-6">
          <p>
            At AdAired Digital Media, we value professionalism and transparency.
            Our terms and conditions are intended to provide a clear
            understanding between us and our clients.
          </p>

          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl">The Contract</h3>
            <ul className="mx-4 my-1 px-1 list-disc">
              <li>
                <strong>Independent Contractor:</strong> Our relationship with
                our clients is that of an independent contractor. This means
                that no partnership or joint venture is implied.
              </li>
              <li>
                <strong>Commencement:</strong> Both parties will agree on the
                service start date, with charges beginning on that date.
              </li>
              <li>
                <strong>Reporting:</strong> We provide biweekly performance
                reports to keep you updated.
              </li>
              <li>
                <strong>Cancellation/Transfer:</strong> To cancel or transfer
                services, you must provide at least 10 business days notice.
              </li>
              <li>
                <strong>Outsourcing:</strong> We reserve the right to delegate
                tasks to third-party providers to meet service demands.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl">Payment</h3>
            <ul className="mx-4 my-1 px-1 list-disc">
              <li>
                <strong>Monthly Service Packages:</strong> Full payment is
                required before the service can begin.
              </li>
              <li>
                <strong>Payment Notifications:</strong> We will notify you in
                advance of your payment due dates.
              </li>
              <li>
                <strong>Service Termination:</strong> If payment is not made on
                time, services will be terminated immediately, with no 10-day
                notice period.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl">Liability</h3>
            <ul className="mx-4 my-1 px-1 list-disc">
              <li>
                <strong>Indirect Losses:</strong> AdAired Digital Media is not
                liable for any indirect or consequential losses resulting from
                delays beyond our control.
              </li>
              <li>
                <strong>Accountability:</strong> Clients agree to indemnify us
                against any claims, liabilities, or expenses resulting from the
                services we provide, including third-party claims relating to
                advertising, product liability, intellectual property
                infringement, or service disruption.
              </li>
              <li>
                <strong>Public Access:</strong> Once our agency publishes
                content, it becomes publicly accessible. We are not liable for
                any damages or losses caused by the public availability of this
                content.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl">Waiver</h3>
            <ul className="mx-4 my-1 px-1 list-disc">
              <li>
                Failure to enforce any provision of this contract does not waive
                our right to do so in the future. Any waiver will be valid only
                if it is provided in writing.
              </li>
              <li>
                In case there has to be any kind of waiver for any terms and
                conditions, those will only be understood to be valid officially
                only in the condition if they are communicated to you in a
                written manner in an official document.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl">Disclaimer</h3>
            <ul className="mx-4 my-1 px-1 list-disc">
              <li>
                By providing your phone number to Adaired Digital Media, you
                consent to receive text messages at your wireless phone number
                for any purpose. Standard message and data rates may apply.
              </li>
              <li>
                Message frequency may vary. You can opt out of receiving
                messages at any time by replying &quot;STOP.&quot; For more
                information on how your data will be handled, please visit our{" "}
                <Link href="/privacy-policy" className="text-blue-600/100">
                  <strong>Privacy Policy</strong>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl">Privacy Rights</h3>
            <ul className="mx-4 my-1 px-1 list-disc">
              <li>
                <strong>Confidentiality:</strong> Client information is kept
                strictly confidential and only shared with employees who need it
                to complete tasks.
              </li>
              <li>
                <strong>Data Security:</strong> We use SSL encryption for
                transactions, but we cannot guarantee complete security for
                internet data transfers.
              </li>
              <li>
                <strong>Cookies:</strong> Cookies may be used to improve the
                user experience on our website. Third-party advertisers may use
                cookies for statistical purposes, but they do not have access to
                personal information.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl">Amendments</h3>
            <p className="mt-1">
              AdAired Digital Media reserves the right to change these terms and
              conditions at any time, including during an ongoing contract. If
              anything changes, clients will be notified.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl lg:text-2xl">
              Contact Information
            </h3>
            <div className="space-y-2">
              <p>
                For any questions or concerns regarding these terms and
                conditions, please contact us at:
              </p>
              <p>
                <strong> Phone:</strong>
                <Link href="tel:+91-8907400008">
                  {" "}
                  <strong>+91-8907400008</strong>
                </Link>
              </p>
              <p>
                <strong>Email:</strong>
                <Link href="mailto:info@adaired.com">
                  {" "}
                  <strong>info@adaired.com</strong>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default Terms;
