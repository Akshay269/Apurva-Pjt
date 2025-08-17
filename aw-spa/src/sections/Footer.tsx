export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>© {new Date().getFullYear()} AW Designers</div>
        <nav className="footer__links">
          <a href="#intro">Intro</a>
          <a href="#about">About</a>
          <a href="#expertise">Expertise</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </footer>
  )
}