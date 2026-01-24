import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";

interface MusicContextType {
  musicPlaying: boolean;
  toggleMusic: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioLoadedRef = useRef(false);

  const loadAudio = async () => {
    if (audioLoadedRef.current || audioRef.current) return;

    audioLoadedRef.current = true;
    const module = await import("@assets/kuigai2.mp3");
    audioRef.current = new Audio(module.default);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
  };

  useEffect(() => {
    // Don't load audio on mount - wait for user interaction
    const handleFirstInteraction = () => {
      loadAudio();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
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
        setMusicPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => {
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
