import React from "react";
import { motion } from "framer-motion";
const LoadingScreen = () => {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="loading-spinner"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ loop: Infinity, duration: 1 }}
      ></motion.div>
      <p>Loading...</p>
    </motion.div>
  );
};

export default LoadingScreen;

