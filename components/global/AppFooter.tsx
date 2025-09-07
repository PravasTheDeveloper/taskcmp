"use client"

interface AppFooterProps {
  companyName?: string
  links?: Array<{ label: string; href: string }>
}

const defaultLinks = [
  { label: "Terms", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Contact", href: "#" },
]

export default function AppFooter({ 
  companyName = "CMPTasks",
  links = defaultLinks
}: AppFooterProps) {
  return (
    <footer className="border-t pt-4 text-xs text-muted-foreground flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="size-4 rounded bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)]" />
        <span>© {new Date().getFullYear()} {companyName}</span>
      </div>
      <div className="flex items-center gap-4">
        {links.map((link) => (
          <a key={link.label} className="hover:underline" href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  )
}
