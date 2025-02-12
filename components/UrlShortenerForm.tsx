"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClipboardCopy } from "@/utils";
import QRCode from "react-qr-code";
import dayjs from "dayjs";
import { Copy, QrCodeIcon } from "lucide-react";
import ChooseSize from "./ChooseSize";
import { useToast } from "@/hooks/use-toast";
import { ShineBorder } from "./magicui/shine-border";
import { Input } from "./ui/input";
import ChooseDays from "./ChooseDays";

const QR_OPTIONS = [
  { label: "64px", value: "64px" },
  { label: "128px", value: "128px" },
  { label: "256px", value: "256px" },
  { label: "512px", value: "512px" },
  { label: "SVG", value: "svg" },
];
const DAY_OPTIONS = [
  { label: "1 day", value: "1" },
  { label: "3 days", value: "3" },
  { label: "7 days", value: "7" },
  { label: "30 days", value: "30" },
  { label: "Lifetime", value: "lifetime" },
];

export default function UrlShortenerForm() {
  const { toast } = useToast();
  const [url, setUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [qrSize, setQrSize] = useState<number>(64);
  const [selectedDays, setSelectedDays] = useState<string>(
    DAY_OPTIONS[0].value,
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          expiresAt:
            selectedDays === "lifetime"
              ? null
              : dayjs().add(parseInt(selectedDays), "day"),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setShortUrl(data.shortUrl);
        setError("");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to shorten URL:" + JSON.stringify(err));
    }
  };

  const onChangeQrSize = (value: string) => {
    if (value === "svg") {
    } else {
      setQrSize(parseInt(value.slice(0, -2), 10));
    }
  };

  const handleClickCopy = () => {
    ClipboardCopy(shortUrl);
    toast({
      description: "You can now paste it in your browser",
      duration: 1000,
    });
  };

  const handleChangeUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  return (
    <ShineBorder
      className="max-w-2xl mx-auto mt-10 md:p-6 bg-white rounded shadow-md"
      duration={8}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center md:items-start w-full max-w-3xl md:space-x-2"
      >
        <div className="flex space-x-1">
          <Input
            type="url"
            value={url}
            onChange={handleChangeUrl}
            placeholder="Enter your URL"
            className="w-full md:min-w-80 min-w-64 p-2 mb-2 md:mb-4 border rounded text-gray-600"
            required
          />
          <ChooseDays
            value={selectedDays}
            onValueChange={setSelectedDays}
            defaultValue={DAY_OPTIONS[0].value}
            options={DAY_OPTIONS}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-foreground text-background font-semibold rounded hover:bg-neutral-800"
        >
          Shorten
        </Button>
      </form>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {shortUrl && (
        <div className="w-full flex justify-between items-center mt-4 py-2 px-3 bg-gray-200 rounded">
          <a href={shortUrl} className="text-blue-500 ml-2">
            {shortUrl}
          </a>
          <div className="flex flex-nowrap">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <QrCodeIcon />
                </Button>
              </DialogTrigger>
              <DialogDescription />
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>QR</DialogTitle>
                </DialogHeader>
                <div
                  style={{
                    height: "auto",
                    margin: "0 auto",
                    maxWidth: qrSize,
                    width: "100%",
                  }}
                >
                  <QRCode
                    size={512}
                    style={{
                      height: "auto",
                      maxWidth: "100%",
                      width: "100%",
                    }}
                    value={shortUrl}
                    viewBox={`0 0 512 512`}
                  />
                </div>
                <DialogFooter className="sm:justify-start">
                  <ChooseSize
                    onValueChange={onChangeQrSize}
                    defaultValue={QR_OPTIONS[0].value}
                    options={QR_OPTIONS}
                  />
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="icon" onClick={handleClickCopy}>
              <Copy />
            </Button>
          </div>
        </div>
      )}
    </ShineBorder>
  );
}
