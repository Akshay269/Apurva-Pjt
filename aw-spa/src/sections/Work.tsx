import { Carousel, type MediaItem } from '../components/Carousel'

const interiorItems: MediaItem[] = [
  { type: 'image', src: 'https://picsum.photos/id/1018/800/500', caption: 'Living Room Sketch' },
  { type: 'image', src: 'https://picsum.photos/id/1025/800/500', caption: 'Kitchen Design' },
  { type: 'image', src: 'https://picsum.photos/id/1039/800/500', caption: 'Material Study' },
]

const exteriorItems: MediaItem[] = [
  { type: 'image', src: 'https://picsum.photos/id/1040/800/500', caption: 'Front Elevation' },
  { type: 'image', src: 'https://picsum.photos/id/1041/800/500', caption: 'Evening Render' },
  { type: 'image', src: 'https://picsum.photos/id/1042/800/500', caption: 'Courtyard' },
]

export const Work = () => {
  return (
    <section id="work" className="section section--primary">
      <div className="container">
        <header className="section-header">
          <h2>My Work</h2>
          <p>Explore architectural and visualization projects organized by type.</p>
        </header>

        <div className="work-group">
          <h3>Interior</h3>
          <Carousel items={interiorItems} />
        </div>

        <div className="work-group">
          <h3>Exterior</h3>
          <Carousel items={exteriorItems} />
        </div>
      </div>
    </section>
  )
}