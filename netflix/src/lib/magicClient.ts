import { Magic } from "magic-sdk";

const createMagic = () => {
  const apiKey: string = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY || "";
  return (typeof window !== "undefined" && new Magic(apiKey));
};

export const magic = createMagic();
