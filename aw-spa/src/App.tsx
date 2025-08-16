import './styles.css'
import { Navbar } from './components/Navbar'
import { Intro } from './sections/Intro'
import { About } from './sections/About'
import { Expertise } from './sections/Expertise'
import { Work } from './sections/Work'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { LightboxProvider } from './components/LightboxContext'
import { RedCubeSection } from './components/RedCubeSection'

function App() {
  return (
    <LightboxProvider>
      <div className="app-root">
        <Navbar />
        
        <main>
          <Intro />
          
          {/* Interactive Red Cube Section */}
          <RedCubeSection onRotationComplete={() => console.log('Cube rotation completed!')} />
          
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
