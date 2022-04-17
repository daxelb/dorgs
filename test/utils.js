export function allEqual(source, target) {
  if (!(Array.isArray(source) && Array.isArray(target))) return false;
  if (source.length != target.length) return false;
  for (let i = 0; i < source.length; i++) if (source[i] != target[i]) return false;
  return true;
}
