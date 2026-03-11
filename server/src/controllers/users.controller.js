const User = require("../models/User");

async function me(req, res) {
  const userId = req.user?.sub;
  const user = await User.findById(userId).select("_id name email role avatarUrl createdAt");
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.json({ user });
}

module.exports = { me };


