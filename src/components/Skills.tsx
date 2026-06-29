import { useEffect, useRef, useState } from "react";
import { skillCategories } from "@/data/resume";


export const Skills = () => {
  const [visibleCategories, setVisibleCategories] = useState<number[]>([]);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = skillCategories.map((_, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCategories(prev => [...new Set([...prev, index])]);
          }
        },
        { threshold: 0.2 }
      );

      if (categoryRefs.current[index]) {
        observer.observe(categoryRefs.current[index]!);
      }

      return observer;
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, []);

  return (
    <section id="skills" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            <span className="gradient-text text-glow">Skills & Expertise</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Technologies and tools I work with
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              ref={el => categoryRefs.current[categoryIndex] = el}
              className={`p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-xl border border-primary/30 card-glow transition-all duration-700 ${
                visibleCategories.includes(categoryIndex)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${categoryIndex * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-xs text-primary font-semibold">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out ${
                          visibleCategories.includes(categoryIndex)
                            ? 'opacity-100'
                            : 'opacity-0'
                        }`}
                        style={{
                          width: visibleCategories.includes(categoryIndex)
                            ? `${skill.level}%`
                            : '0%',
                          transitionDelay: `${(categoryIndex * 100) + (skillIndex * 100)}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
