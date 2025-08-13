import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TypingTextProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
}

const TypingText: React.FC<TypingTextProps> = ({
  texts,
  speed = 100,
  deleteSpeed = 50,
  pauseTime = 1500,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const maxLength = Math.max(...texts.map((t) => t.length));

  useEffect(() => {
    let timeout: number;

    if (!isDeleting && displayedText.length < texts[textIndex].length) {
      timeout = setTimeout(() => {
        setDisplayedText(texts[textIndex].slice(0, displayedText.length + 1));
      }, speed);
    } else if (!isDeleting && displayedText.length === texts[textIndex].length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(texts[textIndex].slice(0, displayedText.length - 1));
      }, deleteSpeed);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, textIndex, texts, speed, deleteSpeed, pauseTime]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        fontSize: "3rem",
        fontWeight: "bold",
        whiteSpace: "wrap",
        // borderRight: "3px solid",
        paddingRight: "5px",
        display: "block",
        minWidth: `${maxLength}ch`,
        height: "1.5em", // Locks height so it never collapses
        lineHeight: "1em", // Prevents vertical shift
      }}
    >
      {displayedText}
    </motion.div>
  );
};

export default TypingText;
