import videoData from "../data/videos.json";
import { Video } from "@/models/Video";

// process.env.YOUTUBE_API_KEY in .env.local

export const getVideos = (): Promise<Video[]> => {
  return new Promise<Video[]>((resolve, reject) => {
    const videos = videoData.items.map((item) => {
      return {
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
        id: item?.id?.videoId,
      };
    });
    resolve(videos);
  });
};
