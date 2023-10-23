import Image from "next/image";

export function Logo({ height = 50, width = 150 }) {
  return <Image src="/logo.png" height={height} width={width} alt="logo" />;
}
