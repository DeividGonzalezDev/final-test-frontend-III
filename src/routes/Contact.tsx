import Form from "../components/Form";
import { ToastContainer } from "react-toastify";

const Contact = () => {
  return (
    <main className="bg-white dark:bg-gray-900">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Contact us today to get the smile you've always wanted! Our team of
          dental experts is ready to serve your needs. We are here to help you
          achieve optimal oral health, so don't hesitate to call or email us to
          schedule your appointment!
        </p>
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
          theme="dark"
        />
        <Form />
      </div>
    </main>
  );
};

export default Contact;
