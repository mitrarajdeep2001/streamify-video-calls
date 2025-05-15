import axios from "axios";

export async function getTutorials(req, res) {
  try {
    const { pageToken , limit = 600 } = req.query;

    const params = {
      part: "snippet",
      q: "english tutorials 2025",
      type: "video",
      maxResults: limit,
      relevanceLanguage: "en",
      key: process.env.YOUTUBE_API_KEY,
    };

    if (pageToken !== "null") {
      params.pageToken = pageToken;
    }
    
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params,
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
    res.status(500).json({ message: "Quota exceeded! Please try again later." });
  }
}
