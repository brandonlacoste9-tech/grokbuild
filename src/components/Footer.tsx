export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-muted">
          Built by The Grok Collective with Grok Build
        </p>

        <nav className="flex flex-wrap gap-4 text-sm" aria-label="Footer">
          <a
            href="https://grok.x.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition hover:text-[#00E5FF]"
          >
            Grok
          </a>
          <a
            href="https://x.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition hover:text-[#00E5FF]"
          >
            xAI
          </a>
        </nav>
      </div>
    </footer>
  );
}
