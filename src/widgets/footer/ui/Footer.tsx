function Footer() {
  const version = '2.0.1';
  return (
    <footer className="w-full border-t border-dotted bg-white px-[80px]">
      <section className="flex flex-col items-center gap-1 border-l border-r border-dotted px-5 py-1 justify-center">
        <span className="text-sm text-muted-foreground">v{version}</span>
        <span className="text-sm text-muted-foreground">
          © 2025 clipVault. All rights reserved.
        </span>
      </section>
    </footer>
  );
}

export { Footer };
