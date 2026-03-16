"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type DiaryFormDialogProps = {
  mode: "create" | "edit";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValue?: { title: string; content: string };
  onSubmit: (value: { title: string; content: string }) => void;
};

export function DiaryFormDialog({
  mode,
  open,
  onOpenChange,
  initialValue,
  onSubmit
}: DiaryFormDialogProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setTitle(initialValue?.title ?? "");
      setContent(initialValue?.content ?? "");
      setError("");
    }
  }, [open, initialValue]);

  const handleSave = () => {
    const nextTitle = title.trim();
    const nextContent = content.trim();

    if (!nextTitle || !nextContent) {
      setError("タイトルと本文は必須です。");
      return;
    }

    onSubmit({ title: nextTitle, content: nextContent });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "日記を追加" : "日記を編集"}</DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "今日の出来事や気づきを記録しましょう。"
              : "内容を更新して保存します。"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-3">
          <div className="space-y-2">
            <label htmlFor="diary-title" className="text-sm font-medium">
              タイトル
            </label>
            <Input
              id="diary-title"
              placeholder="例: 春の散歩で見つけたこと"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="diary-content" className="text-sm font-medium">
              本文
            </label>
            <Textarea
              id="diary-content"
              placeholder="本文を入力してください"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            キャンセル
          </Button>
          <Button onClick={handleSave}>{mode === "create" ? "保存" : "更新"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
