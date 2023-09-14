import { Errors, fieldNames } from "../types/errors-types";
import { emailRegExp, subjectRegExp, messageRegExp  } from "./regexPatterns";  

/**
 * Manages errors for form validation.
 */
 class ErrorsManager {
  private static errors: Errors = ErrorsManager.init();
  
  /**
   * Initializes the errors object with default values.
   *
   * @returns {Errors} The initialized errors object.
   */
  static init(): Errors {
    return {
    email: [
       {
        state: false,
        errorMessage: "",
      },
      {
        state: false,
        errorMessage: "",
      },
    ],
    subject: [
      {
        state: false,
        errorMessage: "",
      },
      {
        state: false,
        errorMessage: "",
      },
      {
        state: false,
        errorMessage: "",
      },
      {
        state: false,
        errorMessage: "",
      },
    ],
    message: [
      {
        state: false,
        errorMessage: "",
      },
      {
        state: false,
        errorMessage: "",
      },
      {
        state: false,
        errorMessage: "",
      },
      {
        state: false,
        errorMessage: "",
      },
    ],
  };
  }
  /**
   * Validates the form inputs and returns any errors.
   *
   * @param {string} email - The email address to validate.
   * @param {string} subject - The subject of the form.
   * @param {string} message - The message of the form.
   * @returns {Errors} An object containing any validation errors.
   */
  static validateForm (email: string, subject: string, message: string): Errors {
    const newErrors: Errors = {
        email: [
          {
            state: !emailRegExp.required.test(email),
            errorMessage: "Email is required",
          },
          {
            state: !email || !emailRegExp.invalid.test(email),
            errorMessage: "Email is invalid",
          },
        ],
        subject: [
          {
            state: !subjectRegExp.required.test(subject),
            errorMessage: "Subject is required",
          },
          {
            state: !subject || !subjectRegExp.invalid.test(subject),
            errorMessage: "Subject is invalid",
          },
          {
            state: subjectRegExp.tooShort.test(subject),
            errorMessage: "Subject is too short",
          },
          {
            state: subjectRegExp.tooLong.test(subject),
            errorMessage: "Subject is too long",
          }
        ],
        message: [
          {
            state: !messageRegExp.required.test(message),
            errorMessage: "Message is required",
          },
          {
            state: !message || !messageRegExp.invalid.test(message),
            errorMessage: "Message is invalid",
          },
          {
            state: messageRegExp.tooShort.test(message),
            errorMessage: "Message is too short",
          },
          {
            state: messageRegExp.tooLong.test(message),
            errorMessage: "Message is too long",
          }
        ],
      };
      this.errors = newErrors;
      return this.errors;
  }

  
  static validateField(fieldName: fieldNames, value: string): Errors {
    const newErrors = { ...this.errors }; // Copia los errores existentes

    switch (fieldName) {
      case fieldNames.email:
        newErrors.email = [
          {
            state: !emailRegExp.required.test(value),
            errorMessage: "Email is required",
          },
          {
            state: !value || !emailRegExp.invalid.test(value),
            errorMessage: "Email is invalid",
          },
        ];
        break;
      case fieldNames.subject:
        newErrors.subject = [
          {
            state: !subjectRegExp.required.test(value),
            errorMessage: "Subject is required",
          },
          {
            state: !value || !subjectRegExp.invalid.test(value),
            errorMessage: "Subject is invalid",
          },
          {
            state: subjectRegExp.tooShort.test(value),
            errorMessage: "Subject is too short",
          },
          {
            state: subjectRegExp.tooLong.test(value),
            errorMessage: "Subject is too long",
          },
        ];
        break;
      case fieldNames.message:
        newErrors.message = [
          {
            state: !messageRegExp.required.test(value),
            errorMessage: "Message is required",
          },
          {
            state: !value || !messageRegExp.invalid.test(value),
            errorMessage: "Message is invalid",
          },
          {
            state: messageRegExp.tooShort.test(value),
            errorMessage: "Message is too short",
          },
          {
            state: messageRegExp.tooLong.test(value),
            errorMessage: "Message is too long",
          },
        ];
        break;
      default:
        break;
    }

    this.errors = newErrors;
    return newErrors;
  }

  /**
   * Checks if any validation errors exist.
   *
   * @param {fieldNames.email | fieldNames.subject | fieldNames.message} [fieldName] - The field name to check for errors.
   * @returns {boolean} true if errors exist, false otherwise.
   */
  static existsErrors(fieldName?: fieldNames.email | fieldNames.subject | fieldNames.message): boolean {
    if(fieldName === undefined) return Object.keys(this.errors).some((fieldNames) => this.errors[fieldNames as keyof Errors].some((error) => error.state));
    return this.errors[fieldName.toString() as keyof Errors].some((error) => error.state);
  }


  /**
   * Returns an array of error messages for the specified field.
   *
   * @param {string} field - The field name to get errors for.
   * @returns {string[]} An array of error messages.
   */
  static getErrors(field: fieldNames): string[] {
    const errorMessages: string[] = [];
    if(!this.existsErrors(field)) return [];
    this.errors[field as keyof Errors].map((error) =>    {return error.state ? errorMessages.push(error.errorMessage) : "";
    });
    return errorMessages;
  }
}

export default ErrorsManager;