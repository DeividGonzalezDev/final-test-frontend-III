// regexPatterns.js
export const emailRegExp = {
  required: /.+/,
  invalid: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
};

export const subjectRegExp = {
  required: /.+/,
  invalid: /^[A-Za-z0-9áéíóúÁÉÍÓÚñÑ,.\s]*$/,
  tooShort: /^.{1,9}$/,
  tooLong: /^.{101,}$/,
};

export const messageRegExp = {
  required: /.+/,
  invalid: /^[A-Za-z0-9áéíóúÁÉÍÓÚñÑ,.;:()'"\s]*$/,
  tooShort: /^.{1,9}$/,
  tooLong: /^.{501,}$/,
};
