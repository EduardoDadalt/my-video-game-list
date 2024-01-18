import crypto from "crypto";

const configCrypto = {
  hashBytes: 32,
  saltBytes: 16,
  iterations: 872791,
};

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(configCrypto.saltBytes);

  const hash = crypto.pbkdf2Sync(
    password,
    salt,
    configCrypto.iterations,
    configCrypto.hashBytes,
    "sha512"
  );

  const combined = Buffer.alloc(hash.length + salt.length + 8);

  combined.writeUInt32BE(salt.length, 0);
  combined.writeUInt32BE(configCrypto.iterations, 4);

  salt.copy(combined, 8);
  hash.copy(combined, salt.length + 8);
  const result = combined.toString("hex");
  return result;
}

export function verifyPassword(password: string, combinedStr: string): boolean {
  const combined = Buffer.from(combinedStr, "hex");

  const saltBytes = combined.readUInt32BE(0);
  const hashBytes = combined.length - saltBytes - 8;
  const iterations = combined.readUInt32BE(4);
  const salt = combined.subarray(8, saltBytes + 8);
  const hash = combined.subarray(saltBytes + 8);

  const hashTest = crypto.pbkdf2Sync(
    password,
    salt,
    iterations,
    hashBytes,
    "sha512"
  );
  return hashTest.toString("hex") === hash.toString("hex");
}
