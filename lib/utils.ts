import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { BlockContent } from "@/sanity/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateReadingTime(body: BlockContent): number {
  if (!body) return 0;
  
  const wordsPerMinute = 200;
  let textContent = "";
  
  body.forEach((block) => {
    if (block._type === "block" && block.children) {
      block.children.forEach((child) => {
        if (child._type === "span" && child.text) {
          textContent += child.text + " ";
        }
      });
    }
  });
  
  const wordCount = textContent.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

