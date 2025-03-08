"use client";

import { useCallback, useState } from "react";
import QRCodeDisplay from "./QRCodeDisplay";

export default function Main() {
  const [url, setUrl] = useState("");
  const [qrValue, setQrValue] = useState("");

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUrl(event.target.value);
    },
    []
  );

  const handleGenerate = useCallback(() => {
    setQrValue(url);
  }, [url]);

  return (
    <div className="w-full pt-6 flex items-center flex-col gap-10">
      <div className="flex gap-2 items-cneter justify-center">
        <div className="w-72">
          <input
            type="text"
            id="url"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-52"
            placeholder="https://example.com"
            onChange={handleInputChange}
          />
        </div>

        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          disabled={!url}
          onClick={handleGenerate}
        >
          Generate QR Code
        </button>
      </div>
      {!!qrValue && <QRCodeDisplay url={url} />}
    </div>
  );
}
