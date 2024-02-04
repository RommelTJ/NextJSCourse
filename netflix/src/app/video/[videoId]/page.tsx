const Video = ({ params }: { params: { videoId: string } }) => {
  return <div>video page: {params.videoId}</div>;
};

export default Video;
