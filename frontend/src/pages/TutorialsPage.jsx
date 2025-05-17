import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getTutorials } from "../lib/api";
import { Dialog } from "@headlessui/react"; // Install if not added
import { PlayCircleIcon, X } from "lucide-react"; // Optional close icon
import PageLoader from "../components/PageLoader";

const TutorialsPage = () => {
  const [page, setPage] = useState(1);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const {
    data = { videos: [], hasNextPage: false, hasPrevPage: false },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tutorials", page],
    queryFn: () => getTutorials(page),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const handleNext = () => {
    if (data.hasNextPage) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (data.hasPrevPage) setPage((prev) => prev - 1);
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
            className="relative card bg-base-200 hover:shadow-lg transition-shadow overflow-hidden group"
          >
            <img
              src={video.thumbnail.replace("default", "mqdefault")}
              alt={video.title}
              className="w-full h-40 object-cover"
            />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setSelectedVideoId(video.videoId)}
                className="btn btn-circle btn-primary h-20 w-20 shadow-xl"
              >
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
          disabled={!data.hasPrevPage}
          className="btn btn-outline"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!data.hasNextPage}
          className="btn btn-primary"
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
            className="absolute top-1 right-4 text-white z-10"
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
