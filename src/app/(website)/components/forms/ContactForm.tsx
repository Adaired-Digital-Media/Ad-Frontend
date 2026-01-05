// 'use client';
// import Image from 'next/image';
// import React, { useState } from 'react';
// import InputField from '../UI/InputField';
// import SelectField from '../UI/SelectField';
// import MessageField from '../UI/MessageField';
// import Button from '../../common/Button';
// import chat from '../../../../../public/assets/icons/chat.png';
// import SaveAndCancel from '../../common/SaveAndCancel';
// import { useReCaptcha } from 'next-recaptcha-v3';

// const ContactForm = () => {
//   const { executeRecaptcha } = useReCaptcha();

//   const [inputValue, setInputValue] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     service: '',
//     message: '',
//   });
//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setInputValue((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };
//   const handleClick = async () => {
//     const token = await executeRecaptcha('contact_page_form');

//     if (token) {
//       values.gRecaptchaToken = token;
//       reset();
//       router.push('/thankyou');
//       try {
//         const response = await fetch('/api/zoho/leadRegister', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(values),
//         });
//       } catch (error) {
//         throw new Error('Failed to send data to Zoho CRM');
//       }
//     }
//   };

//   return (
//     <div className="2lg:h-[650px] 2lg:w-[620px] h-full w-full flex-1 space-y-8 rounded-2xl p-[1rem] text-center shadow-[0_0_20px_rgba(66,71,76,0.08)] lg:p-[3.25rem] lg:text-left">
//       <div className="flex justify-between">
//         <div>
//           <p className="text:[2rem] text-left font-poppins font-semibold text-[#111111] md:text-[35px]">
//             Let’s Talk
//           </p>
//           <p className="font pt-3 text-left text-[14px] font-normal text-[#666666] lg:text-center lg:text-xs">
//             Reach out and let’s start the conversation:
//           </p>
//         </div>
//         <Image src={chat} width={111} height={73} alt="chat" />
//       </div>
//       <div>
//         <InputField
//           className="my-2"
//           name="name"
//           value={inputValue.name}
//           handleChange={handleChange}
//           placeholder="Name"
//         />
//         <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
//           <InputField
//             className="mt-2 lg:my-2"
//             name="email"
//             value={inputValue.email}
//             handleChange={handleChange}
//             placeholder="Email"
//           />
//           <InputField
//             className="mb-2 lg:my-2"
//             name="phone"
//             value={inputValue.phone}
//             handleChange={handleChange}
//             placeholder="Phone No"
//           />
//         </div>
//         <SelectField
//           className="my-2"
//           name="service"
//           value={inputValue.service}
//           handleChange={handleChange}
//           placeholder="Service"
//           options={[
//             { label: 'Service 1', value: 'service1' },
//             { label: 'Service 2', value: 'service2' },
//           ]}
//         />
//         <MessageField
//           name={'message'}
//           value={inputValue.message}
//           handleChange={handleChange}
//           placeholder="Message"
//           className="my-2"
//         />
//       </div>
//       <SaveAndCancel
//         name={'Submit'}
//         handleClick={handleClick}
//         isFullWidth={true}
//         isIcon={true}
//         className=""
//       />
//     </div>
//   );
// };

// export default ContactForm;

'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '../UI/InputField';
import SelectField from '../UI/SelectField';
import MessageField from '../UI/MessageField';
import SaveAndCancel from '../../common/SaveAndCancel';
import chat from '../../../../../public/assets/icons/chat.png';
import { useReCaptcha } from 'next-recaptcha-v3';
const options = [];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile numbers

const ContactForm = () => {
  const [errors, setErrors] = useState<{
    email?: string;
    phone?: string;
  }>({});

  const router = useRouter();
  const { executeRecaptcha } = useReCaptcha();

  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  // const handleClick = async () => {
  //   if (!executeRecaptcha) return;

  //   try {
  //     const token = await executeRecaptcha('contact_page_form');

  //     const payload = {
  //       ...inputValue,
  //       gRecaptchaToken: token,
  //     };

  //     const response = await fetch('/api/zoho/leadRegister', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(payload),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Submission failed');
  //     }

  //     // reset form
  //     setInputValue({
  //       name: '',
  //       email: '',
  //       phone: '',
  //       service: '',
  //       message: '',
  //     });

  //     router.push('/thankyou');
  //   } catch (error) {
  //     console.error(error);
  //     alert('Failed to submit form. Please try again.');
  //   }
  // };

  const handleClick = async () => {
    if (!executeRecaptcha) return;

    const newErrors: typeof errors = {};

    if (!emailRegex.test(inputValue.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!phoneRegex.test(inputValue.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const token = await executeRecaptcha('contact_page_form');

      const payload = {
        ...inputValue,
        gRecaptchaToken: token,
      };

      const response = await fetch('/api/zoho/leadRegister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Submission failed');

      setInputValue({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });

      setErrors({});
      router.push('/thankyou');
    } catch (error) {
      console.error(error);
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <div className="h-full w-full flex-1 space-y-8 rounded-2xl p-4 text-center shadow-[0_0_20px_rgba(66,71,76,0.08)] lg:p-14 lg:text-left">
      <div className="flex justify-between">
        <div>
          <p className="text-left text-[35px] font-semibold text-[#111111]">
            Let’s Talk
          </p>
          <p className="pt-3 text-left text-[14px] text-[#666666]">
            Reach out and let’s start the conversation:
          </p>
        </div>
        <Image src={chat} width={111} height={73} alt="chat" />
      </div>

      <div>
        <InputField
          className="my-2"
          name="name"
          value={inputValue.name}
          handleChange={handleChange}
          placeholder="Name"
        />

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <InputField
            name="email"
            value={inputValue.email}
            handleChange={handleChange}
            placeholder="Email"
          />
          <InputField
            name="phone"
            maxLength={10}
            value={inputValue.phone}
            handleChange={handleChange}
            placeholder="Phone No"
          />
        </div>

        <SelectField
          className="my-2"
          name="service"
          value={inputValue.service}
          handleChange={handleChange}
          placeholder="Service"
          options={[
            {
              label: 'Web Design & Development',
              value: 'Web Design & Development',
            },
            { label: 'Graphic Design', value: 'Graphic Design' },
            {
              label: 'Paid Media & Advertising',
              value: 'Paid Media & Advertising',
            },
            {
              label: 'Search Engine Optimization',
              value: 'Search Engine Optimization',
            },
            {
              label: 'Strategic Social Media Management',
              value: 'Strategic Social Media Management',
            },
            {
              label: 'Content Marketing',
              value: 'Content Marketing',
            },
          ]}
        />

        <MessageField
          name="message"
          value={inputValue.message}
          handleChange={handleChange}
          placeholder="Message"
          className="my-2"
        />
      </div>

      <SaveAndCancel
        name="Submit"
        handleClick={handleClick}
        isFullWidth
        isIcon
      />
    </div>
  );
};

export default ContactForm;
