"use client";
import React, { useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

type License = {
  type: string;
  price: number | null;
};

type Beat = {
  id: string;
  title: string;
  cover: string;
  audio: string;
  bpm: number;
  key: string;
  tags: string[];
  price: number;
  licenses: License[];
};

export default function BeatCard({ beat }: { beat: Beat }) {
  const audioRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1);
  const tagRef = useRef<HTMLAudioElement>(null);
  const tagTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Update currentTime and duration
  const handleListen = () => {
    const audio = audioRef.current?.audio.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 1);
      if (audio.currentTime >= 55 && audio.currentTime < 60) {
        audio.volume = Math.max(0, 1 - (audio.currentTime - 55) / 5);
      } else if (audio.currentTime >= 60) {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 1;
      } else if (audio.volume !== 1) {
        audio.volume = 1;
      }
    }
  };

  // Number of full spins in 60s
  const spins = 10;
  const previewDuration = 60;
  const rotation = (Math.min(currentTime, previewDuration) / previewDuration) * 360 * spins;

  // Format time as mm:ss
  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Calculate interval for tag overlay (every 8 bars)
  const barDuration = (60 / beat.bpm) * 4;
  const tagInterval = barDuration * 8 * 1000; // in ms

  // Play the tag and schedule the next one
  const playTag = () => {
    if (tagRef.current) {
      tagRef.current.currentTime = 0;
      tagRef.current.play();
    }
    tagTimerRef.current = setTimeout(playTag, tagInterval);
  };

  // Start/stop tag overlay in sync with beat
  React.useEffect(() => {
    if (isPlaying) {
      playTag();
    } else {
      if (tagTimerRef.current) clearTimeout(tagTimerRef.current);
      if (tagRef.current) tagRef.current.pause();
    }
    return () => {
      if (tagTimerRef.current) clearTimeout(tagTimerRef.current);
    };
    // eslint-disable-next-line
  }, [isPlaying, beat.bpm]);

  // Update currentTime and duration on seek as well
  const handleSeeked = () => {
    const audio = audioRef.current?.audio.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 1);
      if (tagTimerRef.current) clearTimeout(tagTimerRef.current);
      if (isPlaying) {
        // Schedule next tag based on new position
        const timeSinceLastTag = audio.currentTime % (barDuration * 8);
        const msToNextTag = (barDuration * 8 - timeSinceLastTag) * 1000;
        tagTimerRef.current = setTimeout(playTag, msToNextTag);
      }
    }
  };

  return (
    <div className="bg-primary rounded-xl shadow p-4 flex flex-col gap-4 items-center border border-accent/30">
      {/* Rotating disc logo */}
      <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center mb-2 bg-black/80">
        <img
          src="/logo.png"
          alt="Spinning Disc"
          className="w-full h-full object-cover"
          style={{ borderRadius: "50%", transform: `rotate(${rotation}deg)`, transition: 'transform 0.3s linear' }}
        />
        <audio ref={tagRef} src="/tag.wav" preload="auto" />
      </div>
      <h2 className="text-xl font-bold text-accent">{beat.title}</h2>
      <div className="flex gap-4 text-accent/80 text-sm">
        <span>BPM: {beat.bpm}</span>
        <span>Key: {beat.key}</span>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {beat.tags.map(tag => (
          <span key={tag} className="bg-accent/20 text-accent px-2 py-1 rounded text-xs">{tag}</span>
        ))}
      </div>
      <div className="w-full flex flex-col items-center gap-2 mt-2">
        <AudioPlayer
          ref={audioRef}
          src={beat.audio}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onListen={handleListen}
          onSeeked={handleSeeked}
          listenInterval={100}
          showJumpControls={false}
          customAdditionalControls={[]}
          customVolumeControls={[]}
          style={{ background: "transparent", boxShadow: "none" }}
        />
      </div>
      <div className="flex flex-col gap-1 w-full mt-2">
        {beat.licenses.map(lic => (
          <div key={lic.type} className="flex justify-between items-center text-sm">
            <span>{lic.type}</span>
            <span>{lic.price !== null ? `$${lic.price}` : <span className="italic">Make Offer</span>}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Tailwind custom animation
// Add this to your globals.css or tailwind.config.js:
// .animate-spin-slow { animation: spin 2.5s linear infinite; } 