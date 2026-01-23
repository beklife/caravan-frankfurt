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

    console.log('MusicContext: isMobile on mount:', isMobile);
    const targetVolume = isMobile ? 0 : 0.005; // Temporarily setting mobile to 0 for debugging
    audio.volume = targetVolume;
    console.log('MusicContext: Initial volume set to:', audio.volume);

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setMusicPlaying(true);
          console.log('MusicContext: Play promise resolved, current volume:', audio.volume);
        })
        .catch((error) => {
          setMusicPlaying(false);
          console.error('MusicContext: Autoplay blocked/failed:', error);
          console.log('MusicContext: Current volume after blocked play:', audio.volume);

          const startOnInteraction = () => {
            audio.play()
              .then(() => {
                setMusicPlaying(true);
                console.log('MusicContext: Interaction play resolved, current volume:', audio.volume);
              })
              .catch((error) => {
                console.error('MusicContext: Interaction play failed:', error);
              });
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
      console.log('MusicContext: isMobile changed or audioRef updated:', isMobile);
      const targetVolume = isMobile ? 0 : 0.005; // Temporarily setting mobile to 0 for debugging
      audioRef.current.volume = targetVolume;
      console.log('MusicContext: Volume updated to:', audioRef.current.volume);
    }
  }, [isMobile, audioRef.current]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause();
        setMusicPlaying(false);
        console.log('MusicContext: Music paused, current volume:', audioRef.current.volume);
      } else {
        audioRef.current.play()
          .then(() => {
            setMusicPlaying(true);
            console.log('MusicContext: Music played via toggle, current volume:', audioRef.current.volume);
          })
          .catch((error) => {
            console.error('MusicContext: Toggle play failed:', error);
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
