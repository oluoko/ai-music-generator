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

/**
 * Array of placeholder descriptions for song generation.
 */
export const placeholders = [
  "A dreamy lofi hip-hop song, perfect for studying, sleeping or just relaxing",
  "An upbeat pop anthem with catchy hooks and energetic drums",
  "A soulful R&B ballad with smooth vocals and emotional lyrics",
  "An epic orchestral piece with soaring strings and dramatic crescendos",
  "A funky jazz fusion track with complex rhythms and improvised solos",
  "An ambient electronic soundscape with ethereal pads and subtle beats",
  "A country folk song with acoustic guitar, harmonica, and storytelling vocals",
  "A heavy metal track with distorted guitars, pounding drums, and powerful vocals",
  "A classical piano composition with delicate melodies and expressive dynamics",
  "A reggae song with laid-back rhythms, bass lines, and positive vibes",
  "An indie rock track with jangly guitars, driving bass, and introspective lyrics",
  "A trap hip-hop beat with 808s, hi-hats, and atmospheric synths",
];
