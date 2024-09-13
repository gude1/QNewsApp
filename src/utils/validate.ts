export function validateEmail(value: string) {
  if (validateFilled(value)) {
    return validateFilled(value);
  }
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    return 'Enter a valid email address!';
  } else {
    return '';
  }
}

export function validateName(value: string) {
  if (validateFilled(value)) {
    return validateFilled(value);
  }
  if (!/^[A-Za-z][A-Za-z\s'-]{2,19}$/.test(value)) {
    return 'Name must be between 3-20 characters long';
  } else {
    return '';
  }
}

export function validatePassword(password: string): string | null {
  const minLength = 8;

  // Combined regex for all password rules:
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  // The standard message describing the password requirements
  const passwordCriteria = `Password must be at least ${minLength} characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.`;

  // Perform the check in a single step
  return passwordRegex.test(password) ? null : passwordCriteria;
}

export function validatePhoneNumber(value: string) {
  if (validateFilled(value)) {
    return validateFilled(value);
  }
  if (!/^[0][7-9][0-1][0-9]{8}$/i.test(value)) {
    return 'Enter phone number in this format: 08012345678';
  } else {
    return '';
  }
}

export function validateNumber(value: string, length?: number) {
  let err = validateFilled(value, length);
  if (err) {
    return err;
  }

  if (!/^\d+$/.test(value)) {
    return 'Input can only contain numbers';
  }
  return '';
}

export function validateFilled(value: string, length?: number) {
  if (!value) {
    return 'Input is required';
  }
  if (length && value.length < length) {
    return `Input is required and must be atleast ${length} characters long`;
  }
  return '';
}

export function validateBvn(value: string) {
  let err = validateFilled(value, 11);
  let err2 = validateNumber(value);
  if (err) {
    return err;
  }
  if (err2) {
    return err2;
  } else {
    return '';
  }
}
