import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function for merging class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Utility function for restructuring a phrase
 * @param phrase - The input phrase to restructure
 * @returns The restructured phrase
 */
export function restructurePhrase(phrase: string) {
  return phrase
    .split(/[-\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Utility function to get initials from a name.
 * This is useful for generating avatar initials or similar use cases.
 * @param name - The full name from which to extract initials.
 * @returns A string containing the initials of the name.
 */
export function getInitals(name: string): string {
  const names = name.split(" ");
  if (names.length === 0) return "";
  if (names.length === 1) return names[0]?.charAt(0).toUpperCase() ?? "";
  return (
    (names[0]?.charAt(0).toUpperCase() ?? "") +
    (names[names.length - 1]?.charAt(0).toUpperCase() ?? "")
  );
}

/**
 * Utility function to get the default profile image URL.
 * @param email - Optional email to generate a unique avatar URL.
 * @returns A string containing the default profile image URL.
 */
export function defaultProfileImage({ email }: { email?: string }): string {
  return email
    ? `https://avatar.vercel.sh/${email}`
    : "https://6tzeyhmmyh.ufs.sh/f/0tp8Nw6atwboAzXu9bZ8GztK9FMVdS4RhTwQHB6CZ2mlEaNO";
}

/**
 *  Utility function to extract the name from an email address.
 * This is useful for displaying user names in a more readable format.
 * @param email - The email address from which to extract the name.
 * @returns A string containing the name extracted from the email.
 */
export function getNameFromEmail(email: string): string {
  const [name] = email.split("@");
  return (name ?? "").replace(".", " ");
}
