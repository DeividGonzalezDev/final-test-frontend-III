export type Errors = {
  email: EmailErrorTypes;
  subject: SubjectErrorTypes;
  message: MessageErrorTypes;
}

type EmailErrorTypes = [
  required: GeneralErrorType,
  invalid: GeneralErrorType
]
type SubjectErrorTypes = [
  required: GeneralErrorType,
  invalid: GeneralErrorType,
  tooShort: GeneralErrorType,
  tooLong: GeneralErrorType,
]
type MessageErrorTypes = [
  required: GeneralErrorType,
  invalid: GeneralErrorType,
  tooShort: GeneralErrorType,
  tooLong: GeneralErrorType,
]
type GeneralErrorType = {
  state: boolean;
  errorMessage: string;
}

export enum fieldNames {
  email = 'email',
  subject = 'subject',
  message = 'message',
}