"use client";
import React from "react";
import MaxWidthWrapper from "@web-components/MaxWidthWrapper";
import { motion } from "framer-motion";

const Process = () => {
  const process = [
    {
      heading: "Discovery and Planning",
      description:
        "Research the business's landscape, target audience, and specific goals to create a roadmap, ensuring a solid foundation for success.",
    },
    {
      heading: "Strategic Execution",
      description:
        "Seamlessly execute tailored strategies to elevate your brand and maximize your digital impact.",
    },
    {
      heading: "Comprehensive Analysis",
      description:
        "As the campaigns unfold, conduct in-depth analyses to measure performance, user engagement, and campaign effectiveness.",
    },
    {
      heading: "Ongoing Optimization",
      description:
        "Continuously optimize campaigns based on emerging trends, user behavior, and platform algorithms to remain adaptive and impactful.",
    },
    {
      heading: "Evaluation and Reporting",
      description:
        "Regular evaluation and reporting provide valuable insights into strategy effectiveness, progress tracking, and decision-making.",
    },
  ];
  return (
    <MaxWidthWrapper>
      {process.map((item, index) => {
        return (
          <div
            className="flex md:pl-7 space-x-3 md:space-x-10"
            key={item.heading}
          >
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="relative"
              >
                <h2>{index + 1} </h2>
                <span className="absolute left-0 top-0 h-full w-full home-campaign-glowing-icon-glow-2 z-3"></span>
              </motion.div>
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                transition={{ delay: 0.6 }}
                className=" h-full w-[3px] mt-2 rounded-md bg-gradient-to-b from-[#ffd6cc] via-[#ec6547] to-transparent"
              ></motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, type: "tween" }}
              className="md:w-10/12 mb-10"
            >
              <h2
                className="text-[20px] md:text-2xl mb-2 font-medium "
                style={{ transitionDelay: "200ms" }}
              >
                {item.heading}
              </h2>
              <p
                className="text-base sm:text-lg"
                style={{ transitionDelay: "300ms" }}
              >
                {item.description}
              </p>
            </motion.div>
          </div>
        );
      })}
    </MaxWidthWrapper>
  );
};

export default Process;
