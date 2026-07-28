import { monthlyReflections, siteMeta } from "@/data/cas-content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ClosingSection() {
  const latestCompletedReflection = monthlyReflections
    .filter((reflection) => reflection.status === "completed")
    .at(-1);

  return (
    <section className="closing" id="contact">
      <SectionLabel number="07" title="Closing reflection" meta="The work continues" dark />
      <div className="closing-grid">
        <Reveal className="closing-title">
          <h2>
            A record built
            <br />
            <span>through attention.</span>
          </h2>
        </Reveal>
        <Reveal className="closing-copy" delay={0.08}>
          <p>{siteMeta.intro}</p>
          {latestCompletedReflection && (
            <p>{latestCompletedReflection.summary}</p>
          )}
        </Reveal>
      </div>

      <div className="closing-navigation">
        <a href="#top">
          Back to top <span aria-hidden="true">↑</span>
        </a>
        <nav aria-label="Closing navigation">
          <a href="#about">Overview</a>
          <a href="#featured">Experiences</a>
          <a href="#outcomes">Outcomes</a>
          <a href="#evidence">Evidence</a>
        </nav>
      </div>

      <footer className="site-footer">
        <p>© 2027 {siteMeta.name}</p>
        <p>{siteMeta.programme}</p>
        <p>{siteMeta.location}</p>
      </footer>
    </section>
  );
}
