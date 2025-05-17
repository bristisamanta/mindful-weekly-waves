
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ADVICE = [
  "It's okay to feel your emotions. Let them be.",
  "Focus on your breath, it brings you back to now.",
  "Progress, not perfection!",
  "A small step forward is still a step.",
  "You are not alone. Someone cares.",
  "Practice self-kindness today.",
  "This moment will pass; be gentle with yourself.",
];

export default function AdviceBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  function handleAsk() {
    // For now, random advice. Could be improved later with API.
    setResponse(ADVICE[Math.floor(Math.random() * ADVICE.length)]);
  }

  function handleDialogClose() {
    setInput("");
    setResponse("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="flex items-center gap-2 mt-1 px-4 py-2 rounded-lg bg-palette-pink/90 text-[#c7447a] font-semibold shadow hover:bg-palette-pink cursor-pointer transition animate-fade-in"
          aria-label="Ask for advice"
        >
          <MessageCircle className="w-5 h-5" />
          Ask for Advice
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feeling stuck?</DialogTitle>
          <DialogDescription>
            Type your worry or a question. Get a calming tip instantly.
          </DialogDescription>
        </DialogHeader>
        <textarea
          className="w-full border rounded-lg px-3 py-2 mt-2 mb-4 resize-none text-base focus:ring-2 focus:ring-palette-pink"
          rows={2}
          placeholder="Type what's on your mind…"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <Button
          type="button"
          disabled={input.trim().length === 0}
          onClick={handleAsk}
          className="bg-palette-lavender text-[#82559d] font-bold"
        >Get Advice</Button>
        {response && (
          <div className="mt-5 px-4 py-3 bg-palette-beige/60 rounded-lg shadow animate-fade-in">
            <span className="text-base font-medium text-[#A389D3]">{response}</span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
