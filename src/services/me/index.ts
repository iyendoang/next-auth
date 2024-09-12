import api from "@/lib/api";

// src\services\me\index.ts
export async function getUser() {
  try {
    const response = await api.get("/auth/me"); // Assuming the endpoint to get user data is `/me`
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user", error);
    throw error;
  }
}
