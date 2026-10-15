import crypto from "node:crypto";
export function encryptSecret(value:string){
 const raw=process.env.GATEWAY_ENCRYPTION_KEY??"";
 if(!/^[0-9a-fA-F]{64}$/.test(raw))throw new Error("GATEWAY_ENCRYPTION_KEY must be 64 hex characters.");
 const key=Buffer.from(raw,"hex"),iv=crypto.randomBytes(12),cipher=crypto.createCipheriv("aes-256-gcm",key,iv);
 const encrypted=Buffer.concat([cipher.update(value,"utf8"),cipher.final()]);
 return [iv.toString("hex"),cipher.getAuthTag().toString("hex"),encrypted.toString("hex")].join(":");
}
export function validSlug(s:string){return /^[a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])?$/.test(s)}
