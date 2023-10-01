import { Video } from "@/models/Video";

interface YoutubeVideo {
  snippet: {title: string, thumbnails: {high: {url: string}}};
  id: {videoId: string}
}

export const getVideos = async (): Promise<Video[]> => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=disney%20trailer&key=${YOUTUBE_API_KEY}`
  );
  const data = await response.json();
  return data.items.map((item: YoutubeVideo) => {
    return {
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
      id: item?.id?.videoId,
    };
  });
};
