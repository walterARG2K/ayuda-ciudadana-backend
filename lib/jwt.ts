import jwt from "jsonwebtoken";
export function createToken(data: string) {
  const token = jwt.sign(data, process.env.JWT_SECRET);
  return token;
}

export function verifyToken(token: string) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
}
