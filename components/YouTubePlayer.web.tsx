import { View } from 'react-native';

import type { YouTubePlayerProps } from './YouTubePlayer';

export function YouTubePlayer({ videoId, height = 220 }: YouTubePlayerProps) {
  return (
    <View className="overflow-hidden rounded-2xl bg-black" style={{ height }}>
      <iframe
        title="Tutorial video"
        src={`https://www.youtube.com/embed/${videoId}?playsinline=1&modestbranding=1&rel=0`}
        style={{ width: '100%', height: '100%', border: 0 }}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        sandbox="allow-scripts allow-presentation allow-popups"
      />
    </View>
  );
}
