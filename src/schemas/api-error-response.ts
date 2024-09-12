// src/schemas/api-error-response.ts

export interface APIErrorResponse {
    status: string; 
    message?: string; // Optional general error message
    errors?: Record<string, string[]>; // Optional field-specific errors, where each key is a field name and value is an array of error messages
  }
  