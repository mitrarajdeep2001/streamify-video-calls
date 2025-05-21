import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};
export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
};

export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
};

export async function getUserFriends() {
  const response = await axiosInstance.get("/users/friends");
  return response.data;
}

export async function getRecommendedUsers() {
  const response = await axiosInstance.get("/users");
  return response.data;
}

export async function getOutgoingFriendReqs() {
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data;
}

export async function sendFriendRequest(userId) {
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data;
}

export async function getFriendRequests() {
  const response = await axiosInstance.get("/users/friend-requests");
  return response.data;
}

export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
  return response.data;
}

// Notifications starts
export async function getAllNotifications() {
  const response = await axiosInstance.get(`/notifications`);
  return response.data;
}

export async function getUnreadNotificationsCount() {
  const response = await axiosInstance.get(`/notifications/unread/count`);
  return response.data;
}

export const markAllNotificationsAsRead = async () => {
  const res = await axiosInstance.patch("/notifications/read"); // Adjust the URL if needed
  return res.data;
};

export async function deleteNotificationById(id) {
  const response = await axiosInstance.delete(`/notifications/${id}`);
  return response.data;
}

export async function deleteAllNotifications(userId) {
  const response = await axiosInstance.delete(`/notifications/user/${userId}`);
  return response.data;
}
// Notifications ends

export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}

export async function getTutorials(page) {
  const response = await axiosInstance.get(`/tutorials?page=${page}`);
  return response.data;
}

export async function setAiPrompt(prompt) {
  const response = await axiosInstance.post(`/prompts/generate`, prompt);
  return response.data;
}
