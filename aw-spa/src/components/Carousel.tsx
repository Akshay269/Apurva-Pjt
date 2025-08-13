import { useRef } from 'react'
import { useLightbox } from './../components/LightboxContext'

export type MediaItem = {
  type: 'image' | 'video'
  src: string
  alt?: string
  caption?: string
}

export const Carousel = ({ items }: { items: MediaItem[] }) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const { open } = useLightbox()
  const scrollBy = (delta: number) => {
    const el = trackRef.current
    if (!el) return
    el.scrollTo({ left: el.scrollLeft + delta, behavior: 'smooth' })
  }
  const handleOpen = (item: MediaItem) => () => open(item)
  return (
    <div className="carousel">
      <button className="carousel__btn" aria-label="Previous" onClick={() => scrollBy(-360)}>
        ‹
      </button>
      <div ref={trackRef} className="carousel__track">
        {items.map((item, idx) => (
          <figure
            key={idx}
            className="carousel__item"
            role="button"
            tabIndex={0}
            onClick={handleOpen(item)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                open(item)
              }
            }}
          >
            {item.type === 'image' ? (
              <img src={item.src} alt={item.alt || ''} />
            ) : (
              <video playsInline>
                <source src={item.src} />
              </video>
            )}
            {item.caption && <figcaption>{item.caption}</figcaption>}
          </figure>
        ))}
      </div>
      <button className="carousel__btn" aria-label="Next" onClick={() => scrollBy(360)}>
        ›
      </button>
    </div>
  )
}