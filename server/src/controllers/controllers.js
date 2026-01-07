import { authenticateUser } from "../services/services.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await authenticateUser(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
