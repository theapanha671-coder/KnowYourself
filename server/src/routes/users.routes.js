const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const { requireAuth } = require("../middleware/auth");
const { me } = require("../controllers/users.controller");
const User = require("../models/User");
const { hasCloudinary, uploadBuffer, deleteByUrl } = require("../config/cloudinary");

router.get("/me", requireAuth, me);

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

let multer = null;
try {
  // Optional dependency: if not installed, server still runs (upload route returns 501).
  // eslint-disable-next-line global-require
  multer = require("multer");
} catch {
  multer = null;
}

if (multer) {
  const uploadsRoot = path.join(__dirname, "../../uploads");
  const avatarsDir = path.join(uploadsRoot, "avatars");
  const useCloudinary = hasCloudinary();
  if (!useCloudinary) ensureDir(avatarsDir);

  const uploadAvatar = multer({
    storage: useCloudinary
      ? multer.memoryStorage()
      : multer.diskStorage({
          destination: (_req, _file, cb) => cb(null, avatarsDir),
          filename: (_req, file, cb) => {
            const ext = path.extname(file.originalname || "").toLowerCase().slice(0, 10);
            const safeExt = /^[.][a-z0-9]+$/.test(ext) ? ext : "";
            const name = `avatar_${Date.now()}_${Math.random().toString(16).slice(2)}${safeExt}`;
            cb(null, name);
          }
        }),
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      if (String(file.mimetype || "").startsWith("image/")) return cb(null, true);
      return cb(new Error("Only image uploads are allowed"));
    }
  });

  router.post("/me/avatar", requireAuth, uploadAvatar.single("file"), async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "Missing file" });
    const existing = await User.findById(req.user.sub).select("avatarUrl");
    if (!existing) return res.status(404).json({ message: "User not found" });

    let url = "";
    if (useCloudinary) {
      const publicId = `avatar_${Date.now()}_${Math.random().toString(16).slice(2)}`;
      const result = await uploadBuffer(req.file.buffer, {
        folder: "knowyourself/avatars",
        public_id: publicId,
        resource_type: "image"
      });
      url = result.secure_url || result.url;
    } else {
      url = `/uploads/avatars/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(
      req.user.sub,
      { avatarUrl: url },
      { new: true }
    ).select("_id name email role permissions avatarUrl createdAt");

    if (existing.avatarUrl && existing.avatarUrl !== url) {
      await deleteByUrl(existing.avatarUrl);
    }

    res.json({ user });
  });
} else {
  router.post("/me/avatar", requireAuth, async (_req, res) => {
    res.status(501).json({
      message: "Upload feature not installed. Run `npm install` in server/ to install multer."
    });
  });
}

module.exports = router;
