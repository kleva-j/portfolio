import { GithubLogoIcon, StarIcon } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const MotionButton = motion.create(Button);

export function GithubStarButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <MotionButton
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      variant="outline"
      className="rounded"
    >
      <div className="relative flex h-4 w-4 shrink-0 items-center justify-center">
        <AnimatePresence mode="popLayout" initial={false}>
          {!isHovered ? (
            <motion.div
              key="icon1"
              initial={{ y: -15, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -15, opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 600, damping: 25 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <GithubLogoIcon className="h-4 w-4" />
            </motion.div>
          ) : (
            <motion.div
              key="icon2"
              initial={{ y: 15, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 15, opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 600, damping: 25 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <StarIcon className="h-4 w-4 text-yellow-400" />
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -45, y: 10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0, rotate: 45, y: 10 }}
                transition={{
                  type: "spring",
                  stiffness: 600,
                  damping: 25,
                  delay: 0.05,
                }}
                className="absolute -top-3 -right-2"
              >
                <svg
                  className="h-2.5 w-2.5 text-yellow-200"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l2.4 7.6H22l-6.2 4.5 2.4 7.6-6.2-4.5-6.2 4.5 2.4-7.6L2 9.6h7.6z" />
                </svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <span className="text-[13px] font-medium tracking-tight">
        Star on GitHub
      </span>
    </MotionButton>
  );
}
