"use client";

import { useCallback, useState } from "react";
import QRCodeDisplay from "./QRCodeDisplay";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { InputText } from "@/components/form/InputText";

export default function Main() {
  const [url, setUrl] = useState("");
  const [qrValue, setQrValue] = useState("");

  const handleInputChange = useCallback((e: string) => {
    setUrl(e);
  }, []);

  const handleGenerate = useCallback(() => {
    setQrValue(url);
  }, [url]);

  return (
    <div className="w-full pt-6 flex items-center flex-col gap-10">
      <div className="flex gap-2 items-cneter justify-center">
        <div className="w-72">
          <InputText
            value={url}
            placeholder="https://example.com"
            onChange={handleInputChange}
          />
        </div>

        <PrimaryButton
          label="Generate QR Code"
          disabled={!url}
          onClick={handleGenerate}
        />
      </div>
      {!!qrValue && <QRCodeDisplay url={url} />}
    </div>
  );
}
