import { useEffect, useState } from 'react'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <a href="#intro" className="brand">A.W Designers</a>
        <nav className="nav">
          <a href="#intro">Intro</a>
          <a href="#expertise">What I Do</a>
          <a href="#about">Who I Am</a>
          <a href="#work">My Work</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}