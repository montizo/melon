import { AnimatePresence, motion } from "framer-motion";

export default function Error({
  error,
  showError,
}: {
  error: string;
  showError: boolean;
}) {
  return (
    <AnimatePresence>
      {error && showError && (
        <motion.p
          initial={{ marginTop: 0, height: 0, opacity: 0, rotateX: -90 }}
          animate={{ marginTop: 8, height: "auto", opacity: 1, rotateX: 0 }}
          exit={{ marginTop: 0, height: 0, opacity: 0, rotateX: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-[#df4f51] text-sm"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
