import axiosPublic from "@/lib/api-public";
import { LoginType } from "@/schemas/auth";

// Define a type for API response
interface LoginResponse {
  status: boolean | string;
  title: string;
  message: string;
  errors?: Record<string, string[]>; // Errors field from API
  user?: any;
  access_token?: string;
  token_type?: string;
  expires_in?: number;
}

// Login user function
export const loginUser = async (
  data: LoginType
): Promise<LoginResponse> => {
  try {
    const response = await axiosPublic.post<LoginResponse>("/auth/login", data);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { status: false, message: "An unexpected error occurred", title: "Error" };
  }
};
