import React, { useRef, useState, useEffect } from "react";
import { usePlaylist } from "./PlayListContent";
import AudioControls from "./AudioControls";
import ProgressBar from "./ProgessBar";
import TrackInfo from "./TrackInfo";
import PlaylistView from "./PlaylistView";
import FavoriteSection from "./FavoriteSection";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Song } from "./lib/types";

const MusicPlayer: React.FC = () => {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [volume, setVolume] = useState<number>(1);

	const {
		playlist,
		currentSongIndex,
		isPlaying,
		isShuffled,
		isRepeating,
		currentSong,
		setCurrentSongIndex,
		setIsPlaying,
		playNext,
		playPrevious,
		toggleShuffle,
		toggleRepeat,
		toggleFavorite,
		isFavorite,
		favoriteSongs,
	} = usePlaylist();

	const handleVolumeChange = (newVolume: number): void => {
		setVolume(newVolume);
		if (audioRef.current) {
			audioRef.current.volume = newVolume;
		}
	};

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		if (isPlaying) {
			audio.play().catch((error) => {
				console.error("Playback failed:", error);
				setIsPlaying(false);
			});
		} else {
			audio.pause();
		}
	}, [isPlaying, currentSongIndex, setIsPlaying]);

	const handleEnded = (): void => {
		if (isRepeating && audioRef.current) {
			audioRef.current.currentTime = 0;
			audioRef.current.play().catch(console.error);
		} else if (isShuffled) {
			const nextIndex = Math.floor(Math.random() * playlist.length);
			setCurrentSongIndex(nextIndex);
		} else {
			playNext();
		}
	};

	const handleFavoriteClick = (): void => {
		if (currentSong) {
			console.log("Current song before toggle:", currentSong);
			console.log("Is favorite before toggle:", isFavorite(currentSong));
			console.log("Favorites before toggle:", favoriteSongs);

			toggleFavorite(currentSong);

			setTimeout(() => {
				console.log("Is favorite after toggle:", isFavorite(currentSong));
				console.log("Favorites after toggle:", favoriteSongs);
			}, 0);
		}
	};

	if (!currentSong) {
		return <div className="text-center p-4">No song selected</div>;
	}

	return (
		<div className="flex flex-col w-full max-w-4xl mx-auto p-4 space-y-4 bg-white rounded-lg shadow-md">
			<div className="relative">
				<audio
					ref={audioRef}
					src={currentSong.url}
					onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
					onEnded={handleEnded}
				/>

				<div className="flex items-center justify-between mb-4 flex-wrap">
					<TrackInfo song={currentSong} />
					<Button
						variant="ghost"
						size="icon"
						onClick={handleFavoriteClick}
						className={`transition-colors duration-200 ${
							isFavorite(currentSong)
								? "text-red-500"
								: "text-gray-400 hover:text-red-500"
						}`}
					>
						<Heart
							className={`h-6 w-6 ${
								isFavorite(currentSong) ? "fill-current" : ""
							}`}
						/>
					</Button>
				</div>

				<ProgressBar
					currentTime={currentTime}
					duration={audioRef.current?.duration || 0}
					onSeek={(time: number) => {
						if (audioRef.current) {
							audioRef.current.currentTime = time;
						}
					}}
				/>

				<AudioControls
					onPlay={() => setIsPlaying(true)}
					onPause={() => setIsPlaying(false)}
					onNext={playNext}
					onPrevious={playPrevious}
					isPlaying={isPlaying}
					volume={volume}
					onVolumeChange={handleVolumeChange}
					isShuffling={isShuffled}
					toggleShuffle={toggleShuffle}
					isRepeating={isRepeating}
					toggleRepeat={toggleRepeat}
				/>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<PlaylistView />
				<FavoriteSection />
			</div>
		</div>
	);
};

export default MusicPlayer;
