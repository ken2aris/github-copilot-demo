"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { hydrateDiaries } from "@/features/diary/diarySlice";
import { loadPersistedDiaryState, store } from "@/lib/store";

export function Providers({ children }: { children: React.ReactNode }) {
  const didHydrate = useRef(false);

  useEffect(() => {
    if (didHydrate.current) {
      return;
    }
    didHydrate.current = true;

    const persisted = loadPersistedDiaryState();
    if (persisted) {
      store.dispatch(hydrateDiaries(persisted));
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
