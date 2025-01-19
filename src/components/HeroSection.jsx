import { motion } from "framer-motion";
import Carousel from "../Carousel";
import Button from "../Button";
import { Link } from "react-router-dom";


const HeroSection = () => {
  return (
    <main className="font-parkisans bg-gradient-to-b from-blue-300 via-teal-50 to-purple-400 relative w-full grid text-darkBlue py-4 md:flex md:items-center md:pb-20 lg:pt-12 lg:px-4 xl:px-8 xl:gap-6 xxl:px-16 xxl:gap-10">
      <motion.div
        className="flex flex-col gap-2 px-5 items-start z-10 sm:gap-3 xs:px-6 sm:px-8"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 2.5,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <h1 className="text-4xl mt-12 font-black leading-[125%] sm:leading-[128%] sm:text-[46px] md:text-[40px] lg:text-[50px] xl:text-[56px] xl:leading-[130%] xxl:text-[60px]">
          <span className="relative after:w-[120%] after:h-full after:bg-white after:block after:absolute after:-z-10 after:top-0 after:-rotate-2">
            LET’S
          </span>{" "}
          <br /> EXPLORE <br />
          <span className="relative text-white after:w-[120%] after:h-full after:bg-purple-400 after:block after:absolute after:-z-10 after:top-0 after:-rotate-2">
            UNIQUE
          </span>{" "}
          <br /> SNEAKERS
        </h1>
        <p className="font-semibold sm:text-lg xl:text-xl">
          UP T0 20% DISCOUNT OF ALL SNEAKERS.
        </p>
        <Link to="/catalog">
          <Button
            type="button"
            title="CATALOG"
            className="flex justify-center items-center gap-2 px-5 py-3 rounded-md shadow-md drop-shadow-md border mt-6 bg-white font-semibold hover:bg-primary hover:text-white lg:px-14 lg:text-lg lg:mt-12 xl:mt-16"
          />
        </Link>
      </motion.div>
      <Carousel />
    </main>
  );
};

export default HeroSection;
