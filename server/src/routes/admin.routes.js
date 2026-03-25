const router = require("express").Router();
const { requireAuth } = require("../middleware/auth");
const { requireAdmin } = require("../middleware/admin");

const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const User = require("../models/User");
const Major = require("../models/Major");
const Career = require("../models/Career");
const Post = require("../models/Post");
const Video = require("../models/Video");
const Experience = require("../models/Experience");
const TestResult = require("../models/TestResult");
const { hasCloudinary, uploadBuffer } = require("../config/cloudinary");

router.use(requireAuth, requireAdmin);
// --- Overview / Stats ---
router.get("/stats", async (_req, res) => {
  const [
    majors,
    majorsKm,
    careers,
    careersKm,
    posts,
    postsKm,
    videos,
    videosKm,
    experiences,
    users,
    admins,
    testResults
  ] = await Promise.all([
    Major.countDocuments({}),
    Major.countDocuments({ titleKm: { $exists: true, $ne: "" } }),
    Career.countDocuments({}),
    Career.countDocuments({ titleKm: { $exists: true, $ne: "" } }),
    Post.countDocuments({}),
    Post.countDocuments({ titleKm: { $exists: true, $ne: "" } }),
    Video.countDocuments({}),
    Video.countDocuments({ titleKm: { $exists: true, $ne: "" } }),
    Experience.countDocuments({}),
    User.countDocuments({}),
    User.countDocuments({ role: "admin" }),
    TestResult.countDocuments({})
  ]);

  const [latestMajor, latestCareer, latestPost, latestVideo, latestExperience, latestUser] = await Promise.all([
    Major.findOne({}).sort({ updatedAt: -1 }).select("_id title titleKm updatedAt"),
    Career.findOne({}).sort({ updatedAt: -1 }).select("_id title titleKm updatedAt"),
    Post.findOne({}).sort({ updatedAt: -1 }).select("_id title titleKm updatedAt"),
    Video.findOne({}).sort({ updatedAt: -1 }).select("_id title titleKm updatedAt"),
    Experience.findOne({}).sort({ updatedAt: -1 }).select("_id title updatedAt"),
    // Use createdAt so the newest registered user shows up (not the most recently edited).
    User.findOne({}).sort({ createdAt: -1 }).select("_id name email role createdAt")
  ]);

  const contentTotal = majors + careers + posts + videos;
  const contentKm = majorsKm + careersKm + postsKm + videosKm;
  const kmCoveragePct = contentTotal ? Math.round((contentKm / contentTotal) * 100) : 0;

  res.json({
    counts: { majors, careers, posts, videos, experiences, users, admins, testResults },
    khmerCoverage: { total: contentTotal, khmer: contentKm, pct: kmCoveragePct },
    latest: {
      major: latestMajor,
      career: latestCareer,
      post: latestPost,
      video: latestVideo,
      experience: latestExperience,
      user: latestUser
    }
  });
});

