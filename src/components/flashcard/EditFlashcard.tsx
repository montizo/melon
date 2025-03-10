import { motion } from "framer-motion";
import { Card } from "@/lib/flashcards/card";
import { Trash } from "lucide-react";
import TextBox from "../forms/TextBox";

export default function EditFlashcard({
  index,
  card,
  updateCard,
  deleteCard,
  deletingIndex,
  handleAnimationComplete,
}: {
  index: number;
  card: Card;
  updateCard: (
    index: number,
    field: "term" | "definition",
    value: string
  ) => void;
  deleteCard: (index: number) => void;
  deletingIndex: number | null;
  handleAnimationComplete: (index: number) => void;
}) {
  return (
    <motion.div
      key={index}
      className="bg-[#1f1f1f] border-[1.5px] border-[#2e2e2e] rounded-2xl w-full grid gap-2"
      style={{ perspective: "1500px" }}
      initial={{ opacity: 0, rotateX: 90, y: -40, height: 0 }}
      animate={{
        opacity: deletingIndex === index ? 0 : 1,
        rotateX: deletingIndex === index ? -90 : 0,
        y: deletingIndex === index ? 40 : 0,
        height: deletingIndex === index ? 0 : "auto",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onAnimationComplete={() =>
        deletingIndex === index && handleAnimationComplete(index)
      }
    >
      <div className="flex-between border-b-[1.5px] border-[#2e2e2e] px-8 pt-4 pb-2">
        <p className="font-semibold">{index + 1}</p>
        <Trash
          className="text-red cursor-pointer hocus:brightness-125 size-4"
          onClick={() => deleteCard(index)}
        />
      </div>
      <div className="grid grid-cols-[1fr_1fr] relative gap-8 px-8 pt-2 pb-4">
        <TextBox
          label="Term"
          type="text"
          name="term"
          value={card.term}
          onChange={(e) => updateCard(index, "term", e.target.value)}
        />
        <TextBox
          label="Definition"
          type="text"
          name="definition"
          value={card.definition}
          onChange={(e) => updateCard(index, "definition", e.target.value)}
        />
      </div>
    </motion.div>
  );
}
