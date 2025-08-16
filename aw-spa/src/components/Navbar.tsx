import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Import logo properly
const LOGO_WHITE = "/assets/images/LOGO_WHITE.png";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Force intro when at the very top
      if (scrollY < 300) {
        setActiveSection('intro');
        return;
      }
      
      // Check sections in order from top to bottom
      const sections = ['intro', 'about', 'expertise', 'work', 'contact'];
      let newActiveSection = 'intro';
      
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionTop = scrollY + rect.top;
          const sectionBottom = sectionTop + rect.height;
          const viewportTop = scrollY + 100; // Account for navbar height
          
          // Section is active if viewport top is within the section
          if (viewportTop >= sectionTop && viewportTop < sectionBottom) {
            newActiveSection = sectionId;
          }
        }
      });
      
      // Debug logging (remove in production)
      // console.log('Active section:', newActiveSection, 'ScrollY:', scrollY);
      
      setActiveSection(newActiveSection);
    };

    // Set initial state immediately
    setTimeout(handleScroll, 100); // Small delay to ensure DOM is ready
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: "#intro", label: "Intro", id: "intro" },
    { href: "#about", label: "About Us", id: "about" },
    { href: "#expertise", label: "Our Expertise", id: "expertise" },
    { href: "#work", label: "Our Creation", id: "work" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];

  return (
    <motion.header 
      className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="navbar__inner">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <motion.img
            src={LOGO_WHITE}
            style={{ width: "90px", height: "auto" }}
            alt="AW Designers Logo"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
          <motion.a 
            href="#intro" 
            className="brand"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            A.W Designers
          </motion.a>
        </motion.div>
        
        <motion.nav 
          className="nav"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {navItems.map((item, index) => (
            <motion.a
              key={item.id}
              href={item.href}
              className={activeSection === item.id ? 'nav-active' : ''}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ 
                scale: 1.05,
                color: "var(--primary)"
              }}
              whileTap={{ scale: 0.95 }}
              style={{ position: 'relative' }}
            >
              {item.label}
              <AnimatePresence>
                {activeSection === item.id && (
                  <motion.div
                    className="nav-indicator"
                    layoutId="activeSection"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--primary)',
                      borderRadius: '1px'
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.a>
          ))}
        </motion.nav>
      </div>
    </motion.header>
  );
};
