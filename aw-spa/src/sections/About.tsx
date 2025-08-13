export const About = () => {
  return (
    <section id="about" className="section section--light">
      <div className="container grid grid--2">
        <div className="prose">
          <h2>Who I Am</h2>
          <p>
            I'm Ar. Apurva Wasule, founder of AW Designers — a studio built on a single vision: turning ideas into impactful
            spaces and visuals. With 3+ years of experience and over 50 completed projects in 3D visualization and façade
            designing, I combine architectural precision with visual storytelling to shape spaces that resonate.
          </p>
          <p>
            At AW Designers, we craft thoughtful, functional designs that respond to context and client aspirations. Under this
            umbrella, AW Renders brings those designs to life through high‑end 3D visualization — translating concepts into
            compelling, photorealistic experiences.
          </p>
          <p>
            Together, both reflect my belief that good design isn't just seen — it's felt.
          </p>
        </div>
        <div className="media-card placeholder-art" aria-hidden>
          {/* Add an illustration or project photo in /public to replace this placeholder */}
        </div>
      </div>
    </section>
  )
}