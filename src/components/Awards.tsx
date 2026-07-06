import { useEffect, useRef, useState } from "react";
import { Award as AwardIcon, ExternalLink, ImageIcon, Sparkles, X } from "lucide-react";
import { awards, otherSkills } from "@/data/resume";

export const Awards = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [certificate, setCertificate] = useState<{ title: string; image: string } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!certificate) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCertificate(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [certificate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="awards" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            <span className="gradient-text text-glow">Awards & Certifications</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Recognition and additional skills
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Awards */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                <AwardIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Awards</h3>
            </div>

            <div className="space-y-4">
              {awards.map((award, index) => (
                <div
                  key={index}
                  onClick={
                    award.image
                      ? () => setCertificate({ title: award.title, image: award.image! })
                      : undefined
                  }
                  className={`flex items-start justify-between gap-4 p-5 rounded-xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-xl border border-primary/30 card-glow hover:border-primary/60 transition-all ${
                    award.image ? "cursor-pointer" : ""
                  }`}
                >
                  <div>
                    <p className="text-foreground font-semibold">{award.title}</p>
                    {award.link && (
                      <a
                        href={award.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-1 text-sm text-muted-foreground hover:text-primary transition-colors break-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        View
                      </a>
                    )}
                    {award.image && (
                      <span className="inline-flex items-center gap-1 mt-1 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                        <ImageIcon className="w-3.5 h-3.5 shrink-0" />
                        View certificate
                      </span>
                    )}
                  </div>
                  <span className="shrink-0 text-sm text-primary font-medium whitespace-nowrap">
                    {award.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Other skills */}
          <div
            className={`transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Other Skills</h3>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-xl border border-primary/30 card-glow">
              <ul className="space-y-4">
                {otherSkills.map((skill, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <span className="text-muted-foreground">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate lightbox */}
      {certificate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/90 backdrop-blur-md"
          onClick={() => setCertificate(null)}
        >
          <div
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setCertificate(null)}
              className="absolute -top-3 -right-3 z-10 p-2 rounded-full bg-card border border-primary/40 text-foreground hover:text-primary hover:border-primary transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <img
              src={certificate.image}
              alt={certificate.title}
              className="w-full max-h-[80vh] object-contain rounded-xl border border-primary/30 bg-card"
            />
            <p className="mt-3 text-center text-sm text-muted-foreground">
              {certificate.title}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
