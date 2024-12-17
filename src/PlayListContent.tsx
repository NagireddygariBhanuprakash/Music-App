import React, { createContext, useContext, useState, useCallback } from "react";
import { Song } from "./lib/types";
import mockSongs from "./musicAPI";

interface PlaylistContextType {
	playlist: Song[];
	currentSongIndex: number;
	isPlaying: boolean;
	isShuffled: boolean;
	isRepeating: boolean;
	favoriteSongs: Song[];
	setPlaylist: (songs: Song[]) => void;
	setCurrentSongIndex: (index: number) => void;
	setIsPlaying: (playing: boolean) => void;
	setIsShuffled: (shuffled: boolean) => void;
	setIsRepeating: (repeating: boolean) => void;
	playNext: () => void;
	playPrevious: () => void;
	togglePlay: () => void;
	toggleShuffle: () => void;
	toggleRepeat: () => void;
	toggleFavorite: (song: Song) => void;
	resetPlaylist: (songs: Song[]) => void;
	currentSong: Song | undefined;
	isFavorite: (song: Song) => boolean;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(
	undefined
);

export const PlaylistProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [playlist, setPlaylist] = useState<Song[]>(mockSongs);
	const [currentSongIndex, setCurrentSongIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isShuffled, setIsShuffled] = useState(false);
	const [isRepeating, setIsRepeating] = useState(false);
	const [favoriteSongs, setFavoriteSongs] = useState<Song[]>([]);

	const currentSong = playlist[currentSongIndex];

	const getShuffledIndex = () => Math.floor(Math.random() * playlist.length);
	const getNextIndex = (index: number) =>
		index >= playlist.length - 1 ? (isRepeating ? 0 : index) : index + 1;
	const getPreviousIndex = (index: number) =>
		index <= 0 ? (isRepeating ? playlist.length - 1 : 0) : index - 1;

	const playNext = useCallback(() => {
		if (playlist.length === 0) return;
		setCurrentSongIndex(
			isShuffled ? getShuffledIndex() : getNextIndex(currentSongIndex)
		);
	}, [playlist, isShuffled, isRepeating, currentSongIndex]);

	const playPrevious = useCallback(() => {
		if (playlist.length === 0) return;
		setCurrentSongIndex(
			isShuffled ? getShuffledIndex() : getPreviousIndex(currentSongIndex)
		);
	}, [playlist, isShuffled, isRepeating, currentSongIndex]);

	const togglePlay = useCallback(() => setIsPlaying((prev) => !prev), []);
	const toggleShuffle = useCallback(() => setIsShuffled((prev) => !prev), []);
	const toggleRepeat = useCallback(() => setIsRepeating((prev) => !prev), []);

	const toggleFavorite = useCallback((song: Song) => {
		setFavoriteSongs((prev) => {
			const isFavorite = prev.some((s) => s.id === song.id);
			if (isFavorite) {
				return prev.filter((s) => s.id !== song.id);
			} else {
				return [...prev, song];
			}
		});
	}, []);

	const isFavorite = useCallback(
		(song: Song) => favoriteSongs.some((s) => s.id === song.id),
		[favoriteSongs]
	);

	const resetPlaylist = (songs: Song[]) => {
		setPlaylist(songs);
		setCurrentSongIndex(0);
		setIsPlaying(false);
	};

	return (
		<PlaylistContext.Provider
			value={{
				playlist,
				currentSongIndex,
				isPlaying,
				isShuffled,
				isRepeating,
				favoriteSongs,
				setPlaylist,
				setCurrentSongIndex,
				setIsPlaying,
				setIsShuffled,
				setIsRepeating,
				playNext,
				playPrevious,
				togglePlay,
				toggleShuffle,
				toggleRepeat,
				toggleFavorite,
				resetPlaylist,
				currentSong,
				isFavorite,
			}}
		>
			{children}
		</PlaylistContext.Provider>
	);
};

export const usePlaylist = () => {
	const context = useContext(PlaylistContext);
	if (!context) {
		throw new Error("usePlaylist must be used within a PlaylistProvider");
	}
	return context;
};
