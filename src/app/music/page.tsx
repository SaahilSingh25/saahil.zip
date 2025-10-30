import BeatCard from "./BeatCard";
import beats from "../../data/beats.json";

export default function Music() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] gap-8 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-accent mb-4">Music & Beat Store</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {beats.map((beat) => (
          <BeatCard key={beat.id} beat={beat} />
        ))}
      </div>
    </section>
  );
} 