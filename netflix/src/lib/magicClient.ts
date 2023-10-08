import { Magic } from "magic-sdk";

const createMagic = () => {
  const apiKey: string = process.env.MAGIC_PUBLISHABLE_API_KEY || "";
  return (typeof window !== "undefined" && new Magic(apiKey));
};

export const magic = createMagic();
console.log("magic setup", magic);
