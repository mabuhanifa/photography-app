import { AppleCardsCarouselDemo } from "@/components/Apple";
import { CarouselDemo } from "@/components/CarouselDemo";
import { DotBackgroundDemo } from "@/components/DotBackground";
import { Navbar } from "@/components/Navbar";
import UploadPage from "@/components/Uploader";

export default function Home() {
  return (
    <>
      <Navbar />
      <UploadPage />
      <AppleCardsCarouselDemo />
      <AppleCardsCarouselDemo />
      <CarouselDemo />
      <DotBackgroundDemo />
    </>
  );
}
