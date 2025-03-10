"use client";

import Input from "@/components/forms/Input";
import TextBox from "@/components/forms/TextBox";
import { Trash } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { saveFlashcardSet } from "../_saveFlashcardSet";
import EditFlashcard from "@/components/flashcard/EditFlashcard";
import { FlashcardSet } from "@/lib/flashcards/set";

export default function CreateSetPage() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [cards, setCards] = useState<{ term: string; definition: string }[]>([
    { term: "", definition: "" },
  ]);
  const [lastSavedState, setLastSavedState] = useState<FlashcardSet>({
    title: "",
    description: "",
    cards: [],
  });
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

  const addCard = () => setCards([...cards, { term: "", definition: "" }]);

  const updateCard = (
    index: number,
    field: "term" | "definition",
    value: string
  ) => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      newCards[index] = { ...newCards[index], [field]: value };
      return newCards;
    });
  };

  const deleteCard = (index: number) => setDeletingIndex(index);

  const handleAnimationComplete = (index: number) => {
    setCards((prevCards) => prevCards.filter((_, i) => i !== index));
    setDeletingIndex(null);
  };

  const saveData = useCallback(async () => {
    const newState: FlashcardSet = { title, description, cards };
    if (JSON.stringify(newState) !== JSON.stringify(lastSavedState)) {
      console.log("Saving flashcard set...");
      await saveFlashcardSet(newState);
      setLastSavedState(newState);
    }
  }, [title, description, cards, lastSavedState]);

  useEffect(() => {
    const interval = setInterval(saveData, 3000);
    return () => clearInterval(interval);
  }, [saveData]);

  useEffect(() => {
    const handleUnload = () => saveData();
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [saveData]);

  return (
    <div className="flex flex-col px-16 py-4 gap-4">
      <h2 className="font-bold text-[#fafafa] text-3xl">
        Create a new flashcard set
      </h2>
      <div className="bg-[#1f1f1f] border-[1.5px] border-[#2e2e2e] rounded-2xl w-full grid gap-2 px-8 py-4">
        <Input
          label="Title"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextBox
          label="Description"
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <hr className="border-t-[#2e2e2e] border-t-[1.5px] my-3" />
      <div className="w-full flex flex-col gap-4">
        {cards.map((card, index) => (
          <EditFlashcard
            key={index}
            index={index}
            card={card}
            updateCard={updateCard}
            deleteCard={deleteCard}
            deletingIndex={deletingIndex}
            handleAnimationComplete={handleAnimationComplete}
          />
        ))}
        <button
          type="button"
          onClick={addCard}
          className="px-3 py-1 bg-[#2d2d2d] border-[#3a3a3a] border-[1.5px] hocus:brightness-125 cursor-pointer rounded-xl duration-300"
        >
          Add Flashcard
        </button>
      </div>
    </div>
  );
}
