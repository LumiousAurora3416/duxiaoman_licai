import Image from "next/image";

type MascotName = "wave" | "map" | "celebrate" | "goose";
type Shape = "rounded" | "circle" | "plain";

const sources: Record<MascotName, string> = {
  wave: "/mascot/cat-wave.png",
  map: "/mascot/cat-map.png",
  celebrate: "/mascot/cat-celebrate.png",
  goose: "/mascot/goose.png",
};

const alts: Record<MascotName, string> = {
  wave: "度小满小猫向你招手",
  map: "度小满小猫看着地图探索",
  celebrate: "度小满小猫戴着毕业帽庆祝",
  goose: "会下金蛋的小鹅坐在窝里",
};

interface MascotProps {
  name: MascotName;
  size?: number;
  shape?: Shape;
  className?: string;
  priority?: boolean;
}

export default function Mascot({
  name,
  size = 120,
  shape = "rounded",
  className = "",
  priority = false,
}: MascotProps) {
  const shapeClass =
    shape === "circle"
      ? "rounded-full border-4 border-white/70 shadow-[0_6px_16px_rgba(120,80,20,0.18)]"
      : shape === "rounded"
        ? "rounded-[30px] border-[3px] border-[#f0e0bc] shadow-[0_6px_16px_rgba(120,80,20,0.14)]"
        : "";

  return (
    <span
      className={`inline-block overflow-hidden ${shapeClass} ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={sources[name]}
        alt={alts[name]}
        width={size}
        height={size}
        priority={priority}
        className="h-full w-full object-cover"
      />
    </span>
  );
}
