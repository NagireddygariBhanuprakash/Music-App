import React from "react";
import { usePlaylist } from "./PlayListContent";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Song } from "./lib/types";

const FavoriteSection: React.FC = () => {
	const {
		favoriteSongs,
		setCurrentSongIndex,
		playlist,
		toggleFavorite,
		setIsPlaying,
	} = usePlaylist();

	const handlePlayFavorite = (song: Song) => {
		const songIndex = playlist.findIndex((s) => s.id === song.id);
		if (songIndex !== -1) {
			setCurrentSongIndex(songIndex);
			setIsPlaying(true);
		}
	};

	return (
		<div className="space-y-4 bg-blue-50 p-4 rounded-lg">
			<h2 className="text-xl font-semibold">Favorites</h2>
			{favoriteSongs.length === 0 ? (
				<p className="text-gray-500 text-center py-4">No favorites yet</p>
			) : (
				<div className="space-y-2 max-h-[500px] overflow-y-auto">
					{favoriteSongs.map((song) => (
						<div
							key={song.id}
							className="flex flex-col sm:flex-row items-center sm:space-x-4 p-4 bg-gray-50 bg-secondary/20 rounded-lg hover:bg-secondary/30 transition-colors"
						>
							<div
								className="flex cursor-pointer flex-row gap-4 items-center sm:flex-grow sm:w-auto"
								onClick={() => handlePlayFavorite(song)}
							>
								<img
									src={song.coverArt}
									alt={`${song.title} cover`}
									className="w-16 h-16 rounded-lg mr-4"
									onError={(e) => {
										(e.target as HTMLImageElement).src =
											"https://via.placeholder.com/48";
									}}
								/>
								<div className="flex flex-col justify-center">
									<p className="font-medium text-sm sm:text-base">
										{song.title}
									</p>
									<p className="text-sm text-gray-600">{song.artist}</p>
								</div>
							</div>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => toggleFavorite(song)}
								className="text-red-500 mt-4 sm:mt-0"
							>
								<Heart className="h-5 w-5 fill-current" />
							</Button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default FavoriteSection;
