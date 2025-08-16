import { useState } from "react";
import { Carousel, type MediaItem } from "../components/Carousel";
import { StaggerContainer, StaggerItem } from "../components/ScrollAnimations";
import { SwipeReveal, SwipeCards, MagneticSwipe, GestureSwipe } from "../components/SwipeAnimations";

const archInterior: MediaItem[] = [
  {
    type: "image",
    src: "https://picsum.photos/id/1018/800/500",
    caption: "Living Room Sketch",
  },
  {
    type: "image",
    src: "https://picsum.photos/id/1025/800/500",
    caption: "Kitchen Design",
  },
  {
    type: "image",
    src: "https://picsum.photos/id/1039/800/500",
    caption: "Material Study",
  },
];
const archExterior: MediaItem[] = [
  {
    type: "image",
    src: "https://picsum.photos/id/1040/800/500",
    caption: "Front Elevation",
  },
  {
    type: "image",
    src: "https://picsum.photos/id/1041/800/500",
    caption: "Evening Render",
  },
  {
    type: "image",
    src: "https://picsum.photos/id/1042/800/500",
    caption: "Courtyard",
  },
];

const vizInterior: MediaItem[] = [
  {
    type: "image",
    src: "https://picsum.photos/id/1050/800/500",
    caption: "Bedroom Render",
  },
  {
    type: "image",
    src: "https://picsum.photos/id/1051/800/500",
    caption: "Study Area",
  },
  {
    type: "image",
    src: "https://picsum.photos/id/1052/800/500",
    caption: "Lobby Concept",
  },
];
const vizExterior: MediaItem[] = [
  {
    type: "image",
    src: "https://picsum.photos/id/1060/800/500",
    caption: "Villa Front",
  },
  {
    type: "image",
    src: "https://picsum.photos/id/1061/800/500",
    caption: "Evening Render",
  },
  {
    type: "image",
    src: "https://picsum.photos/id/1062/800/500",
    caption: "Courtyard Visual",
  },
];

export const Work = () => {
  const [active, setActive] = useState<"architectural" | "visualization">(
    "architectural"
  );

  const data =
    active === "architectural"
      ? { interior: archInterior, exterior: archExterior }
      : { interior: vizInterior, exterior: vizExterior };

  const createSwipeCards = (items: MediaItem[], title: string) => {
    return items.map((item, index) => ({
      id: `${title}-${index}`,
      content: (
        <div className="work-swipe-card">
          <img src={item.src} alt={item.caption} style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }} />
          <h4 style={{ marginTop: '16px', color: 'var(--text)', textAlign: 'center' }}>{item.caption}</h4>
        </div>
      ),
      background: 'var(--surface)'
    }));
  };

  return (
    <section id="work" className="section section--primary">
      <div className="container">
        <SwipeReveal direction="up" duration={1}>
          <h2 className="prose h2">Our Creation</h2>
        </SwipeReveal>

        <SwipeReveal direction="up" delay={0.2} duration={0.8}>
          <div className="tabs">
            <MagneticSwipe strength={0.1}>
              <button
                className={`tab ${active === "architectural" ? "tab--active" : ""}`}
                onClick={() => setActive("architectural")}
              >
                ARCHITECTURAL PROJECT
              </button>
            </MagneticSwipe>
            <MagneticSwipe strength={0.1}>
              <button
                className={`tab ${active === "visualization" ? "tab--active" : ""}`}
                onClick={() => setActive("visualization")}
              >
                3D VISUALIZATION PROJECT
              </button>
            </MagneticSwipe>
          </div>
        </SwipeReveal>
        
        <SwipeReveal direction="up" delay={0.4} duration={1.2}>
          <div className="work-swipe-section">
            <h3 style={{ color: 'var(--text)', marginBottom: '20px' }}>Interior Projects</h3>
            <SwipeCards 
              items={createSwipeCards(data.interior, 'interior')} 
              className="work-swipe-container"
            />
          </div>
        </SwipeReveal>
        
        <SwipeReveal direction="up" delay={0.6} duration={1.2}>
          <div className="work-swipe-section" style={{ marginTop: '48px' }}>
            <h3 style={{ color: 'var(--text)', marginBottom: '20px' }}>Exterior Projects</h3>
            <SwipeCards 
              items={createSwipeCards(data.exterior, 'exterior')} 
              className="work-swipe-container"
            />
          </div>
        </SwipeReveal>
        
        {/* Fallback carousel for non-touch devices */}
        <SwipeReveal direction="up" delay={0.8} duration={1}>
          <div className="work-carousel-fallback" style={{ marginTop: '48px' }}>
            <StaggerContainer staggerDelay={0.2}>
              <StaggerItem>
                <div className="work-group">
                  <h3>Traditional Gallery View</h3>
                  <GestureSwipe 
                    onSwipeLeft={() => console.log('Swiped left on carousel')}
                    onSwipeRight={() => console.log('Swiped right on carousel')}
                  >
                    <Carousel items={data.interior} />
                  </GestureSwipe>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </SwipeReveal>
      </div>
    </section>
  );
};
