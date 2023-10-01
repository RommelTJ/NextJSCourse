import { Video } from "@/models/Video";

interface YoutubeVideo {
  snippet: {title: string, thumbnails: {high: {url: string}}};
  id: string | { videoId: string };
}

export const getVideos = async (searchQuery: string): Promise<Video[]> => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  try {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=25&q=${searchQuery}&key=${YOUTUBE_API_KEY}`
    );
    const data = await response.json();
    if (data?.error) {
      console.error("Youtube API error", data.error);
      return [];
    }
    return data.items.map((item: YoutubeVideo) => {
      if (typeof item.id !== "string") {
        const id = item.id.videoId || item.id;
      }
      const id = typeof item.id == "string" ? item.id : item.id.videoId;
      return {
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
        id,
      };
    });
  } catch (e) {
    console.error("Something went wrong with video library", e);
    return [];
  }
};
