// musicApi.ts
export interface Song {
	id: string;
	title: string;
	artist: string;
	url: string;
	duration: number;
	coverArt: string;
	genre?: string;
}

// Mock data with randomly selected image sources
export const mockSongs: Song[] = [
	{
		id: "1",
		title: "Dreams",
		artist: "Joakim Karud",
		url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
		duration: 224,
		coverArt: "https://placekitten.com/300/300", // Random image
		genre: "Electronic",
	},
	{
		id: "2",
		title: "Spirit of Fire",
		artist: "Kevin MacLeod",
		url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
		duration: 187,
		coverArt: "https://placeimg.com/300/300/nature", // Random nature image
		genre: "Cinematic",
	},
	{
		id: "3",
		title: "Summer Nights",
		artist: "Benjamin Tissot",
		url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
		duration: 198,
		coverArt: "https://picsum.photos/300/300?random=1", // Random photo
		genre: "Pop",
	},
	{
		id: "4",
		title: "Acoustic Breeze",
		artist: "Alex Wilson",
		url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
		duration: 245,
		coverArt: "https://placekitten.com/300/300", // Random image
		genre: "Acoustic",
	},
	{
		id: "5",
		title: "Jazz in Paris",
		artist: "Media Right Productions",
		url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
		duration: 176,
		coverArt: "https://placeimg.com/300/300/tech", // Random tech image
		genre: "Jazz",
	},
	{
		id: "6",
		title: "Electric Vibes",
		artist: "DJ MixMaster",
		url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
		duration: 210,
		coverArt: "https://picsum.photos/300/300?random=2", // Random photo
		genre: "Electronic",
	},
	{
		id: "7",
		title: "Urban Dreams",
		artist: "The City Beats",
		url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
		duration: 230,
		coverArt: "https://placeimg.com/300/300/architecture", // Random architecture image
		genre: "Hip Hop",
	},
	{
		id: "8",
		title: "Ocean Breeze",
		artist: "Tropical Vibes",
		url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
		duration: 205,
		coverArt: "https://placekitten.com/300/300", // Random image
		genre: "Reggae",
	},
	{
		id: "9",
		title: "Lullaby",
		artist: "Nightfall Orchestra",
		url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
		duration: 255,
		coverArt: "https://placeimg.com/300/300/animals", // Random animals image
		genre: "Classical",
	},
	{
		id: "10",
		title: "Midnight Drive",
		artist: "Liam Wilder",
		url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
		duration: 180,
		coverArt: "https://picsum.photos/300/300?random=3", // Random photo
		genre: "Rock",
	},
	{
		id: "11",
		title: "Island Breeze",
		artist: "Caribbean Soul",
		url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
		duration: 210,
		coverArt: "https://placekitten.com/300/300", // Random image
		genre: "Reggae",
	},
	{
		id: "12",
		title: "Sunset Boulevard",
		artist: "The L.A. Crew",
		url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
		duration: 220,
		coverArt: "https://placeimg.com/300/300/nature", // Random nature image
		genre: "Indie Rock",
	},
];

export const musicApi = {
	// Get all songs
	getAllSongs: async (): Promise<Song[]> => {
		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 500));
		return mockSongs;
	},

	// Get song by ID
	getSongById: async (id: string): Promise<Song | undefined> => {
		await new Promise((resolve) => setTimeout(resolve, 300));
		return mockSongs.find((song) => song.id === id);
	},

	// Search songs
	searchSongs: async (query: string): Promise<Song[]> => {
		await new Promise((resolve) => setTimeout(resolve, 400));
		const lowercaseQuery = query.toLowerCase();
		return mockSongs.filter(
			(song) =>
				song.title.toLowerCase().includes(lowercaseQuery) ||
				song.artist.toLowerCase().includes(lowercaseQuery) ||
				(song.genre && song.genre.toLowerCase().includes(lowercaseQuery))
		);
	},

	// Get songs by genre
	getSongsByGenre: async (genre: string): Promise<Song[]> => {
		await new Promise((resolve) => setTimeout(resolve, 400));
		return mockSongs.filter(
			(song) => song.genre && song.genre.toLowerCase() === genre.toLowerCase()
		);
	},
};

export default mockSongs;
