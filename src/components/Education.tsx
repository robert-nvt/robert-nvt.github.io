import { useEffect, useRef, useState } from "react";
import { GraduationCap, Users2 } from "lucide-react";
import { activities, education } from "@/data/resume";

export const Education = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section ref={sectionRef} id="education" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            <span className="gradient-text text-glow">Education & Activities</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Academic background and extracurricular involvement
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Education column */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Education</h3>
            </div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-xl border border-primary/30 card-glow"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="text-lg font-bold text-foreground">{edu.school}</h4>
                    <span className="shrink-0 text-xs text-primary font-medium whitespace-nowrap">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-primary/80 font-medium mb-3">{edu.degree}</p>
                  <ul className="space-y-2">
                    {edu.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span className="text-sm text-muted-foreground">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Activities column */}
          <div
            className={`transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                <Users2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Activities</h3>
            </div>

            <div className="space-y-6">
              {activities.map((act, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-xl border border-primary/30 card-glow"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="text-lg font-bold text-foreground">{act.organization}</h4>
                    <span className="shrink-0 text-xs text-primary font-medium whitespace-nowrap">
                      {act.period}
                    </span>
                  </div>
                  <p className="text-primary/80 font-medium mb-3">{act.role}</p>
                  <ul className="space-y-2">
                    {act.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
