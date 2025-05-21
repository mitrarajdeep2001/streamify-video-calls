import path from "path";

async function generateRandomAvatar(req, res) {
  try {
    const idx = Math.floor(Math.random() * 50) + 1; // 1-50 included
    const randomGender =
      Math.floor(Math.random() * 2) === 0 ? "male" : "female"; // Randomly choose between male or female
    const randomAvatar = path.join("avatars", `${randomGender}-${idx}.png`);
    res.status(200).json({ avatar_url: randomAvatar });
  } catch (error) {
    console.log("Error in generateRandomAvatar:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export default generateRandomAvatar;
