import {getYoutubeVideoById} from "@/lib/videos";
import {Video} from "@/models/Video";
import VideoModal from "@/components/VideoModal/VideoModal";


// i.e. getStaticProps
async function getVideo(videoId: string): Promise<Video|undefined> {
  const videoArray = await getYoutubeVideoById(videoId);
  return videoArray.length ? videoArray[0] : undefined;
}

// true: (default) Dynamic segments not included in generateStaticParams are generated on demand.
// false: Dynamic segments not included in generateStaticParams will return a 404.
export const dynamicParams = true;
export async function generateStaticParams() {
  return [{ videoId: 'mYfJxlgR2jw' }, { videoId: '4zH5iYM4wJo' }, { videoId: "KCPEHsAViiQ" }]
}

const Video = async ({ params }: { params: { videoId: string } }) => {
  const video = await getVideo(params.videoId);
  return (
    <div>
      <VideoModal video={video} />
    </div>
  );
};

export default Video;
