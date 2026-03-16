export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background">
      <div className="mx-auto flex h-12 w-full max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
        <p className="text-xs text-muted-foreground">© {year} Diary App</p>
      </div>
    </footer>
  );
}
