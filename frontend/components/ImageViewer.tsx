import Image from "next/image";
import React, { useEffect } from "react";

export default function ImageViewer({
  data,
  width,
  height,
}: {
  data: string | null;
  width: number;
  height: number;
}) {
  console.log("ImageViewer", data);
  return (
    <>
      {data && (
        <img
          className="border rounded-full"
          src={data}
          alt=""
          width={width}
          height={height}
        />
      )}
    </>
  );
}
