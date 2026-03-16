"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type FloatingAddButtonProps = {
  onClick: () => void;
};

export function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
  return (
    <Button
      aria-label="日記を追加"
      size="icon"
      className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-lg shadow-orange-300/50 transition hover:scale-105 hover:shadow-xl hover:shadow-orange-300/60"
      onClick={onClick}
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
}
