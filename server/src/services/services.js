import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const mockUser = {
  email: "admin@test.com",
  password: bcrypt.hashSync("password123", 10)
};

export const authenticateUser = async (email, password) => {
  if (email !== mockUser.email) {
    throw new Error("Invalid credentials");
  }

  const valid = await bcrypt.compare(password, mockUser.password);
  if (!valid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { email },
    "secretKey",
    { expiresIn: "1h" }
  );

  return { token };
};
