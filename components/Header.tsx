import Link from "next/link";
import { BookOpenText } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* App name */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <BookOpenText className="h-5 w-5" aria-hidden="true" />
          <span>Diary App</span>
        </Link>

        {/* Navigation placeholder — extend here when auth / routes are added */}
        <nav aria-label="グローバルナビゲーション">
          {/* future navigation items */}
        </nav>
      </div>
    </header>
  );
}
