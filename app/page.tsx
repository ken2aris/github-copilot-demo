"use client";

import { useState } from "react";
import { DiaryFormDialog } from "@/components/DiaryFormDialog";
import { DiaryList } from "@/components/DiaryList";
import { FloatingAddButton } from "@/components/FloatingAddButton";
import { addDiary } from "@/features/diary/diarySlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function HomePage() {
  const diaries = useAppSelector((state) => state.diary.diaries);
  const dispatch = useAppDispatch();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">My Diary</h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          日々の記録を、シンプルに。{diaries.length}件の日記があります。
        </p>
      </header>

      <DiaryList diaries={diaries} />

      <FloatingAddButton onClick={() => setIsCreateOpen(true)} />
      <DiaryFormDialog
        mode="create"
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={(value) => dispatch(addDiary(value))}
      />
    </div>
  );
}
