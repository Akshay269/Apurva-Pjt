import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface UseScrollAnimationProps {
  threshold?: number;
  triggerOnce?: boolean;
  margin?: string;
}

export const useScrollAnimation = ({
  threshold = 0.1,
  triggerOnce = false,
  margin = "-10% 0px -30% 0px"
}: UseScrollAnimationProps = {}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    threshold,
    once: triggerOnce,
    margin
  });

  return { ref, isInView };
};
