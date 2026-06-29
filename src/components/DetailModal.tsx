import { useEffect } from "react";
import { Briefcase, Calendar, ChevronLeft, ChevronRight, ExternalLink, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export type ModalItem = {
  image?: string;
  title: string;
  subtitle?: string;
  period?: string;
  description?: string;
  badges?: string[];
  bulletsTitle?: string;
  bullets?: string[];
  groupsTitle?: string;
  groups?: { label: string; value: string }[];
  meta?: { label: string; value: string }[];
  links?: { label: string; url: string }[];
};

type DetailModalProps = {
  items: ModalItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export const DetailModal = ({ items, index, onClose, onNavigate }: DetailModalProps) => {
  const isOpen = index !== null && index >= 0 && index < items.length;
  const item = isOpen ? items[index] : null;

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && index! > 0) onNavigate(index! - 1);
      else if (e.key === "ArrowRight" && index! < items.length - 1) onNavigate(index! + 1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, index, items.length, onClose, onNavigate]);

  if (!isOpen || !item) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      {/* Prev / Next project navigation */}
      {items.length > 1 && (
        <>
          <button
            onClick={() => index! > 0 && onNavigate(index! - 1)}
            disabled={index === 0}
            aria-label="Previous"
            className="fixed left-2 md:left-8 top-1/2 -translate-y-1/2 z-[60] w-12 h-12 flex items-center justify-center rounded-full bg-card/70 hover:bg-card border border-primary/30 backdrop-blur-md transition-all disabled:opacity-0 disabled:cursor-default group"
          >
            <ChevronLeft className="w-7 h-7 text-foreground group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={() => index! < items.length - 1 && onNavigate(index! + 1)}
            disabled={index === items.length - 1}
            aria-label="Next"
            className="fixed right-2 md:right-8 top-1/2 -translate-y-1/2 z-[60] w-12 h-12 flex items-center justify-center rounded-full bg-card/70 hover:bg-card border border-primary/30 backdrop-blur-md transition-all disabled:opacity-0 disabled:cursor-default group"
          >
            <ChevronRight className="w-7 h-7 text-foreground group-hover:translate-x-0.5 transition-transform" />
          </button>
        </>
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-br from-card to-card/90 border border-primary/30 shadow-2xl card-glow animate-in zoom-in-95 fade-in duration-200 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          title="Press ESC to close"
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-background/60 hover:bg-background border border-primary/30 backdrop-blur-md transition-all group"
        >
          <X className="w-5 h-5 text-foreground group-hover:rotate-90 transition-transform duration-200" />
        </button>

        {/* Image header */}
        {item.image ? (
          <div className="relative w-full h-56 md:h-72 overflow-hidden rounded-t-3xl bg-background">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
            {item.period && (
              <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-background/70 backdrop-blur-md border border-primary/30 text-primary text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {item.period}
              </div>
            )}
          </div>
        ) : (
          <div className="relative px-6 md:px-8 pt-12 pb-6 border-b border-primary/10 bg-gradient-to-br from-primary/10 to-transparent rounded-t-3xl">
            <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-4">
              <Briefcase className="w-7 h-7 text-primary" />
            </div>
            {item.period && (
              <div className="inline-flex items-center gap-2 text-primary font-medium text-sm">
                <Calendar className="w-4 h-4" />
                {item.period}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">{item.title}</h2>
          {item.subtitle && (
            <p className="text-primary font-medium mb-4">{item.subtitle}</p>
          )}

          {/* Meta row */}
          {item.meta && item.meta.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-6 pb-4 border-b border-primary/10">
              {item.meta.map((m, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">{m.label}:</span>
                  <span className="text-foreground font-medium">{m.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          {item.description && (
            <p className="text-muted-foreground leading-relaxed mb-6">{item.description}</p>
          )}

          {/* Bullets (achievements / highlights) */}
          {item.bullets && item.bullets.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {item.bulletsTitle ?? "Highlights"}
              </h3>
              <ul className="space-y-2.5">
                {item.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-primary mt-1 font-bold shrink-0">✓</span>
                    <span className="text-muted-foreground">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Grouped technical stack (label: value) */}
          {item.groups && item.groups.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {item.groupsTitle ?? "Technical Stack"}
              </h3>
              <div className="rounded-xl bg-background/40 border border-primary/15 p-4 space-y-1.5">
                {item.groups.map((g, i) => (
                  <div key={i} className="grid grid-cols-[auto_1fr] gap-x-3 text-sm">
                    <span className="font-semibold text-foreground whitespace-nowrap">{g.label}:</span>
                    <span className="text-muted-foreground">{g.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Badges / tech */}
          {item.badges && item.badges.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {item.badges.map((badge, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-sm rounded-full bg-primary/10 text-primary border border-primary/30"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {item.links && item.links.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-2">
              {item.links.map((link, i) => (
                <Button
                  key={i}
                  asChild
                  variant="outline"
                  className="border-primary/40 hover:bg-primary/10 hover:border-primary"
                >
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {link.label}
                  </a>
                </Button>
              ))}
            </div>
          )}

          {/* Keyboard hint */}
          {items.length > 1 && (
            <div className="mt-8 pt-6 border-t border-primary/10 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span>
                <kbd className="px-2 py-1 bg-primary/10 rounded border border-primary/20 text-foreground">ESC</kbd> Close
              </span>
              <span>
                <kbd className="px-2 py-1 bg-primary/10 rounded border border-primary/20 text-foreground">←/→</kbd> Navigate
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
