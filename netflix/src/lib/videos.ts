import { Video } from "@/models/Video";

interface YoutubeVideo {
  snippet: {
    title: string;
    description: string;
    localized?: { title: string; description: string; },
    thumbnails: {high: {url: string}},
    publishedAt: string;
    channelTitle: string;
  };
  id: string | { videoId: string };
  statistics?: { viewCount: number; }
}

export const getCommonVideos = async (url: string, revalidate?: { revalidate: number }): Promise<Video[]> => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  try {
    const BASE_URL = "youtube.googleapis.com/youtube/v3";
    const response = await fetch(
      `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`,
      { next: revalidate || undefined}
    );
    const data = await response.json();
    if (data?.error) {
      console.error("Youtube API error", data.error);
      return [];
    }
    return data.items.map((item: YoutubeVideo) => {
      const id = typeof item.id == "string" ? item.id : item.id.videoId;
      return {
        title: item.snippet.localized?.title || item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
        id,
        description: item.snippet.localized?.description || item.snippet.description,
        publishTime: item.snippet.publishedAt,
        channelTitle: item.snippet.channelTitle,
        statistics: item.statistics ? item.statistics : { viewCount: 0 },
      };
    });
  } catch (e) {
    console.error("Something went wrong with video library", e);
    return [];
  }
}

export const getVideos = async (searchQuery: string): Promise<Video[]> => {
  const URL = `search?part=snippet&q=${searchQuery}&type=video`;
  return getCommonVideos(URL);
};

export const getPopularVideos = (): Promise<Video[]> => {
  const URL =
    "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US";
  return getCommonVideos(URL);
};

export const getYoutubeVideoById = (videoId: string): Promise<Video[]> => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
  console.log("Here with videoId: ", videoId);
  return getCommonVideos(URL, { revalidate: 10 });
};
