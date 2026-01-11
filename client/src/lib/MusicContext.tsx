import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import backgroundMusic from "@assets/kuigai_24zafbn24lu_991e85e2.m4a";

interface MusicContextType {
  musicPlaying: boolean;
  toggleMusic: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [musicPlaying, setMusicPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    audioRef.current = new Audio(backgroundMusic);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    // Try to autoplay
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isPlayingRef.current = true;
        })
        .catch(() => {
          // Autoplay blocked - try to play on first user interaction
          isPlayingRef.current = false;

          const startOnInteraction = () => {
            if (audioRef.current && !isPlayingRef.current) {
              audioRef.current.play()
                .then(() => {
                  isPlayingRef.current = true;
                })
                .catch(() => {
                  // Still blocked, user needs to click the music button
                });
            }
            // Remove listeners after first attempt
            document.removeEventListener('click', startOnInteraction);
            document.removeEventListener('touchstart', startOnInteraction);
          };

          document.addEventListener('click', startOnInteraction);
          document.addEventListener('touchstart', startOnInteraction);
        });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause();
        isPlayingRef.current = false;
        setMusicPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => {
            isPlayingRef.current = true;
            setMusicPlaying(true);
          })
          .catch(() => {
            // Play failed, keep button in off state
          });
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
