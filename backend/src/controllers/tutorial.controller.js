import axios from "axios";

export async function getTutorials(req, res) {
  try {
    const { pageToken = "" } = req.query;

    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          part: "snippet",
          q: "english tutorials 2025",
          type: "video",
          maxResults: 5,
          relevanceLanguage: "en",
          key: process.env.YOUTUBE_API_KEY,
          pageToken,
        },
      }
    );

    if (!response.data || response.data.items.length === 0) {
      return res.status(404).json({ message: "No tutorials found" });
    }

    const videos = response.data.items.map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails?.default?.url,
    }));

    res.status(200).json({
      videos,
      nextPageToken: response.data.nextPageToken || null,
      prevPageToken: response.data.prevPageToken || null,
      totalResults: response.data.pageInfo.totalResults,
    });
  } catch (error) {
    console.error("Error in getTutorials controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
