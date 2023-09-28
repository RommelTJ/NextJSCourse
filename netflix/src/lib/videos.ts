import videoData from "../data/videos.json";
import { Video } from "@/models/Video";

export const getVideos = (): Video[] => {
  return videoData.items.map((item) => {
    return {
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
      id: item?.id?.videoId,
    };
  });
};
