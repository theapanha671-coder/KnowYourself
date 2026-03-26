const User = require("../models/User");
const { hasPermission } = require("../utils/permissions");

function requirePermission(permission) {
  return async (req, res, next) => {
    const role = req.user?.role;
    if (role === "admin") return next();
    if (role !== "employee") return res.status(403).json({ message: "Permission denied" });

    let perms = req.user?.permissions;
    if (!Array.isArray(perms)) {
      const user = await User.findById(req.user?.sub).select("permissions role");
      if (!user) return res.status(401).json({ message: "User not found" });
      perms = user.permissions || [];
      req.user.permissions = perms;
    }

    if (!hasPermission(perms, permission)) {
      return res.status(403).json({ message: "Permission denied" });
    }

    return next();
  };
}

module.exports = { requirePermission };
