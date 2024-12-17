import React from "react";
import {
	Play,
	Pause,
	SkipBack,
	SkipForward,
	Volume2,
	Shuffle,
	Repeat,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface AudioControlsProps {
	onPlay: () => void;
	onPause: () => void;
	onNext: () => void;
	onPrevious: () => void;
	onVolumeChange: (value: number) => void;
	isPlaying: boolean;
	volume: number;
	isShuffling: boolean;
	toggleShuffle: () => void;
	isRepeating: boolean;
	toggleRepeat: () => void;
}

const AudioControls: React.FC<AudioControlsProps> = ({
	onPlay,
	onPause,
	onNext,
	onPrevious,
	onVolumeChange,
	isPlaying,
	volume,
	isShuffling,
	toggleShuffle,
	isRepeating,
	toggleRepeat,
}) => {
	return (
		<div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-lg">
			<div className="flex items-center gap-2">
				<Button
					variant="ghost"
					size="icon"
					onClick={toggleShuffle}
					className={`hover:bg-gray-200 ${isShuffling ? "text-blue-500" : ""}`}
				>
					<Shuffle className="h-5 w-5" />
				</Button>

				<Button variant="ghost" size="icon" onClick={onPrevious}>
					<SkipBack className="h-5 w-5" />
				</Button>

				<Button
					variant="ghost"
					size="icon"
					onClick={isPlaying ? onPause : onPlay}
					className="h-12 w-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
				>
					{isPlaying ? (
						<Pause className="h-6 w-6" />
					) : (
						<Play className="h-6 w-6" />
					)}
				</Button>

				<Button variant="ghost" size="icon" onClick={onNext}>
					<SkipForward className="h-5 w-5" />
				</Button>

				<Button
					variant="ghost"
					size="icon"
					onClick={toggleRepeat}
					className={`hover:bg-gray-200 ${isRepeating ? "text-blue-500" : ""}`}
				>
					<Repeat className="h-5 w-5" />
				</Button>
			</div>

			<div className="flex items-center gap-2 ml-auto">
				<Volume2 className="h-4 w-4 text-gray-500" />
				<Slider
					value={[volume]}
					max={1}
					step={0.1}
					onValueChange={(value) => onVolumeChange(value[0])}
					className="w-24"
				/>
			</div>
		</div>
	);
};

export default AudioControls;
