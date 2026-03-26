const RESOURCES = ["stats", "majors", "careers", "posts", "videos", "experiences", "users"];
const ACTIONS = ["read", "write"];
const PERMISSIONS = RESOURCES.flatMap((resource) => ACTIONS.map((action) => `${resource}:${action}`));
const PERMISSION_SET = new Set(PERMISSIONS);

function normalizePermissions(value) {
  if (!value) return [];
  const raw = Array.isArray(value) ? value : String(value).split(",");
  const perms = raw.map((p) => String(p || "").trim()).filter(Boolean);
  return perms.filter((p, idx) => PERMISSION_SET.has(p) && perms.indexOf(p) === idx);
}

function hasPermission(list, permission) {
  if (!permission) return false;
  if (!Array.isArray(list)) return false;
  if (list.includes(permission)) return true;
  if (permission.endsWith(":read")) {
    const writePerm = permission.replace(":read", ":write");
    if (list.includes(writePerm)) return true;
  }
  return false;
}

module.exports = { RESOURCES, ACTIONS, PERMISSIONS, normalizePermissions, hasPermission };
