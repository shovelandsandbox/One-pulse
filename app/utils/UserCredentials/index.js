const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegex = /^((?!(0))[0-9]{8})$/;

export const validateUserName = (user, countryPhoneRegex, countryEmailRegex) => {
  const phoneRegexToUse = countryPhoneRegex || phoneRegex;
  const emailRegexToUse = countryEmailRegex || emailRegex;
  const emailValidator = new RegExp(emailRegexToUse);
  const phoneValidator = new RegExp(phoneRegexToUse);
  return emailValidator.test(user) || phoneValidator.test(user);
};

export const isValidEmail = email => {
  const emailValidator = new RegExp(emailRegex);
  return emailValidator.test(email);
};
