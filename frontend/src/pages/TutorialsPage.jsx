import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getTutorials } from "../lib/api";
import { Dialog } from "@headlessui/react"; // Install if not added
import { PlayCircleIcon, X } from "lucide-react"; // Optional close icon
import PageLoader from "../components/PageLoader";

const TutorialsPage = () => {
  const [pageToken, setPageToken] = useState(null);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const {
    data = { videos: [], nextPageToken: null, prevPageToken: null },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tutorials", pageToken],
    queryFn: () => getTutorials(pageToken),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const handleNext = () => {
    if (data.nextPageToken) setPageToken(data.nextPageToken);
  };

  const handlePrev = () => {
    if (data.prevPageToken) setPageToken(data.prevPageToken);
  };

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return (
      <p className="text-center mt-4 text-red-500">Failed to load tutorials.</p>
    );
  }

  return (
    <div className="p-4 space-y-6 container mx-auto">
      {/* Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        style={{ zoom: 0.9 }}
      >
        {data.videos.map((video) => (
          <div
            key={video.videoId}
            className="relative card bg-base-200 hover:shadow-lg transition-shadow rounded-lg overflow-hidden cursor-pointer group"
          >
            <img
              src={video.thumbnail.replace("default", "mqdefault")}
              alt={video.title}
              className="w-full h-40 object-cover"
            />

            {/* Play Button */}
            <div
              onClick={() => setSelectedVideoId(video.videoId)}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <button className="btn btn-circle btn-primary h-20 w-20 shadow-xl">
                <PlayCircleIcon className="h-10 w-10 text-white" />
              </button>
            </div>

            <div className="p-4">
              <h2 className="text-lg font-semibold line-clamp-2">
                {video.title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{video.channel}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handlePrev}
          disabled={!data.prevPageToken}
          className="btn btn-outline rounded-full"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!data.nextPageToken}
          className="btn btn-primary rounded-full"
        >
          Next
        </button>
      </div>

      {/* Modal to Play Video */}
      <Dialog
        open={!!selectedVideoId}
        onClose={() => setSelectedVideoId(null)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      >
        <div className="relative w-full max-w-4xl px-4">
          <button
            className="absolute top-2 right-2 text-white z-10"
            onClick={() => setSelectedVideoId(null)}
          >
            <X size={24} />
          </button>
          {selectedVideoId && (
            <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default TutorialsPage;
