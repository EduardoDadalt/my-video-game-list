import argon2 from "argon2";

export function hashPassword(password: string) {
  return argon2.hash(password);
}

export function verifyPassword(
  hash: string,
  password: string
): Promise<boolean> {
  return argon2.verify(hash, password);
}
