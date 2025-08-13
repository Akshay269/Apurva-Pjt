import './styles.css'
import { Navbar } from './components/Navbar'
import { Intro } from './sections/Intro'
import { About } from './sections/About'
import { Expertise } from './sections/Expertise'
import { Work } from './sections/Work'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main>
        <Intro />
        <About />
        <Expertise />
        <Work />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
