const validators = {
  firstName: (value: string) =>
    /^[A-Za-z]{2,}$/.test(value)
      ? ''
      : 'First name must contain only letters (min 2)',

  lastName: (value: string) =>
    /^[A-Za-z]{2,}$/.test(value)
      ? ''
      : 'Last name must contain only letters (min 2)',

  email: (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ? ''
      : 'Enter a valid email address',

  phone: (value: string) =>
    /^\d{10,15}$/.test(value) ? '' : 'Phone number must be 10 digits',
  website: (value: string) =>
    value.trim() === '' ||
    /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/.test(value.trim())
      ? ''
      : 'Enter a valid website URL',

  message: (value: string) =>
    value.trim().length >= 10
      ? ''
      : 'Message must be at least 10 characters long',
};
export default validators;
