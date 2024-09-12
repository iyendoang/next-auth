import { FieldValues, Path, UseFormSetError } from "react-hook-form";

// Adjusted function to handle field-specific errors
export function handleFieldErrors<T extends FieldValues>(
  errors: Record<string, string[]>, // API error structure
  setError: UseFormSetError<T>
) {
  for (const [field, messages] of Object.entries(errors)) {
    // Type assertion to ensure field is a valid path of T
    const typedField = field as Path<T>;

    // Set the first error message for each field
    setError(typedField, {
      type: "manual",
      message: messages[0] || "An unexpected error occurred",
    });
  }
}
