import "dotenv/config";

const NODE_ENVS = ["development", "test", "production"] as const;
type NodeEnv = (typeof NODE_ENVS)[number];

function required(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function parsePort(raw: string): number {
  const port = Number(raw);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid PORT: "${raw}"`);
  }
  return port;
}

function parseNodeEnv(raw: string): NodeEnv {
  if (!(NODE_ENVS as readonly string[]).includes(raw)) {
    throw new Error(`Invalid NODE_ENV: "${raw}" (expected ${NODE_ENVS.join(" | ")})`);
  }
  return raw as NodeEnv;
}

export const env = {
  port: parsePort(process.env["PORT"] ?? "3000"),
  nodeEnv: parseNodeEnv(process.env["NODE_ENV"] ?? "development"),
  dbUrl: required("DATABASE_URL"),
  corsOrigin: process.env["CORS_ORIGIN"] ?? "http://localhost:5173",
} as const;
