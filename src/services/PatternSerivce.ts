const VALID_EMAIL_ADDRESS = "/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/";
const VALID_EMAIL_DOMAIN = (allowedDomain:string) => {
  return `^[a-zA-Z0-9._-]+@${allowedDomain}$`;
};
const VALID_USER_NAME = "/^[a-zA-Z0-9_-]{3,16}$/";
const VALID_PASSWORD_GENERAL = "/^(?=.*)(?=.*[a-z])(?=.*[A-Z]).{8,}$/";
const VALID_PASSWORD = (minLength:number) => {
  return `^(?=.*)(?=.*[a-z])(?=.*[A-Z]).{${minLength},}$`;
};

const ALLOW_ALPHABET = "[A-Za-z]+";
const ALLOW_NUMERIC = "[0-9]+";
const ALLOW_ALPHABET_SPACE = "[A-Za-z ]+";
const ALLOW_FLOAT = "[0-9.]+";
const ALLOW_NUMBERS_EXCEPT_ZERO = "^[1-9][0-9]*$";
const NAME_PATTERN = "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$";
const ALPHA_NUMERIC_CAPITAL = "^[A-Z0-9]+$";
const GST = "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$";
const ALLOW_FLOAT_DYNAMIC = (lastDigit:number) => {
  return "-?*.?{0,2}";
};

export {
  ALLOW_ALPHABET, ALLOW_ALPHABET_SPACE,
  ALLOW_FLOAT,
  ALLOW_FLOAT_DYNAMIC,
  // allow patters
  ALLOW_NUMBERS_EXCEPT_ZERO, ALLOW_NUMERIC, ALPHA_NUMERIC_CAPITAL, NAME_PATTERN, VALID_EMAIL_ADDRESS,
  VALID_EMAIL_DOMAIN, VALID_PASSWORD, VALID_PASSWORD_GENERAL, VALID_USER_NAME,GST
};

