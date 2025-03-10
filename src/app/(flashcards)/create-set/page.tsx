"use client";

import Card from "@/components/forms/Card";
import Form from "@/components/forms/Form";
import Input from "@/components/forms/Input";
import TextBox from "@/components/forms/TextBox";
import { useState, useActionState } from "react";

export default function CreateSetPage() {
  //   const [state, action] = useActionState(, null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cards, setCards] = useState([{ term: "", definition: "" }]);

  // Function to handle adding new flashcards
  const addCard = () => {
    setCards([...cards, { term: "", definition: "" }]);
  };

  // Function to handle updating a flashcard
  const updateCard = (
    index: number,
    field: "term" | "definition",
    value: string
  ) => {
    const newCards = [...cards];
    newCards[index][field] = value;
    setCards(newCards);
  };

  //   // Function to handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Set the actionState to indicate submission process
    // setActionState({ status: "loading" });

    // try {
    // Here we can make an API request to save the set (e.g., to a database)
    //   const response = await fetch("/api/create-set", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ title, description, cards }),
    //   });

    //   if (response.ok) {
    //     setActionState({
    //       status: "success",
    //       message: "Set created successfully!",
    //     });
    //   } else {
    //     throw new Error("Failed to create set");
    //   }
    // } catch (error) {
    //   setActionState({ status: "error", message: error.message });
    // }
  };

  return (
    <div className="flex">
      {/* <h1>Create a New Set</h1> */}

      {/* {actionState.status === "loading" && <p>Saving...</p>}
      {actionState.status === "error" && (
        <p style={{ color: "red" }}>{actionState.message}</p>
      )}
      {actionState.status === "success" && (
        <p style={{ color: "green" }}>{actionState.message}</p> */}
      {/* )} */}
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

      <div className="p-16 w-full">
        <h3 className="text-[#fafafa] font-semibold text-2xl">Flashcards</h3>
        {cards.map((card, index) => (
          <Card styles="grid grid-cols-[1fr_1fr]">
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

        <button type="button" onClick={addCard}>
          Add Flashcard
        </button>
      </div>

      {/* <button type="submit">Create Set</button> */}
    </div>
  );
}
