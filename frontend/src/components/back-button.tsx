"use client";

import { ArrowLeftIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function BackButton() {
  return (
    <Button
      onClick={() => window.history.back()}
      variant="outline"
      className="m-4 self-start"
    >
      <ArrowLeftIcon />
      Back
    </Button>
  );
}
