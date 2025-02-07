import UrlShortenerForm from "@/components/UrlShortenerForm";

export default function Home() {
  return (
    <div>
      <main className="container mx-auto px-4">
        <h1 className="text-4xl text-foreground font-bold text-center mt-20 mb-8">
          URL Shortener
        </h1>
        <UrlShortenerForm />
      </main>
    </div>
  );
}
