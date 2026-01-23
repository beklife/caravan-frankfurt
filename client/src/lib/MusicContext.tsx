import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import backgroundMusic from "@assets/kuigai_24zafbn24lu_991e85e2.m4a";
import { useIsMobile } from "@/hooks/use-mobile";

interface MusicContextType {
  musicPlaying: boolean;
  toggleMusic: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const audio = new Audio(backgroundMusic);
    audio.loop = true;
    audioRef.current = audio;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setMusicPlaying(true))
        .catch(() => {
          setMusicPlaying(false);
          const startOnInteraction = () => {
            audio.play()
              .then(() => setMusicPlaying(true))
              .catch(() => {});
            document.removeEventListener('click', startOnInteraction);
            document.removeEventListener('touchstart', startOnInteraction);
          };
          document.addEventListener('click', startOnInteraction);
          document.addEventListener('touchstart', startOnInteraction);
        });
    }

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMobile ? 0 : 0.005;
    }
  }, [isMobile, audioRef.current]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause();
        setMusicPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setMusicPlaying(true))
          .catch(() => {});
      }
    }
  };

  return (
    <MusicContext.Provider value={{ musicPlaying, toggleMusic }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}
