import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Diary = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

type DiaryState = {
  diaries: Diary[];
  selectedId: string | null;
};

const now = new Date().toISOString();

const initialState: DiaryState = {
  diaries: [
    {
      id: "sample-1",
      title: "最初の日記",
      content:
        "今日から日記アプリを始めた。UI が心地よくて、書くことが楽しくなるデザインにしたい。",
      createdAt: now,
      updatedAt: now
    }
  ],
  selectedId: null
};

function makeId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `diary-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    addDiary: (state, action: PayloadAction<{ title: string; content: string }>) => {
      const nowIso = new Date().toISOString();
      state.diaries.unshift({
        id: makeId(),
        title: action.payload.title,
        content: action.payload.content,
        createdAt: nowIso,
        updatedAt: nowIso
      });
    },
    updateDiary: (
      state,
      action: PayloadAction<{ id: string; title: string; content: string }>
    ) => {
      const target = state.diaries.find((diary) => diary.id === action.payload.id);
      if (!target) {
        return;
      }
      target.title = action.payload.title;
      target.content = action.payload.content;
      target.updatedAt = new Date().toISOString();
    },
    deleteDiary: (state, action: PayloadAction<{ id: string }>) => {
      state.diaries = state.diaries.filter((diary) => diary.id !== action.payload.id);
      if (state.selectedId === action.payload.id) {
        state.selectedId = null;
      }
    },
    selectDiary: (state, action: PayloadAction<string | null>) => {
      state.selectedId = action.payload;
    },
    hydrateDiaries: (state, action: PayloadAction<DiaryState>) => {
      state.diaries = action.payload.diaries;
      state.selectedId = action.payload.selectedId;
    }
  }
});

export const { addDiary, updateDiary, deleteDiary, selectDiary, hydrateDiaries } = diarySlice.actions;
export default diarySlice.reducer;
