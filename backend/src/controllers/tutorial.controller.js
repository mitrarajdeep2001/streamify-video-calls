// controllers/tutorialController.js
import Tutorial from "../models/Tutorial.js";

export async function getTutorials(req, res) {
  try {
    const { page = 1, limit = 6 } = req.query;
    console.log(req.user.learningLanguage.toLowerCase());
    const query = req.user.learningLanguage
      ? {
          language: {
            $regex: req.user.learningLanguage,
            $options: "i",
          },
          title: {
            $regex: req.user.learningLanguage,
            $options: "i",
          },
        }
      : {};

    const skip = (Number(page) - 1) * Number(limit);

    const [videos, total] = await Promise.all([
      Tutorial.find(query)
        .sort({ createdAt: -1 }) // Latest first
        .skip(skip)
        .limit(Number(limit)),
      Tutorial.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / Number(limit));

    res.status(200).json({
      videos,
      page: Number(page),
      totalPages,
      totalResults: total,
      hasNextPage: Number(page) < totalPages,
      hasPrevPage: Number(page) > 1,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching tutorials",
      error: error.message,
    });
  }
}
