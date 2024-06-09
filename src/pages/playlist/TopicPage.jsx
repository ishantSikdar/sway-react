import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { topicVideosAtomFamily } from "../../recoil/atoms/playlistAtoms";
import VideoCard from "../../components/playlist/VideoCard";
import { ROUTE_PLAYLIST_SUBJECT_VIDEOS } from "../../constants/routes";

export default function TopicPage() {
  const navigate = useNavigate();
  const { subjectName, topicName } = useParams();
  const videoListLoadable = useRecoilValueLoadable(topicVideosAtomFamily(`${topicName} in ${subjectName}`));

  const goToOtherVideo = (event) => {
    const videoId = event.currentTarget.getAttribute('data-id');
    const videoTitle = event.currentTarget.getAttribute('data-title');

    console.log({
      subjectName: subjectName,
      id: videoId,
      title: videoTitle
    });

    const url = `${ROUTE_PLAYLIST_SUBJECT_VIDEOS
      .replace(":subjectName", subjectName)
      .replace(":videoId", videoId)
      .replace(":videoTitle", videoTitle)
      }`;

    console.log(url)
    navigate(url);
  }
  
  if (videoListLoadable.state === "hasValue") {
    const videoDataList = videoListLoadable.contents;
    return (
      <div className="mt-16 px-5">
        {/* Recommended Section */}
        <div className="pt-2">
          <iframe
            title="youtubeVideo"
            src={`https://www.youtube.com/embed/${videoDataList[0]?.id?.videoId}`}
            className="w-full aspect-video rounded-md bg-coal my-3"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <p className="text-xl font-bold text-frostWhite capitalize">
            {videoDataList[0]?.snippet.title}
          </p>
        </div>

        <div className="w-full h-[0.5pt] bg-white mt-3"></div>

        {/* Related Section */}
        <div className="pt-5">
          <h1 className="text-2xl font-bold text-center">Related Videos</h1>
          <div className="py-5 flex flex-col gap-4">
            {videoDataList.map((videoData, index) => {
              if (index !== 0) {
                return (
                  <button
                    key={videoData.id.videoId}
                    data-id={videoData.id.videoId}
                    data-title={videoData.snippet.title}
                    onClick={goToOtherVideo}
                  >
                    <VideoCard
                      title={videoData.snippet.title}
                      author={videoData.snippet.channelTitle}
                      thumbnailUrl={videoData.snippet.thumbnails.high.url}
                    />
                  </button>
                )
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}