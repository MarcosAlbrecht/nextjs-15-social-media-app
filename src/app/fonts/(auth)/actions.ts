"use server";

import prisma from "@/lib/prisma";
import { signUpSchema, SignupValues } from "@/lib/validations";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";

export async function signUp(
  credentials: SignupValues,
): Promise<{ error: string }> {
  try {
    const { email, password, username } = signUpSchema.parse(credentials);

    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const userId = generateIdFromEntropySize(10);

    const existingUserName = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });
  } catch (error) {
    console.error("Error signing up:", error);
    return { error: "An error occurred during sign up. Please try again." };
  }
}
