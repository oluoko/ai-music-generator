import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { generateSong } from "@/inngest/function";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [generateSong],
});
