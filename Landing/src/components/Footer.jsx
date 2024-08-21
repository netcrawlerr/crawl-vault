import { FaTelegram, FaLock } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="mt-20 py-10 bg-stone-900 text-slate-400 text-center">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
        <FaLock className="text-green-600 text-2xl sm:text-3xl" />
        <span className="text-lg sm:text-xl">
          Crawl Vault - Your Security Simplified
        </span>
      </div>
      <p className="text-sm sm:text-base">
        &copy; {new Date().getFullYear()} Crawl Vault. All rights reserved.
      </p>
      <div className="flex justify-center items-center gap-4 mt-4">
        <a
          href="https://t.me/netcrawler_ish"
          className="hover:text-green-400 flex justify-center items-center gap-x-3 transition-all"
        >
          From netcrawler 🦉
          <FaTelegram size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
