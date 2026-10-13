import { ImageWithFallback } from "./figma/ImageWithFallback";
import coinImage from "../../imports/ChatGPT_Image_Oct_10__2026__12_47_42_AM.png";

type CoinIconProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizeMap = {
  xs: "w-4 h-4",
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-14 h-14",
  xl: "w-24 h-24",
};

export function CoinIcon({ size = "sm", className = "" }: CoinIconProps) {
  return (
    <ImageWithFallback
      src={coinImage}
      alt="Studex Points coin"
      className={`${sizeMap[size]} object-contain flex-shrink-0 ${className}`}
    />
  );
}
