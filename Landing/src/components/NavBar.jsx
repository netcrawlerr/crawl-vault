import { FaTelegram, FaDownload } from "react-icons/fa6";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center  z-50 relative">
      <div className="logo flex justify-start items-center gap-x-2">
        <img src="/lock.png" className="w-[40px] sm:w-[50px]" alt="logo" />
        <h1 className="text-slate-100 text-sm sm:text-3xl">Crawl Vault</h1>
      </div>

      <div className="flex justify-end items-center gap-6 sm:gap-10 text-white text-sm sm:text-xl">
        <a
          className="flex justify-center items-center gap-x-2 sm:gap-x-4 hover:text-green-400 transition-all"
          href="#"
          download={true}
        >
          <FaDownload />
          <span>Download</span>
        </a>
        <a
          className="flex justify-center items-center gap-x-2 sm:gap-x-5 hover:text-green-400 transition-all"
          href="https://t.me/netcrawler_ish"
        >
          <FaTelegram />
          <span>Say Hi</span>
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
