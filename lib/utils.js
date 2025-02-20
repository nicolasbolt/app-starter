import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
// import bcrypt from "bcrypt";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// export async function hashPassword(password) {
//   const saltRounds = 10;
//   const salt = await bcrypt.genSalt(saltRounds);
//   const hashedPassword = await bcrypt.hash(password, salt);
//   return hashedPassword;
// }