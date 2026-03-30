const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Controllers
const projectController = require("../controllers/projectController");
const skillController = require("../controllers/skillController");
const contactController = require("../controllers/contactController");

// ── Health Check ─────────────────────────────────────────────
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 API is up and running!",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// ── DB Test ───────────────────────────────────────────────────
router.get("/db-test", async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    res
      .status(200)
      .json({ success: true, message: "✅ DB healthy", data: rows[0] });
  } catch (err) {
    // Pass to global error handler
    next(err);
  }
});

// ── MVC Routes ────────────────────────────────────────────────
router.get("/projects", projectController.getProjects);
router.get("/skills", skillController.getSkills);
router.post("/contact", contactController.submitContactForm);

module.exports = router;
