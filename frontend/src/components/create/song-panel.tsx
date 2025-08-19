"use client";

import { useState, useEffect, useTransition } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Music, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { generateSong, type GenerateRequest } from "@/actions/generation";

const inspirationTags = [
  "80s synth-pop",
  "Acoustic ballad",
  "Epic movie score",
  "Lo-fi hip hop",
  "Driving rock anthem",
  "Summer beach vibe",
  "Chillwave",
];

const styleTags = [
  "Industrial rave",
  "Heave bass",
  "Orchestral",
  "Electronic beats",
  "Funk guitar",
  "Soulful vocals",
  "Ambient pads",
  "Reggae rhythms",
];

export default function SongPanel() {
  const [mode, setMode] = useState<"simple" | "custom">("simple");
  const [description, setDescription] = useState("");
  const [instrumental, setInstrumental] = useState(true);
  const [lyricsMode, setLyricsMode] = useState<"write" | "auto">("write");
  const [lyrics, setLyrics] = useState("");
  const [styleInput, setStyleInput] = useState("");
  const [loading, startGenerating] = useTransition();

  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);

  const placeholders = [
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex(
        (prevIndex) => (prevIndex + 1) % placeholders.length,
      );
    }, 7000);

    return () => clearInterval(interval);
  }, [placeholders.length]);

  const currentPlaceholder = placeholders[currentPlaceholderIndex];

  const handleInspirationTagClick = (tag: string) => {
    const currentTags = description
      .split(", ")
      .map((s) => s.trim())
      .filter((s) => s);

    if (!currentTags.includes(tag)) {
      if (description.trim() === "") {
        setDescription(tag);
      } else {
        setDescription((prev) => `${prev}, ${tag}`);
      }
    }
  };

  const handleStyleInputTagClick = (tag: string) => {
    const currentTags = styleInput
      .split(", ")
      .map((s) => s.trim())
      .filter((s) => s);

    if (!currentTags.includes(tag)) {
      if (styleInput.trim() === "") {
        setStyleInput(tag);
      } else {
        setStyleInput((prev) => `${prev}, ${tag}`);
      }
    }
  };

  const handleGenerate = async () => {
    if (mode === "custom" && !styleInput.trim()) {
      toast.error("Please add some styles for your song");
      return;
    }

    let requestBody: GenerateRequest;

    if (mode === "simple") {
      if (!description.trim()) {
        requestBody = {
          fullDescribedSong: currentPlaceholder,
          instrumental,
        };
        toast.success(
          `This "${currentPlaceholder}" will be used to generate a song.`,
        );
      } else {
        requestBody = {
          fullDescribedSong: description,
          instrumental,
        };
      }
    } else {
      const prompt = styleInput;
      if (lyricsMode === "write") {
        requestBody = {
          prompt,
          lyrics,
          instrumental,
        };
      } else {
        requestBody = {
          prompt,
          describedLyrics: lyrics ?? currentPlaceholder,
          instrumental,
        };
      }
    }

    startGenerating(async () => {
      try {
        await generateSong(requestBody);
        setDescription("");
        setLyrics("");
        setStyleInput("");
      } catch (error) {
        console.error("Error generating song:", error);
        toast.error("Failed to generate song");
      }
    });
  };

  return (
    <div className="bg-muted/30 flex w-full flex-col border-r lg:w-80">
      <div className="flex-1 overflow-y-auto p-4">
        <Tabs
          value={mode}
          onValueChange={(value) => setMode(value as "simple" | "custom")}
        >
          <TabsList className="w-full">
            <TabsTrigger value="simple">Simple</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>
          <TabsContent value="simple" className="mt-6 space-y-6">
            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium">Describe your song</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={currentPlaceholder}
                className="min-h-[120px] resize-none transition-all duration-300"
              />
            </div>
            {/* Lyrics button and instrumentals toggle */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMode("custom")}
              >
                <Plus className="mr-2" />
                Lyrics
              </Button>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Instrumental</label>
                <Switch
                  checked={instrumental}
                  onCheckedChange={setInstrumental}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label className="font-me text-sm">Inspiration</label>
              <div className="white-space-nowrap hide-scrollbar w-full overflow-x-auto">
                <div className="flex gap-2 pb-2">
                  {inspirationTags.map((tag) => (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 flex-shrink-0 bg-transparent text-xs"
                      key={tag}
                      onClick={() => handleInspirationTagClick(tag)}
                    >
                      <Plus className="mr-1" /> {tag}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="custom" className="mt-6 space-y-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Lyrics</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant={lyricsMode === "auto" ? "secondary" : "ghost"}
                    className="h-7 text-xs"
                    size="sm"
                    onClick={() => {
                      setLyricsMode("auto");
                      setLyrics("");
                    }}
                  >
                    Auto
                  </Button>
                  <Button
                    variant={lyricsMode === "write" ? "secondary" : "ghost"}
                    className="h-7 text-xs"
                    size="sm"
                    onClick={() => {
                      setLyricsMode("write");
                      setLyrics("");
                    }}
                  >
                    Write
                  </Button>
                </div>
              </div>
              <Textarea
                placeholder={
                  lyricsMode === "write"
                    ? "Add your own lyrics here."
                    : "Describe the lyrics that you want e.g a happy song about the beach."
                }
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Instrumental</label>
              <Switch
                checked={instrumental}
                onCheckedChange={setInstrumental}
              />
            </div>

            {/* Styles */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium">Styles</label>
              <Textarea
                placeholder="Enter a styles"
                value={styleInput}
                onChange={(e) => setStyleInput(e.target.value)}
                className="min-h-[70px] resize-none"
              />
              <div className="hide-scrollbar w-full overflow-x-auto whitespace-nowrap">
                <div className="flex gap-2 pb-2">
                  {styleTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="hover:bg-secondary/80 flex-shrink-0 cursor-pointer text-xs"
                      onClick={() => handleStyleInputTagClick(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>{" "}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="border-t p-4">
        <Button
          className="w-full bg-gradient-to-r from-orange-500 to-pink-500 font-extrabold text-white hover:from-orange-600 hover:to-pink-600"
          disabled={loading}
          onClick={handleGenerate}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" /> Generating...
            </>
          ) : (
            <>
              <Music /> Generate
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
