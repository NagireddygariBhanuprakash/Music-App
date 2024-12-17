// types.ts
export interface Song {
	id: string;
	title: string;
	artist: string;
	url: string;
	duration: number;
	coverArt: string;
	genre?: string;
}

export interface PlaylistState {
	playlist: Song[];
	currentSongIndex: number;
	isPlaying: boolean;
	isShuffled: boolean;
	isRepeating: boolean;
	favoriteSongs: Song[];
}

export interface PlaylistAction {
	type: string;
	payload?: any;
}
