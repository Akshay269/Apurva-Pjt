import herovideo from "/assets/videos/Hero.mp4";
import { ParallaxHero } from "../components/ParallaxHero";

export const Intro = () => {
  return <ParallaxHero videoSrc={herovideo} />;
};
