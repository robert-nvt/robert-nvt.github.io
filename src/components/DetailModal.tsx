import { useEffect, useState } from "react";
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Image as ImageIcon,
  Info,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export type ModalItem = {
  image?: string;
  screenshots?: string[];
  title: string;
  subtitle?: string;
  period?: string;
  description?: string;
  about?: string;
  features?: string[];
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
  const shots = item?.screenshots ?? [];
  const [heroIndex, setHeroIndex] = useState(0);
  const [shotIndex, setShotIndex] = useState<number | null>(null);

  // Reset carousel & lightbox whenever the modal changes item or closes
  useEffect(() => {
    setHeroIndex(0);
    setShotIndex(null);
  }, [index]);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      // While the screenshot lightbox is open, keys control it instead of the modal
      if (shotIndex !== null) {
        if (e.key === "Escape") {
          setHeroIndex(shotIndex);
          setShotIndex(null);
        } else if (e.key === "ArrowLeft" && shotIndex > 0) setShotIndex(shotIndex - 1);
        else if (e.key === "ArrowRight" && shotIndex < shots.length - 1) setShotIndex(shotIndex + 1);
        return;
      }
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && index! > 0) onNavigate(index! - 1);
      else if (e.key === "ArrowRight" && index! < items.length - 1) onNavigate(index! + 1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, index, items.length, onClose, onNavigate, shotIndex, shots.length]);

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
        {shots.length > 0 ? (
          /* Carousel header: main shot + counter + arrows + thumbnail film strip */
          <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-t-3xl bg-background">
            <img
              src={shots[heroIndex]}
              alt={`${item.title} screenshot ${heroIndex + 1}`}
              onClick={() => setShotIndex(heroIndex)}
              className="w-full h-full object-cover object-top cursor-zoom-in"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent pointer-events-none" />

            {/* Counter + period */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="px-3.5 py-1.5 rounded-full bg-background/70 backdrop-blur-md border border-primary/30 text-foreground text-sm font-semibold flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-primary" />
                {heroIndex + 1} / {shots.length}
              </div>
              {item.period && (
                <div className="px-3.5 py-1.5 rounded-full bg-background/70 backdrop-blur-md border border-primary/30 text-primary text-sm font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {item.period}
                </div>
              )}
            </div>

            {/* Carousel arrows */}
            {shots.length > 1 && (
              <>
                <button
                  onClick={() => setHeroIndex((heroIndex - 1 + shots.length) % shots.length)}
                  aria-label="Previous screenshot"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-background/60 hover:bg-background border border-primary/30 backdrop-blur-md transition-all group/arrow"
                >
                  <ChevronLeft className="w-5 h-5 text-foreground group-hover/arrow:-translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={() => setHeroIndex((heroIndex + 1) % shots.length)}
                  aria-label="Next screenshot"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-background/60 hover:bg-background border border-primary/30 backdrop-blur-md transition-all group/arrow"
                >
                  <ChevronRight className="w-5 h-5 text-foreground group-hover/arrow:translate-x-0.5 transition-transform" />
                </button>
              </>
            )}

            {/* Thumbnail film strip */}
            {shots.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 px-3 py-2 rounded-2xl bg-background/70 backdrop-blur-md border border-primary/20 max-w-[85%] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {shots.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setHeroIndex(i)}
                    aria-label={`Screenshot ${i + 1}`}
                    className={`shrink-0 w-20 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      i === heroIndex
                        ? "border-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]"
                        : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img src={src} alt="" loading="lazy" className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : item.image ? (
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

          {/* About This Project */}
          {item.about && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                About This Project
              </h3>
              <p className="text-muted-foreground leading-relaxed">{item.about}</p>
            </div>
          )}

          {/* Key Features */}
          {item.features && item.features.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Key Features
              </h3>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {item.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-primary mt-0.5 font-bold shrink-0">✓</span>
                    <span className="text-muted-foreground text-sm leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
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

      {/* Fullscreen screenshot lightbox */}
      {shotIndex !== null && shots.length > 0 && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setHeroIndex(shotIndex);
            setShotIndex(null);
          }}
          className="fixed inset-0 z-[80] bg-black/95 backdrop-blur-md flex flex-col animate-in fade-in duration-200"
        >
          {/* Counter */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-card/70 border border-primary/30 backdrop-blur-md text-foreground text-sm font-semibold">
            <ImageIcon className="w-4 h-4 text-primary" />
            {shotIndex + 1} / {shots.length}
          </div>

          {/* Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setHeroIndex(shotIndex);
              setShotIndex(null);
            }}
            aria-label="Close screenshots"
            className="absolute top-4 right-4 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-card/70 hover:bg-card border border-primary/30 backdrop-blur-md transition-all group"
          >
            <X className="w-5 h-5 text-foreground group-hover:rotate-90 transition-transform duration-200" />
          </button>

          {/* Prev / Next screenshot */}
          {shots.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (shotIndex > 0) setShotIndex(shotIndex - 1);
                }}
                disabled={shotIndex === 0}
                aria-label="Previous screenshot"
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-card/70 hover:bg-card border border-primary/30 backdrop-blur-md transition-all disabled:opacity-30 disabled:cursor-default group"
              >
                <ChevronLeft className="w-7 h-7 text-foreground group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (shotIndex < shots.length - 1) setShotIndex(shotIndex + 1);
                }}
                disabled={shotIndex === shots.length - 1}
                aria-label="Next screenshot"
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-card/70 hover:bg-card border border-primary/30 backdrop-blur-md transition-all disabled:opacity-30 disabled:cursor-default group"
              >
                <ChevronRight className="w-7 h-7 text-foreground group-hover:translate-x-0.5 transition-transform" />
              </button>
            </>
          )}

          {/* Main image */}
          <div className="flex-1 flex items-center justify-center px-14 md:px-20 pt-16 pb-4 min-h-0">
            <img
              src={shots[shotIndex]}
              alt={`${item.title} screenshot ${shotIndex + 1}`}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-full object-contain rounded-xl border border-primary/20 shadow-2xl"
            />
          </div>

          {/* Thumbnail strip */}
          {shots.length > 1 && (
            <div className="pb-6 pt-2 flex justify-center">
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex gap-3 px-4 py-3 rounded-2xl bg-card/60 border border-primary/20 backdrop-blur-md overflow-x-auto max-w-[90vw]"
              >
                {shots.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setShotIndex(i)}
                    aria-label={`Screenshot ${i + 1}`}
                    className={`shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      i === shotIndex
                        ? "border-primary shadow-[0_0_12px_hsl(var(--primary)/0.5)]"
                        : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img src={src} alt="" loading="lazy" className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
