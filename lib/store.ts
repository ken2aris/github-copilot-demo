import { configureStore } from "@reduxjs/toolkit";
import diaryReducer, { type Diary, hydrateDiaries } from "@/features/diary/diarySlice";

const STORAGE_KEY = "diary-app-state";

type PersistedState = {
  diary: {
    diaries: Diary[];
    selectedId: string | null;
  };
};

function loadState(): PersistedState | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return undefined;
    }
    return JSON.parse(raw) as PersistedState;
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    diary: diaryReducer
  }
});

if (typeof window !== "undefined") {
  const persisted = loadState();
  if (persisted?.diary) {
    store.dispatch(hydrateDiaries(persisted.diary));
  }

  store.subscribe(() => {
    const state = store.getState();
    const data: PersistedState = {
      diary: {
        diaries: state.diary.diaries,
        selectedId: state.diary.selectedId
      }
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
