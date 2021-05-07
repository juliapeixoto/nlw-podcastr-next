import { createContext, useState, ReactNode } from "react";

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  setPlayingState: (state: boolean) => void;
  togglePlay: () => void;
};

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
  children: ReactNode;
};

export function PlayerContextProvider({
  children,
}: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setisPlaying] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setisPlaying(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setisPlaying(true);
  }

  function togglePlay() {
    setisPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setisPlaying(state);
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        playList,
        isPlaying,
        togglePlay,
        setPlayingState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
