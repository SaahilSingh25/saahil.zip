import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] gap-8 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-accent">Hey, I'm Saahil</h1>
      <p className="max-w-xl text-lg sm:text-xl text-accent/90">
        I'm a music producer, developer at AWS, and creator. I build beats, samples, drum kits, and digital products, and I also craft code and projects on the side. Explore my work in music and coding—or check back soon for more creative dimensions!
      </p>
      <div className="flex gap-6 mt-4">
        <Link href="/music" className="bg-accent text-primary px-6 py-2 rounded-full font-semibold shadow hover:bg-accent/80 transition-colors">Music</Link>
        <Link href="/coding" className="border border-accent text-accent px-6 py-2 rounded-full font-semibold hover:bg-accent hover:text-primary transition-colors">Coding</Link>
      </div>
    </section>
  );
}
