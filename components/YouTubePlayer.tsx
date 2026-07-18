import { View } from 'react-native';

import { WebView } from '@/components/ui/primitives/WebView';

export interface YouTubePlayerProps {
  videoId: string;
  /** height of the player; width fills the container */
  height?: number;
}

const embedHtml = (videoId: string) => `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <style>
      * { margin: 0; padding: 0; }
      html, body { background: #000; height: 100%; }
      .wrap { position: relative; width: 100%; height: 100%; }
      iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
    </style>
  </head>
  <body>
    <div class="wrap">
      <iframe
        src="https://www.youtube.com/embed/${videoId}?playsinline=1&modestbranding=1&rel=0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </body>
</html>`;

export function YouTubePlayer({ videoId, height = 220 }: YouTubePlayerProps) {
  return (
    <View className="overflow-hidden rounded-2xl bg-black" style={{ height }}>
      <WebView
        style={{ flex: 1, backgroundColor: '#000000' }}
        originWhitelist={['*']}
        source={{ html: embedHtml(videoId) }}
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction
        javaScriptEnabled
      />
    </View>
  );
}
