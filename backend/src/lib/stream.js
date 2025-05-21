import { StreamChat } from "stream-chat";
import stream from "getstream";
import "dotenv/config";

const apiKey = process.env.STEAM_API_KEY;
const apiSecret = process.env.STEAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Stream API key or Secret is missing");
}

const sreamChatClient = StreamChat.getInstance(apiKey, apiSecret);
const streamActivityClient = stream.connect(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await sreamChatClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error upserting Stream user:", error);
  }
};

export const generateStreamChatToken = (userId) => {
  try {
    // ensure userId is a string
    const userIdStr = userId.toString();
    return sreamChatClient.createToken(userIdStr);
  } catch (error) {
    console.error("Error generating Stream token:", error);
  }
};

export const generateStreamActivityToken = (userId) => {
  try {
    // ensure userId is a string
    const userIdStr = userId.toString();
    return streamActivityClient.createUserToken(userIdStr);
  } catch (error) {
    console.error("Error generating Stream token:", error);
  }
};
