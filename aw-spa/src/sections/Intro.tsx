export const Intro = () => {
  return (
    <section id="intro" className="section section--hero">
      <div className="hero__media">
        <video className="hero__video" autoPlay muted loop playsInline poster="/hero-poster.jpg">
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero__overlay" />
      <div className="container hero__content">
        <h1 className="hero__title">Design that resonates</h1>
        <p className="hero__subtitle">Architecture, interiors and photoreal 3D visualization</p>
        <a href="#work" className="btn btn--primary">See Work</a>
      </div>
    </section>
  )
}