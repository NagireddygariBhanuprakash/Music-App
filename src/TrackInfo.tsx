import React from "react";
import { usePlaylist } from "./PlayListContent";
import { Song } from "./lib/types";

interface TrackInfoProps {
	song: Song;
}

const TrackInfo: React.FC<TrackInfoProps> = ({ song }) => {
	const { currentSong } = usePlaylist();

	if (!currentSong) {
		return (
			<div className="flex items-center p-4 bg-gray-50 rounded-lg">
				<p className="text-gray-500">No song is currently playing</p>
			</div>
		);
	}

	return (
		<div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
			{currentSong.coverArt ? (
				<img
					src={currentSong.coverArt}
					alt={`${currentSong.title} album art`}
					className="w-24 h-24 rounded-lg object-cover"
					onError={(e) => {
						(e.target as HTMLImageElement).src =
							"https://via.placeholder.com/96";
					}}
				/>
			) : (
				<div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
					<p className="text-gray-500">No Cover</p>
				</div>
			)}
			<div>
				<h2 className="text-xl font-semibold line-clamp-1">
					{currentSong.title}
				</h2>
				<p className="text-gray-500 line-clamp-1">{currentSong.artist}</p>
				{currentSong.genre && (
					<p className="text-sm text-gray-400 mt-1">{currentSong.genre}</p>
				)}
			</div>
		</div>
	);
};
export default TrackInfo;
