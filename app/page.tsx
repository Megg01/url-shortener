import { HyperText } from "@/components/magicui/hyper-text";
import UrlShortenerForm from "@/components/UrlShortenerForm";

export default function Home() {
  return (
    <div>
      <main className="container mx-auto px-4">
        <HyperText className="text-foreground text-center mt-4">
          URL Shortener
        </HyperText>
        <UrlShortenerForm />
      </main>
    </div>
  );
}
