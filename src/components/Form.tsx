import { FormEvent, useEffect, useState } from "react";
import ErrorsManager from "../utils/ErrorsManager";
import {  fieldNames } from "../types/errors-types";
import { ToastContainer, toast } from "react-toastify";

const Form = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sendButton, setSendButton] = useState(false);
  //const [errors, setErrors] = useState(ErrorsManager.init());

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    ErrorsManager.validateForm(email, subject, message);
    //setErrors(newErrors);

    if (ErrorsManager.existsErrors()) {
      
      return;
    }
    console.log(email, subject, message);
    toast.success(
      "The message has been sent successfully, we will contact you as soon as possible",
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
    setEmail("");
    setSubject("");
    setMessage("");
  }
  
  useEffect(() => {
    // Verificar si el usuario ha interactuado con los campos del formulario
    const hasUserInteracted = email || subject || message;
    
    // Evitar que se ejecute el efecto al principio
    if (hasUserInteracted) {
      setSendButton(!!(!ErrorsManager.existsErrors() && email && subject && message));
    }
  }, [email, subject, message]);
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div>
        <label
          htmlFor="email"
          className={
            ErrorsManager.existsErrors(fieldNames.email)
              ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
              : "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          }
        >
          Your email
        </label>
        <input
          type="text"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
            ErrorsManager.validateField(fieldNames.email, e.target.value);
            
          }}
          value={email}
          className={
            ErrorsManager.existsErrors(fieldNames.email)
              ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
              : "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
          }
          placeholder="name@gmail.com"
        />
        { ErrorsManager.getErrors(fieldNames.email).map((error, index) => (
          <p
            key={index.toExponential()}
            className="mt-2 text-sm text-red-600 dark:text-red-500"
          >
            <span className="font-medium">Oops!</span> {error} <br />
          </p>
        ))}
      </div>
      <div>
        <label
          htmlFor="subject"
          className={
            ErrorsManager.existsErrors(fieldNames.subject)
              ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
              : "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          }
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          onChange={(e) => {
            setSubject(e.target.value);
            ErrorsManager.validateField(fieldNames.subject, e.target.value);
          }}
          value={subject}
          className={
            ErrorsManager.existsErrors(fieldNames.subject)
              ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
              : "block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
          }
          placeholder="Let us know how we can help you"
        />
        {ErrorsManager.getErrors(fieldNames.subject).map((error, index) => (
          <p
            key={index.toExponential()}
            className="mt-2 text-sm text-red-600 dark:text-red-500"
          >
            <span className="font-medium">Oops!</span> {error} <br />
          </p>
        ))}
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="message"
          className={
            ErrorsManager.existsErrors(fieldNames.message)
              ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
              : "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          }
        >
          Your message
        </label>
        <textarea
          id="message"
          onChange={(e) => {
            setMessage(e.target.value);
            ErrorsManager.validateField(fieldNames.message, e.target.value);

          }}
          value={message}
          rows={6}
          className={
            ErrorsManager.existsErrors(fieldNames.message)
              ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
              : "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          }
          placeholder="Leave a comment..."
        ></textarea>
        {ErrorsManager.getErrors(fieldNames.message).map((error, index) => (
          <p
            key={index.toExponential()}
            className="mt-2 text-sm text-red-600 dark:text-red-500"
          >
            <span className="font-medium">Oops!</span> {error} <br />
          </p>
        ))}
      </div>
      <button
        type={sendButton ? "submit" : "button"}
        disabled={!sendButton}
        className={
          sendButton
            ? "py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            : "py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-gray-700 sm:w-fit  focus:ring-4 focus:outline-none dark:bg-gray-600  "
        }
      >
        Send message
      </button>
    </form>
  );
};

export default Form;
