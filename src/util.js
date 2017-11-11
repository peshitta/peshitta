export function initCap(s) {
  if (!s) {
    return s;
  }
  return s[0].toUpperCase() + s.slice(1);
}
