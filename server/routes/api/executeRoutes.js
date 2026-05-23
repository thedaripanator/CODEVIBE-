// routes/api/executeRoutes.js
const express = require("express");
const { executeCode } = require("../../controller/execute/executeController");
const verifyToken = require("../../middleware/authMiddleware");

const router = express.Router();

// POST => /api/compiler/:language
// Protected: requires valid JWT token
router.post("/:language", verifyToken, executeCode);

module.exports = router;