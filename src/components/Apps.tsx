import { Apple, ExternalLink, Tag } from "lucide-react";
import { apps, appStore } from "@/data/resume";

export const Apps = () => {
  return (
    <section id="apps" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="text-center md:text-left">
            <h2 className="text-5xl font-bold mb-4">
              <span className="gradient-text text-glow">{appStore.heading}</span>
            </h2>
            <p className="text-muted-foreground text-lg">{appStore.subheading}</p>
          </div>

          <a
            href={appStore.developerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-center md:self-auto px-5 py-2.5 rounded-full bg-primary/10 border border-primary/40 text-primary font-medium hover:bg-primary/20 hover:border-primary transition-colors"
          >
            <Apple className="w-4 h-4" />
            View on the App Store
          </a>
        </div>

        {/* App cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app, index) => (
            <a
              key={index}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group h-full flex flex-col rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-xl border border-primary/30 overflow-hidden p-6 transition-all duration-500 hover:border-primary/60 hover:card-glow hover:-translate-y-1"
            >
              {/* Icon + meta */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/30 text-primary">
                  <Apple className="w-7 h-7" />
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="px-3 py-1 text-xs rounded-full bg-background/70 backdrop-blur-md border border-primary/30 text-primary font-medium">
                    {app.platform}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {app.category} · {app.price}
                  </span>
                </div>
              </div>

              {/* Name + tagline */}
              <h3 className="text-xl font-bold mb-1 text-foreground group-hover:text-primary transition-colors">
                {app.name}
              </h3>
              <p className="text-sm text-primary/80 font-medium mb-3 italic">
                {app.tagline}
              </p>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1">
                {app.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {app.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/30"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary transition-colors mt-auto">
                <ExternalLink className="w-3.5 h-3.5" />
                Download on the App Store
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
