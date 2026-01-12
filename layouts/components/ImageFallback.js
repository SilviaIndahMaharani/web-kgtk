/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";

const ImageFallback = (props) => {
  const {
    src,
    fallback = "",
    width,
    height,
    alt,
    className,
    priority,
    ...rest
  } = props;

  // Pastikan src itu string (kalau tidak, jadikan "")
  const safeSrc = typeof src === "string" ? src : "";

  // For static export with basePath, prepend the basePath to relative image paths
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const processedSrc =
    safeSrc.startsWith("/") &&
    !safeSrc.startsWith("//") &&
    !safeSrc.startsWith("http")
      ? `${basePath}${safeSrc}`
      : safeSrc;

  // kalau processedSrc kosong, pakai fallback (kalau ada)
  const initialSrc = processedSrc || fallback || "";

  const [imgSrc, setImgSrc] = useState(initialSrc);

  useEffect(() => {
    setImgSrc(initialSrc);
  }, [initialSrc]);

  return (
    <img
      {...rest}
      src={imgSrc}
      width={width}
      height={height}
      alt={alt}
      className={className}
      onError={() => {
        if (fallback) setImgSrc(fallback);
      }}
    />
  );
};

export default ImageFallback;
