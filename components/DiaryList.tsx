"use client";

import { DiaryCard } from "@/components/DiaryCard";
import { type Diary } from "@/features/diary/diarySlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DiaryListProps = {
  diaries: Diary[];
};

export function DiaryList({ diaries }: DiaryListProps) {
  if (diaries.length === 0) {
    return (
      <Card className="border-dashed bg-white/70">
        <CardHeader>
          <CardTitle className="text-center text-xl">まだ日記がありません</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm text-muted-foreground">
            右下の「+」ボタンから最初の日記を作成してください。
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {diaries.map((diary) => (
        <DiaryCard key={diary.id} diary={diary} />
      ))}
    </section>
  );
}
