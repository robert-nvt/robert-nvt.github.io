import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DetailModal, type ModalItem } from "@/components/DetailModal";
import { projects } from "@/data/resume";

const projectModalItems: ModalItem[] = projects.map((p) => ({
  image: p.image,
  title: p.title,
  subtitle: p.role,
  period: p.period,
  description: p.description,
  badges: p.tags,
  meta: p.team ? [{ label: "Team Size", value: `${p.team} devs` }] : undefined,
  links: p.links,
}));

export const Projects = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollByCard = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section id="projects" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="text-center md:text-left">
            <h2 className="text-5xl font-bold mb-4">
              <span className="gradient-text text-glow">Featured Projects</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Blockchain, DeFi, NFT and AI-driven commerce products I helped build
            </p>
          </div>

          {/* Slider Controls */}
          <div className="flex justify-center md:justify-end gap-3">
            <Button
              size="icon"
              variant="outline"
              onClick={() => scrollByCard("left")}
              disabled={!canScrollLeft}
              aria-label="Previous projects"
              className="rounded-full border-primary/40 hover:bg-primary/10 hover:border-primary disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => scrollByCard("right")}
              disabled={!canScrollRight}
              aria-label="Next projects"
              className="rounded-full border-primary/40 hover:bg-primary/10 hover:border-primary disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Horizontal sliding track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 -mx-2 px-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project, index) => (
            <div
              key={index}
              data-card
              className="group snap-start shrink-0 w-[88%] sm:w-[60%] md:w-[calc((100%-3rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            >
              <div
                onClick={() => setOpenIndex(index)}
                className="h-full flex flex-col rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-xl border border-primary/30 overflow-hidden transition-all duration-500 hover:border-primary/60 hover:card-glow hover:-translate-y-1 cursor-pointer"
              >
                {/* Project Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  <div className="absolute top-3 right-3 px-3 py-1 text-xs rounded-full bg-background/70 backdrop-blur-md border border-primary/30 text-primary font-medium">
                    {project.period}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-1 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-primary/80 font-medium mb-3">
                    {project.role}
                    {project.team ? (
                      <span className="inline-flex items-center gap-1 text-muted-foreground ml-2">
                        <Users className="w-3.5 h-3.5" /> Team {project.team}
                      </span>
                    ) : null}
                  </p>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mt-auto">
                    {project.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DetailModal
        items={projectModalItems}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  );
};
