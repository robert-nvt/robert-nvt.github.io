import { useEffect, useRef, useState } from "react";
import { Briefcase, Calendar } from "lucide-react";
import { DetailModal, type ModalItem } from "@/components/DetailModal";
import { experiences } from "@/data/resume";

const experienceModalItems: ModalItem[] = experiences.map((exp) => ({
  title: exp.company,
  subtitle: exp.title,
  period: exp.period,
  bulletsTitle: "Responsibilities & Achievements",
  bullets: exp.achievements,
  groupsTitle: "Technical Stack",
  groups: exp.techStack,
  links: exp.links,
}));

export const Experience = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const observers = experiences.map((_, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])]);
          }
        },
        { threshold: 0.3 }
      );

      if (itemRefs.current[index]) {
        observer.observe(itemRefs.current[index]!);
      }

      return observer;
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <section id="experience" className="py-20 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            <span className="gradient-text text-glow">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            My professional journey and achievements
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`relative transition-all duration-700 ${
                  visibleItems.includes(index)
                    ? "opacity-100 translate-x-0"
                    : `opacity-0 ${index % 2 === 0 ? "-translate-x-10" : "translate-x-10"}`
                }`}
              >
                <div
                  className={`flex flex-col md:flex-row gap-8 items-center ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content (condensed, click to open full popup) */}
                  <div className={`flex-1 w-full ${index % 2 === 0 ? "md:text-right" : ""}`}>
                    <div
                      onClick={() => setOpenIndex(index)}
                      className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-xl border border-primary/30 card-glow cursor-pointer transition-all duration-300 hover:border-primary/60 hover:-translate-y-1"
                    >
                      <div
                        className={`flex items-center gap-3 mb-3 ${
                          index % 2 === 0 ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        <Briefcase className="w-5 h-5 text-primary shrink-0" />
                        <h3 className="text-xl md:text-2xl font-bold text-foreground">
                          {exp.company}
                        </h3>
                      </div>

                      <div
                        className={`flex items-center gap-2 mb-3 text-primary font-medium ${
                          index % 2 === 0 ? "md:justify-end" : ""
                        }`}
                      >
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>

                      <p className="text-base font-semibold text-muted-foreground mb-3">
                        {exp.title}
                      </p>

                      {/* Short preview: first achievement */}
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                        {exp.achievements[0]}
                      </p>

                      {/* Tech labels preview */}
                      {exp.techStack.length > 0 && (
                        <div
                          className={`flex flex-wrap gap-2 mb-4 ${
                            index % 2 === 0 ? "md:justify-end" : ""
                          }`}
                        >
                          {exp.techStack.slice(0, 4).map((tech, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-0.5 text-xs rounded-full bg-primary/10 text-primary border border-primary/30"
                            >
                              {tech.label}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="text-sm text-primary font-medium">
                        Click to view details →
                      </p>
                    </div>
                  </div>

                  {/* Timeline Node */}
                  <div className="relative z-10">
                    <div className="w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50 animate-pulse-glow ring-4 ring-background" />
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden md:block" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DetailModal
        items={experienceModalItems}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  );
};
