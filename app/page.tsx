import { AppleCardsCarouselDemo } from "@/components/Apple";
import { Navbar } from "@/components/Navbar";
import UploadPage from "@/components/Uploader";

export default function Home() {
  return (
    <>
      <Navbar />
      <UploadPage />
      <AppleCardsCarouselDemo />
      <AppleCardsCarouselDemo />
    </>
  );
}
