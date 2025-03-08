"use client";

import { QRCodeCanvas } from "qrcode.react";

type QRCodeDisplayProps = {
  url: string;
};

export default function QRCodeDisplay(props: QRCodeDisplayProps) {
  return (
    <>
      <QRCodeCanvas value={props.url} size={256} marginSize={2} />
    </>
  );
}
