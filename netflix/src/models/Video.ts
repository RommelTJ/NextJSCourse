export interface Video {
  id: string;
  title?: string;
  imgUrl: string;
  description?: string;
  publishedAt?: string;
  channelTitle?: string;
  statistics?: { viewCount: number; }
}
