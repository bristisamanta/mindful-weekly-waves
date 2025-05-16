
import React from "react";
import { useState } from "react";
import { GenderFemale, GenderMale } from "phosphor-react";

type Props = {
  open: boolean;
  onSelect: (gender: "male" | "female") => void;
};

const GenderModal: React.FC<Props> = ({ open, onSelect }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 animate-fadeIn">
      <div className="glass-card p-8 max-w-xs w-full flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
        <p className="mb-5 text-center">Are you male or female?</p>
        <div className="flex gap-8">
          <button
            className="focus:outline-none flex flex-col items-center group"
            onClick={() => onSelect("female")}
            aria-label="Female"
          >
            <GenderFemale size={52} color="#9b87f5" className="emoji-hover" weight="fill" />
            <span className="mt-2 text-base group-hover:underline">Female</span>
          </button>
          <button
            className="focus:outline-none flex flex-col items-center group"
            onClick={() => onSelect("male")}
            aria-label="Male"
          >
            <GenderMale size={52} color="#9b87f5" className="emoji-hover" weight="fill" />
            <span className="mt-2 text-base group-hover:underline">Male</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenderModal;
