"use client";

import Card from "@/components/forms/Card";
import Input from "@/components/forms/Input";
import TextBox from "@/components/forms/TextBox";
import { Trash } from "lucide-react";
import { useState } from "react";

export default function CreateSetPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cards, setCards] = useState([{ term: "", definition: "" }]);

  const addCard = () => {
    setCards([...cards, { term: "", definition: "" }]);
  };

  const updateCard = (
    index: number,
    field: "term" | "definition",
    value: string
  ) => {
    const newCards = [...cards];
    newCards[index][field] = value;
    setCards(newCards);
  };

  const deleteCard = (index: number) => {
    const newCards = cards.filter((_, i) => i !== index);
    setCards(newCards);
  };

  return (
    <div className="flex">
      <aside className="border-r-[1.5px] border-r-[#2e2e2e] p-8 h-[calc(100vh-56px)] w-full max-w-64">
        <h2 className="text-xl text-[#fafafa] font-semibold">Details</h2>
        <Input
          label="Title"
          type="text"
          name="title"
          placeholder=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextBox
          label="Description"
          type="text"
          name="description"
          placeholder=""
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </aside>

      <div className="p-16 w-full grid gap-8">
        <h3 className="text-[#fafafa] font-semibold text-2xl">Flashcards</h3>
        {cards.map((card, index) => (
          <Card key={index} styles="grid grid-cols-[1fr_1fr] relative">
            <Trash
              className="text-red absolute right-2 top-2 size-5 cursor-pointer hocus:brightness-125"
              onClick={() => deleteCard(index)}
            />
            <TextBox
              label="Term"
              type="text"
              name="term"
              onChange={(e) => updateCard(index, "term", e.target.value)}
              value={cards[index].term}
            />
            <TextBox
              label="Definition"
              type="text"
              name="definition"
              onChange={(e) => updateCard(index, "definition", e.target.value)}
              value={cards[index].definition}
            />
          </Card>
        ))}

        <button
          type="button"
          onClick={addCard}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Add Flashcard
        </button>
      </div>
    </div>
  );
}
