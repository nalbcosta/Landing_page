"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import styles from "./BackToTop.module.css";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const ticking = useRef(false);
  const iconControls = useAnimation();

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY || document.documentElement.scrollTop;
          setVisible(y > 300);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = async () => {
    // animate the arrow going up inside the button
    iconControls.start({
      y: [0, -12, 0],
      opacity: [1, 0.85, 1],
      transition: { duration: 0.48, ease: "easeOut", times: [0, 0.5, 1] },
    });
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      window.scrollTo({ top: 0 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Voltar ao topo"
          className={styles.button}
          onClick={scrollTop}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
        >
          <motion.span animate={iconControls} initial={false}>
            <FaArrowUp />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
