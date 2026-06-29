import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg";
import { profile } from "@/data/resume";

export const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = profile.cvFile;
    link.download = profile.cvDownloadName;
    link.click();
  };

  const handleMail = () => {
    window.location.href = `mailto:${profile.email}`;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Parallax Layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
            transition: "transform 0.3s ease-out"
          }}
        />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow"
          style={{
            transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)`,
            transition: "transform 0.3s ease-out"
          }}
        />
      </div>

      {/* Hero Content */}
      <div className={`relative z-10 max-w-6xl mx-auto px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 animate-slide-in-left">
            <div className="space-y-2">
              <p className="text-primary text-lg font-medium">{profile.greeting}</p>
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="gradient-text text-glow-intense">{profile.name}</span>
              </h1>
              <h2 className="text-3xl md:text-4xl font-semibold text-muted-foreground">
                {profile.title}
              </h2>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {profile.tagline}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/50 hover:shadow-primary/80 transition-all"
                onClick={() => { handleDownload() }}
              >
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 hover:bg-primary/10 hover:border-primary"
                onClick={()=>handleMail()}
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all hover:scale-110"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all hover:scale-110"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all hover:scale-110"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* 3D Tilt Card with Profile */}
          <div
            className="relative animate-slide-in-right"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="relative p-8 rounded-3xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-xl border border-primary/30 card-glow transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x * 0.5}deg) rotateX(${mousePosition.y * -0.5}deg)`,
              }}
            >
              <div className="relative">
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  className="w-full rounded-2xl shadow-2xl"
                />
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl animate-float shadow-lg shadow-primary/50" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-secondary to-accent rounded-2xl animate-float shadow-lg shadow-secondary/50"
                  style={{ animationDelay: "1s" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center p-2">
            <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};
