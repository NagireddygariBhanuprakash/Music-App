import React from "react";
import { usePlaylist } from "./PlayListContent";

const PlaylistView: React.FC = () => {
	const { playlist, setCurrentSongIndex, currentSongIndex } = usePlaylist();

	if (!Array.isArray(playlist)) {
		return <div>Loading...</div>;
	}

	return (
		<div className="p-4 bg-gray-50 rounded-lg">
			<h2 className="text-xl font-semibold mb-4">Playlist</h2>
			{playlist.length === 0 ? (
				<div>No songs available</div>
			) : (
				<ul className="space-y-2 max-h-[500px] overflow-y-auto">
					{playlist.map((song, index) => (
						<li
							key={song.id}
							onClick={() => setCurrentSongIndex(index)}
							className={`flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer ${
								currentSongIndex === index ? "bg-gray-100" : ""
							}`}
						>
							<img
								src={song.coverArt}
								alt={`${song.title} cover`}
								className="w-12 h-12 rounded"
								onError={(e) => {
									(e.target as HTMLImageElement).src =
										"https://via.placeholder.com/48";
								}}
								loading="lazy"
							/>
							<div>
								<div className="font-medium">{song.title}</div>
								<div className="text-sm text-gray-500">{song.artist}</div>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
export default PlaylistView;
