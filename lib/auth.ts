import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const JWT_SECRET = process.env.JWT_SECRET || "muacodb-secret-key-change-in-production"
const JWT_EXPIRES_IN = "7d"

export interface User {
  id: string
  email: string
  name: string
  plan: "free" | "basic" | "pro" | "enterprise"
  createdAt: Date
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateTokens(user: User): AuthTokens {
  const payload = {
    userId: user.id,
    email: user.email,
    plan: user.plan,
  }

  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
  const refreshToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "30d" })

  return { accessToken, refreshToken }
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    throw new Error("Invalid token")
  }
}

export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }
  return authHeader.substring(7)
}
