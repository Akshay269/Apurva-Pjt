import './styles.css'
import { Navbar } from './components/Navbar'
import { Intro } from './sections/Intro'
import { About } from './sections/About'
import { Expertise } from './sections/Expertise'
import { Work } from './sections/Work'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import {LightboxProvider} from './components/LightboxContext'

function App() {
  return (
    <LightboxProvider>
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
    </LightboxProvider>
  )
}

export default App
