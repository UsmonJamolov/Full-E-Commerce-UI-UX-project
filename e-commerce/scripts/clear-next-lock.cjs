const fs = require("fs");
const path = require("path");

const lockPath = path.join(process.cwd(), ".next", "dev", "lock");
if (fs.existsSync(lockPath)) {
  fs.unlinkSync(lockPath);
  console.log("[clear-next-lock] Removed .next/dev/lock (stale or leftover).");
} else {
  console.log("[clear-next-lock] No lock file; nothing to remove.");
}
