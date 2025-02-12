import { motion, Variants } from "framer-motion";
import CldImage from "../CloudinaryImageComponent";

export type Data = {
  img: string;
  title: string;
  subHead: string;
};

type BackgroundImageProps = {
  currentData: Data;
  nextData: Data;
};

const BackgroundImage = ({ currentData, nextData }: BackgroundImageProps) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <motion.div
        key={currentData.img}
        initial="visible"
        animate="hidden"
        exit="hidden"
        variants={containerVariants}
        transition={{
          opacity: { duration: 0.5, ease: "easeOut" },
        }}
        className="absolute left-0 top-0 z-1 h-full w-full current"
      >
        <CldImage
          src={currentData.img}
          quality={70}
          fill
          style={{
            objectFit: "cover",
          }}
          alt="Banner Image"
          priority
        />
        <div className="sm:hidden absolute inset-0 bg-black opacity-50" />
      </motion.div>

      <motion.div
        key={nextData.img}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={containerVariants}
        transition={{
          opacity: { duration: 0.5, ease: "easeOut" },
        }}
        className="absolute left-0 top-0 z-1 h-full w-full"
      >
        <CldImage
          src={nextData.img}
          quality={70}
          fill
          style={{
            objectFit: "cover",
          }}
          alt="Banner Image"
        />
        <div className="sm:hidden absolute inset-0 bg-black opacity-50" />
      </motion.div>
    </>
  );
};

export default BackgroundImage;
