import { useEffect, useState } from "react";
import Logo from "/logo.png"
import { CiShoppingCart, CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50); // Adjust the threshold as needed
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 font-parkisans ${
        isScrolled ? "bg-blue-400 shadow-md" : "bg-blue-300"
      }`}
    >
      <nav className="mx-auto flex items-center justify-between p-5 sm:px-6 md:px-8 lg:px-12 xl:px-16 xxl:px-24">
        <div className="flex items-center gap-2 text-lg font-bold text-darkBlue lg:text-2xl xxl:text-[26px]">
          <img
            src={Logo}
            alt="Sneak Logo"
            className="w-8 xs:w-10 lg:w-12 xxl:w-14 "
          />
          SNEAK MART
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex md:items-center space-x-6 font-medium lg:text-lg lg:space-x-8 xl:space-x-12">
          <li>
            <Link
              to="/"
              className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center hover:text-primary"
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              to="/catalog"
              className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center hover:text-primary"
            >
              CATALOG
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center hover:text-primary"
            >
              ABOUT
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center hover:text-primary"
            >
              CONTACT
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3 xs:gap-5 sm:gap-8">
          <button>
            <Link to="/cart">
              <CiShoppingCart className="w-6 h-6 hover:text-primary xs:w-8 xs:h-8 lg:w-8 xxl:w-12" />
            </Link>
          </button>
          <button>
            <Link to="/login">
              <CiUser className="w-5 h-5 hover:text-primary xs:w-6 xs:h-6 lg:w-8 xxl:w-12" />
            </Link>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="block md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 hover:text-primary xs:w-8 xs:h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h14M4 12h10M4 18h14"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-full transform transition-transform duration-700 ease-in-out bg-gray-100 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            className="absolute top-6 right-6"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 hover:text-primary xs:w-8 xs:h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <ul className="grid mt-28 space-y-6 font-medium text-xl">
            <li className="mx-auto">
              <Link
                to="/"
                className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                HOME
              </Link>
            </li>
            <li className="mx-auto">
              <Link
                to="/"
                className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                CATALOG
              </Link>
            </li>
            <li className="mx-auto">
              <Link
                to="/"
                className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT
              </Link>
            </li>
            <li className="mx-auto">
              <Link
                to="/"
                className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                CONTACT
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

