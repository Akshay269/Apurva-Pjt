export const Contact = () => {
  return (
    <section id="contact" className="section section--light">
      <div className="container grid grid--2">
        <div className="contact-form-1">
          <h2>Contact Us</h2>
          <p className="subtitle">Ready to bring your vision to life? Let's start the conversation.</p>

          <div className="contact-list">
            <div>📧 info@awdesigners.com</div>
            <div>📱 +91 XXXXX XXXXX</div>
            <div>📍 India</div>
          </div>

          <div className="help-box">
            <h4>What We Can Help With</h4>
            <ul>
              <li>Architectural Design & Planning</li>
              <li>3D Visualization & Rendering</li>
              <li>Interior Design & Renovation</li>
              <li>Turnkey Project Execution</li>
              <li>Design Consultation</li>
            </ul>
          </div>
        </div>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid--2" >
            <input required placeholder="Full Name *" />
            <input type="email" required placeholder="Email Address *" />
          </div>
          <div className="grid grid--2">
            <input placeholder="Phone Number" />
            <select defaultValue="">
              <option value="" disabled>
                Select project type
              </option>
              <option>Architecture</option>
              <option>Interior Design</option>
              <option>3D Visualization</option>
            </select>
          </div>
          <textarea placeholder="Tell us about your project..." rows={6} />
          <button className="btn btn--dark" type="submit">Send Message</button>
          <div className="disclaimer">* Required fields. We'll respond within 24 hours.</div>
        </form>
      </div>
    </section>
  )
}