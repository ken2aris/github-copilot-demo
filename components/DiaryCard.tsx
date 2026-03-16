"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteDiary, type Diary, updateDiary } from "@/features/diary/diarySlice";
import { useAppDispatch } from "@/lib/hooks";
import { DiaryFormDialog } from "@/components/DiaryFormDialog";
import { ConfirmDialog } from "@/components/ConfirmDialog";

type DiaryCardProps = {
  diary: Diary;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function preview(content: string) {
  return content.length > 90 ? `${content.slice(0, 90)}...` : content;
}

export function DiaryCard({ diary }: DiaryCardProps) {
  const dispatch = useAppDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const imageUrl = useMemo(() => {
    const sig = Array.from(diary.id).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `https://source.unsplash.com/900x600/?journal,notebook,writing&sig=${sig}`;
  }, [diary.id]);

  return (
    <>
      <Card className="overflow-hidden transition hover:-translate-y-1 hover:shadow-md">
        <div className="relative h-40 w-full">
          <Image src={imageUrl} alt={diary.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-1">{diary.title}</CardTitle>
          <CardDescription>更新: {formatDate(diary.updatedAt)}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{preview(diary.content)}</p>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsEditOpen(true)}>
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={() => setIsDeleteOpen(true)}>
            Delete
          </Button>
        </CardFooter>
      </Card>

      <DiaryFormDialog
        mode="edit"
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        initialValue={{ title: diary.title, content: diary.content }}
        onSubmit={(value) => dispatch(updateDiary({ id: diary.id, ...value }))}
      />

      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="日記を削除しますか？"
        description="削除するとこの日記は復元できません。"
        onConfirm={() => dispatch(deleteDiary({ id: diary.id }))}
      />
    </>
  );
}
