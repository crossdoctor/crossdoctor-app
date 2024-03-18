import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// save to storage
export const saveToStorage = (key: any, value: any) => {
  if (typeof window !== "undefined") {
    return window.localStorage.setItem(key, value)
  }
}

// get from storage
export const getFromStorage = (key: any) => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(key)
  }
}
