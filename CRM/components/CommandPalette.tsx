"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  href: string;
  category: string;
}

const commands: CommandItem[] = [
  {
    id: "1",
    title: "Dashboard",
    subtitle: "Ir al dashboard principal",
    icon: "dashboard",
    href: "/",
    category: "Navegación",
  },
  {
    id: "2",
    title: "Contactos",
    subtitle: "Gestionar contactos y leads",
    icon: "people",
    href: "/contacts",
    category: "Navegación",
  },
  {
    id: "3",
    title: "Empresas",
    subtitle: "Administrar empresas",
    icon: "business",
    href: "/companies",
    category: "Navegación",
  },
  {
    id: "4",
    title: "Pipeline",
    subtitle: "Ver oportunidades de venta",
    icon: "handshake",
    href: "/deals",
    category: "Navegación",
  },
  {
    id: "5",
    title: "Tickets",
    subtitle: "Sistema de soporte",
    icon: "support",
    href: "/tickets",
    category: "Navegación",
  },
  {
    id: "6",
    title: "Actividades",
    subtitle: "Tareas y seguimiento",
    icon: "event",
    href: "/activities",
    category: "Navegación",
  },
  {
    id: "7",
    title: "Configuración",
    subtitle: "Ajustes del sistema",
    icon: "settings",
    href: "/settings",
    category: "Sistema",
  },
];

function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const icons: Record<string, JSX.Element> = {
    dashboard: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    people: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    business: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 21h18" />
        <path d="M5 21V7l8-4v18" />
        <path d="M19 21V11l-6-4" />
      </svg>
    ),
    handshake: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="m11 17 2 2a1 1 0 1 0 3-3" />
        <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3" />
      </svg>
    ),
    support: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0" />
        <circle cx="12" cy="17" r="5" />
      </svg>
    ),
    event: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M16 2v4" />
        <path d="M8 2v4" />
        <path d="M3 10h18" />
      </svg>
    ),
    settings: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    search: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  };
  return icons[name] || null;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(query.toLowerCase()) ||
      cmd.subtitle?.toLowerCase().includes(query.toLowerCase()),
  );

  const groupedCommands = filteredCommands.reduce(
    (acc, cmd) => {
      if (!acc[cmd.category]) acc[cmd.category] = [];
      acc[cmd.category].push(cmd);
      return acc;
    },
    {} as Record<string, CommandItem[]>,
  );

  const flatCommands = Object.values(groupedCommands).flat();

  const handleSelect = useCallback(
    (href: string) => {
      router.push(href);
      onClose();
      setQuery("");
    },
    [router, onClose],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, flatCommands.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && flatCommands[selectedIndex]) {
        handleSelect(flatCommands[selectedIndex].href);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      inputRef.current?.focus();
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, flatCommands, selectedIndex, handleSelect]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="command-palette-overlay" onClick={onClose}>
      <div className="command-palette" onClick={(e) => e.stopPropagation()}>
        <div className="command-input-wrapper">
          <Icon name="search" />
          <input
            ref={inputRef}
            type="text"
            className="command-input"
            placeholder="Buscar módulos, contactos, empresas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="command-shortcut">ESC</span>
        </div>

        <div className="command-results">
          {flatCommands.length === 0 ? (
            <div
              style={{
                padding: "24px",
                textAlign: "center",
                color: "var(--text-muted)",
              }}
            >
              No se encontraron resultados
            </div>
          ) : (
            Object.entries(groupedCommands).map(([category, items]) => (
              <div key={category}>
                <div className="command-group-title">{category}</div>
                {items.map((cmd) => {
                  const globalIndex = flatCommands.findIndex(
                    (c) => c.id === cmd.id,
                  );
                  return (
                    <div
                      key={cmd.id}
                      className={`command-item ${globalIndex === selectedIndex ? "selected" : ""}`}
                      onClick={() => handleSelect(cmd.href)}
                      onMouseEnter={() => setSelectedIndex(globalIndex)}
                    >
                      <div className="command-item-icon">
                        <Icon name={cmd.icon} />
                      </div>
                      <div className="command-item-content">
                        <div className="command-item-title">{cmd.title}</div>
                        {cmd.subtitle && (
                          <div className="command-item-subtitle">
                            {cmd.subtitle}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return { isOpen, setIsOpen };
}