function parseCsv(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String);
  return String(value)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function normalizeSlug(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

let multer = null;
try {
  // Optional dependency: if not installed, server still runs (upload route returns 501).
  // Install with: npm install
  // eslint-disable-next-line global-require
  multer = require("multer");
} catch {
  multer = null;
}

// --- Uploads ---
if (multer) {
  const uploadsRoot = path.join(__dirname, "../../uploads");
  const majorsUploadDir = path.join(uploadsRoot, "majors");
  const postsUploadDir = path.join(uploadsRoot, "posts");
  const careersUploadDir = path.join(uploadsRoot, "careers");
  const useCloudinary = hasCloudinary();
  if (!useCloudinary) {
    ensureDir(majorsUploadDir);
    ensureDir(postsUploadDir);
    ensureDir(careersUploadDir);
  }

  function makeUpload(destinationDir, prefix) {
    return multer({
      storage: useCloudinary
        ? multer.memoryStorage()
        : multer.diskStorage({
            destination: (_req, _file, cb) => cb(null, destinationDir),
            filename: (_req, file, cb) => {
              const ext = path.extname(file.originalname || "").toLowerCase().slice(0, 10);
              const safeExt = /^[.][a-z0-9]+$/.test(ext) ? ext : "";
              const name = `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}${safeExt}`;
              cb(null, name);
            }
          }),
      limits: { fileSize: 3 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        if (String(file.mimetype || "").startsWith("image/")) return cb(null, true);
        return cb(new Error("Only image uploads are allowed"));
      }
    });
  }

  async function uploadImage(file, folder, prefix) {
    const publicId = `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const result = await uploadBuffer(file.buffer, {
      folder,
      public_id: publicId,
      resource_type: "image"
    });
    return result.secure_url || result.url;
  }

  const uploadMajor = makeUpload(majorsUploadDir, "major");
  const uploadPost = makeUpload(postsUploadDir, "post");
  const uploadCareer = makeUpload(careersUploadDir, "career");

  router.post("/uploads/major-image", uploadMajor.single("file"), async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "Missing file" });
    let url = "";
    if (useCloudinary) {
      url = await uploadImage(req.file, "knowyourself/majors", "major");
    } else {
      url = `/uploads/majors/${req.file.filename}`;
    }
    res.status(201).json({ url });
  });

  router.post("/uploads/post-image", uploadPost.single("file"), async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "Missing file" });
    let url = "";
    if (useCloudinary) {
      url = await uploadImage(req.file, "knowyourself/posts", "post");
    } else {
      url = `/uploads/posts/${req.file.filename}`;
    }
    res.status(201).json({ url });
  });

  router.post("/uploads/career-image", uploadCareer.single("file"), async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "Missing file" });
    let url = "";
    if (useCloudinary) {
      url = await uploadImage(req.file, "knowyourself/careers", "career");
    } else {
      url = `/uploads/careers/${req.file.filename}`;
    }
    res.status(201).json({ url });
  });
} else {
  router.post("/uploads/major-image", async (_req, res) => {
    res.status(501).json({
      message:
        "Upload feature not installed. Run `npm install` in server/ to install dependencies (multer), or set Image URL manually."
    });
  });

  router.post("/uploads/post-image", async (_req, res) => {
    res.status(501).json({
      message:
        "Upload feature not installed. Run `npm install` in server/ to install dependencies (multer), or set Image URL manually."
    });
  });

  router.post("/uploads/career-image", async (_req, res) => {
    res.status(501).json({
      message:
        "Upload feature not installed. Run `npm install` in server/ to install dependencies (multer), or set Image URL manually."
    });
  });
}
// --- Users ---
router.get("/users", async (_req, res) => {
  const users = await User.find({})
    .sort({ createdAt: -1 })
    .select("_id name email role createdAt");
  res.json({ users });
});

router.post("/users", async (req, res) => {
  const body = req.body || {};
  const name = String(body.name || "").trim();
  const email = String(body.email || "").toLowerCase().trim();
  const password = String(body.password || "").trim();
  const role = body.role === "admin" ? "admin" : "student";

  if (!name || !email || !password) {
    return res.status(400).json({ message: "name, email, password are required" });
  }

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: "Email already used" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash, role });
  res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

router.put("/users/:id", async (req, res) => {
  const body = req.body || {};
  const update = {};

  if (body.name !== undefined) update.name = String(body.name || "").trim();
  if (body.role !== undefined) update.role = body.role === "admin" ? "admin" : "student";

  if (body.password !== undefined) {
    const pwd = String(body.password || "").trim();
    if (pwd.length < 6) return res.status(400).json({ message: "password must be at least 6 characters" });
    update.passwordHash = await bcrypt.hash(pwd, 10);
  }

  const meId = String(req.user?.sub || "");
  if (meId && String(req.params.id) === meId && update.role && update.role !== "admin") {
    return res.status(400).json({ message: "You cannot remove your own admin role" });
  }

  const user = await User.findByIdAndUpdate(req.params.id, update, { new: true }).select(
    "_id name email role createdAt"
  );
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ user });
});

router.delete("/users/:id", async (req, res) => {
  const meId = String(req.user?.sub || "");
  if (meId && String(req.params.id) === meId) {
    return res.status(400).json({ message: "You cannot delete your own user" });
  }

  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ ok: true });
});

// --- Majors ---
router.get("/majors", async (_req, res) => {
  const majors = await Major.find({}).sort({ createdAt: -1 });
  res.json({ majors });
});

router.post("/majors", async (req, res) => {
  const body = req.body || {};
  const slug = normalizeSlug(body.slug || body.title);
  if (!slug) return res.status(400).json({ message: "slug or title is required" });
  if (!body.title) return res.status(400).json({ message: "title is required" });

  const major = await Major.create({
    slug,
    title: String(body.title),
    titleKm: String(body.titleKm || ""),
    description: String(body.description || ""),
    descriptionKm: String(body.descriptionKm || ""),
    imageUrl: String(body.imageUrl || ""),
    skills: parseCsv(body.skills),
    skillsKm: parseCsv(body.skillsKm),
    careers: parseCsv(body.careers),
    careersKm: parseCsv(body.careersKm)
  });
  res.status(201).json({ major });
});

router.put("/majors/:id", async (req, res) => {
  const body = req.body || {};
  const update = {
    ...(body.slug ? { slug: normalizeSlug(body.slug) } : {}),
    ...(body.title !== undefined ? { title: String(body.title) } : {}),
    ...(body.titleKm !== undefined ? { titleKm: String(body.titleKm) } : {}),
    ...(body.description !== undefined ? { description: String(body.description) } : {}),
    ...(body.descriptionKm !== undefined ? { descriptionKm: String(body.descriptionKm) } : {}),
    ...(body.imageUrl !== undefined ? { imageUrl: String(body.imageUrl) } : {}),
    ...(body.skills !== undefined ? { skills: parseCsv(body.skills) } : {}),
    ...(body.skillsKm !== undefined ? { skillsKm: parseCsv(body.skillsKm) } : {}),
    ...(body.careers !== undefined ? { careers: parseCsv(body.careers) } : {}),
    ...(body.careersKm !== undefined ? { careersKm: parseCsv(body.careersKm) } : {})
  };

  const major = await Major.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!major) return res.status(404).json({ message: "Major not found" });
  res.json({ major });
});

router.delete("/majors/:id", async (req, res) => {
  const major = await Major.findByIdAndDelete(req.params.id);
  if (!major) return res.status(404).json({ message: "Major not found" });
  res.json({ ok: true });
});

// --- Careers ---
router.get("/careers", async (_req, res) => {
  const careers = await Career.find({}).sort({ createdAt: -1 });
  res.json({ careers });
});

router.post("/careers", async (req, res) => {
  const body = req.body || {};
  const slug = normalizeSlug(body.slug || body.title);
  if (!slug) return res.status(400).json({ message: "slug or title is required" });
  if (!body.title) return res.status(400).json({ message: "title is required" });

  const roadmap = Array.isArray(body.roadmap) ? body.roadmap : [];
  const career = await Career.create({
    slug,
    title: String(body.title),
    titleKm: String(body.titleKm || ""),
    description: String(body.description || ""),
    descriptionKm: String(body.descriptionKm || ""),
    imageUrl: String(body.imageUrl || ""),
    skills: parseCsv(body.skills),
    skillsKm: parseCsv(body.skillsKm),
    roadmap: roadmap.map((r) => ({
      step: String(r.step || ""),
      stepKm: String(r.stepKm || ""),
      details: String(r.details || ""),
      detailsKm: String(r.detailsKm || "")
    }))
  });

  res.status(201).json({ career });
});

router.put("/careers/:id", async (req, res) => {
  const body = req.body || {};
  const update = {
    ...(body.slug ? { slug: normalizeSlug(body.slug) } : {}),
    ...(body.title !== undefined ? { title: String(body.title) } : {}),
    ...(body.titleKm !== undefined ? { titleKm: String(body.titleKm) } : {}),
    ...(body.description !== undefined ? { description: String(body.description) } : {}),
    ...(body.descriptionKm !== undefined ? { descriptionKm: String(body.descriptionKm) } : {}),
    ...(body.imageUrl !== undefined ? { imageUrl: String(body.imageUrl) } : {}),
    ...(body.skills !== undefined ? { skills: parseCsv(body.skills) } : {}),
    ...(body.skillsKm !== undefined ? { skillsKm: parseCsv(body.skillsKm) } : {})
  };

  if (body.roadmap !== undefined) {
    const roadmap = Array.isArray(body.roadmap) ? body.roadmap : [];
    update.roadmap = roadmap.map((r) => ({
      step: String(r.step || ""),
      stepKm: String(r.stepKm || ""),
      details: String(r.details || ""),
      detailsKm: String(r.detailsKm || "")
    }));
  }

  const career = await Career.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!career) return res.status(404).json({ message: "Career not found" });
  res.json({ career });
});

router.delete("/careers/:id", async (req, res) => {
  const career = await Career.findByIdAndDelete(req.params.id);
  if (!career) return res.status(404).json({ message: "Career not found" });
  res.json({ ok: true });
});

// --- Posts ---
router.get("/posts", async (_req, res) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });
  res.json({ posts });
});

router.post("/posts", async (req, res) => {
  const body = req.body || {};
  const slug = normalizeSlug(body.slug || body.title);
  if (!slug) return res.status(400).json({ message: "slug or title is required" });
  if (!body.title) return res.status(400).json({ message: "title is required" });

  const post = await Post.create({
    slug,
    title: String(body.title),
    titleKm: String(body.titleKm || ""),
    excerpt: String(body.excerpt || ""),
    excerptKm: String(body.excerptKm || ""),
    content: String(body.content || ""),
    contentKm: String(body.contentKm || ""),
    coverImageUrl: String(body.coverImageUrl || ""),
    tags: parseCsv(body.tags)
  });
  res.status(201).json({ post });
});

router.put("/posts/:id", async (req, res) => {
  const body = req.body || {};
  const update = {
    ...(body.slug ? { slug: normalizeSlug(body.slug) } : {}),
    ...(body.title !== undefined ? { title: String(body.title) } : {}),
    ...(body.titleKm !== undefined ? { titleKm: String(body.titleKm) } : {}),
    ...(body.excerpt !== undefined ? { excerpt: String(body.excerpt) } : {}),
    ...(body.excerptKm !== undefined ? { excerptKm: String(body.excerptKm) } : {}),
    ...(body.content !== undefined ? { content: String(body.content) } : {}),
    ...(body.contentKm !== undefined ? { contentKm: String(body.contentKm) } : {}),
    ...(body.coverImageUrl !== undefined ? { coverImageUrl: String(body.coverImageUrl) } : {}),
    ...(body.tags !== undefined ? { tags: parseCsv(body.tags) } : {})
  };

  const post = await Post.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json({ post });
});

router.delete("/posts/:id", async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json({ ok: true });
});

// --- Videos ---
router.get("/videos", async (_req, res) => {
  const videos = await Video.find({}).sort({ createdAt: -1 });
  res.json({ videos });
});

router.post("/videos", async (req, res) => {
  const body = req.body || {};
  const slug = normalizeSlug(body.slug || body.title);
  if (!slug) return res.status(400).json({ message: "slug or title is required" });
  if (!body.title) return res.status(400).json({ message: "title is required" });
  if (!body.url) return res.status(400).json({ message: "url is required" });

  const video = await Video.create({
    slug,
    title: String(body.title),
    titleKm: String(body.titleKm || ""),
    description: String(body.description || ""),
    descriptionKm: String(body.descriptionKm || ""),
    url: String(body.url),
    tags: parseCsv(body.tags)
  });
  res.status(201).json({ video });
});

router.put("/videos/:id", async (req, res) => {
  const body = req.body || {};
  const update = {
    ...(body.slug ? { slug: normalizeSlug(body.slug) } : {}),
    ...(body.title !== undefined ? { title: String(body.title) } : {}),
    ...(body.titleKm !== undefined ? { titleKm: String(body.titleKm) } : {}),
    ...(body.description !== undefined ? { description: String(body.description) } : {}),
    ...(body.descriptionKm !== undefined ? { descriptionKm: String(body.descriptionKm) } : {}),
    ...(body.url !== undefined ? { url: String(body.url) } : {}),
    ...(body.tags !== undefined ? { tags: parseCsv(body.tags) } : {})
  };

  const video = await Video.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!video) return res.status(404).json({ message: "Video not found" });
  res.json({ video });
});

router.delete("/videos/:id", async (req, res) => {
  const video = await Video.findByIdAndDelete(req.params.id);
  if (!video) return res.status(404).json({ message: "Video not found" });
  res.json({ ok: true });
});

// --- Experiences (moderation) ---
router.get("/experiences", async (_req, res) => {
  const experiences = await Experience.find({})
    .sort({ createdAt: -1 })
    .populate("author", "name email")
    .select("title body difficulty tags author createdAt");
  res.json({ experiences });
});

router.post("/experiences", async (req, res) => {
  const body = req.body || {};
  if (!body.title || !body.body) return res.status(400).json({ message: "title and body are required" });

  const exp = await Experience.create({
    author: req.user.sub,
    title: String(body.title),
    body: String(body.body),
    difficulty: body.difficulty ? Number(body.difficulty) : 3,
    tags: parseCsv(body.tags)
  });
  res.status(201).json({ experience: exp });
});

router.put("/experiences/:id", async (req, res) => {
  const body = req.body || {};
  const update = {
    ...(body.title !== undefined ? { title: String(body.title) } : {}),
    ...(body.body !== undefined ? { body: String(body.body) } : {}),
    ...(body.difficulty !== undefined ? { difficulty: Number(body.difficulty) } : {}),
    ...(body.tags !== undefined ? { tags: parseCsv(body.tags) } : {})
  };

  const exp = await Experience.findByIdAndUpdate(req.params.id, update, { new: true })
    .populate("author", "name email")
    .select("title body difficulty tags author createdAt");
  if (!exp) return res.status(404).json({ message: "Experience not found" });
  res.json({ experience: exp });
});

router.delete("/experiences/:id", async (req, res) => {
  const exp = await Experience.findByIdAndDelete(req.params.id);
  if (!exp) return res.status(404).json({ message: "Experience not found" });
  res.json({ ok: true });
});

module.exports = router;





