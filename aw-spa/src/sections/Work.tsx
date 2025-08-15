import { useState } from "react";
import { Carousel, type MediaItem } from "../components/Carousel";

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

  return (
    <section id="work" className="section section--primary">
      <div className="container">
        <h2 className="prose h2">Our Creation</h2>


        <div className="tabs">
          <button
            className={`tab ${active === "architectural" ? "tab--active" : ""}`}
            onClick={() => setActive("architectural")}
          >
            ARCHITECTURAL PROJECT
          </button>
          <button
            className={`tab ${active === "visualization" ? "tab--active" : ""}`}
            onClick={() => setActive("visualization")}
          >
            3D VISUALIZATION PROJECT
          </button>
        </div>
        <div className="work-group">
          <h3>Interior</h3>
          <Carousel items={data.interior} />
        </div>

        <div className="work-group">
          <h3>Exterior</h3>
          <Carousel items={data.exterior} />
        </div>
      </div>
     
    </section>
  );
};
