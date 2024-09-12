import axiosPublic from "@/lib/api-public";
import { RegisterType } from "@/schemas/auth";

// Define a type for API response
interface RegisterResponse {
  status: boolean | string;
  title: string;
  message: string;
  errors?: Record<string, string[]>; // Errors field from API
  user?: any;
}

// Register user function
export const registerUser = async (
  data: RegisterType
): Promise<RegisterResponse> => {
  try {
    const response = await axiosPublic.post<RegisterResponse>("/auth/register", data);
    return response.data;
  } catch (error: any) {
    // Handle error response
    if (error.response && error.response.data) {
      return error.response.data;
    }
    // Return a generic error if response data is not available
    return { status: false, message: "An unexpected error occurred", title: "Error" };
  }
};
