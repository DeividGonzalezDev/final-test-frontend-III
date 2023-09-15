import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
  <div className="mx-auto max-w-screen-xl text-center">
      <Link to="#" className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="mr-2 h-8" src="/dental-clinic-logo.png" />
          Deivid's Clinic    
      </Link>
      <p className="my-6 text-gray-500 dark:text-gray-400">Your oral health is our priority. At Deivid's Dental Clinic, we take pride in providing quality dental care to keep your smiles radiant and healthy. </p>
      <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
          <li>
              <Link to="#" className="mr-4 hover:underline md:mr-6 ">About</Link>
          </li>
          <li>
              <Link to="/" className="mr-4 hover:underline md:mr-6">Dentists</Link>
          </li>
          <li>
              <Link to="#" className="mr-4 hover:underline md:mr-6 ">Campaigns</Link>
          </li>
          <li>
              <Link to="#" className="mr-4 hover:underline md:mr-6">Blog</Link>
          </li>
          <li>
              <Link to="#" className="mr-4 hover:underline md:mr-6">Pricing</Link>
          </li>
          <li>
              <Link to="#" className="mr-4 hover:underline md:mr-6">FAQs</Link>
          </li>
          <li>
              <Link to="/contact" className="mr-4 hover:underline md:mr-6">Contact</Link>
          </li>
      </ul>
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">©2023 <Link to="#" className="hover:underline">Deivid González™</Link>. All Rights Reserved.</span>
  </div>
</footer>
  );
};

export default Footer;