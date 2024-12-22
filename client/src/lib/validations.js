import { z } from "zod";

const requiredString = z.string().trim().min(1, "required");

export const registerShcema = z.object({
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "onlu letters numbers _ and - allowed"
  ),
  email: requiredString.email(),
  password: requiredString.min(8, "must be at least 8 characters long"),
  mobileNumber: requiredString.min(10, "must be at least 10 characters long")
});

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
});

