import React from "react";
import { Slider } from "@/components/ui/slider";

interface ProgressBarProps {
	currentTime: number;
	duration: number;
	onSeek: (time: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
	currentTime,
	duration,
	onSeek,
}) => {
	const formatTime = (seconds: number): string => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = Math.floor(seconds % 60);
		return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
	};

	return (
		<div className="w-full space-y-2">
			<Slider
				value={[currentTime]}
				max={duration}
				step={1}
				onValueChange={(value) => onSeek(value[0])}
				className="w-full"
			/>
			<div className="flex justify-between text-sm text-gray-500">
				<span>{formatTime(currentTime)}</span>
				<span>{formatTime(duration)}</span>
			</div>
		</div>
	);
};
export default ProgressBar;
