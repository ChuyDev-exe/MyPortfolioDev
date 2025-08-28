function appendForwardSlash(path) {
  return path.endsWith("/") ? path : path + "/";
}
function prependForwardSlash(path) {
  return path[0] === "/" ? path : "/" + path;
}
function removeTrailingForwardSlash(path) {
  return path.endsWith("/") ? path.slice(0, path.length - 1) : path;
}
const URL_PROTOCOL_REGEX = /^(?:(?:http|ftp|https|ws):?\/\/|\/\/)/;
function isRemotePath(src) {
  return URL_PROTOCOL_REGEX.test(src) || src.startsWith("data:");
}
function removeBase(path, base) {
  if (path.startsWith(base)) {
    return path.slice(removeTrailingForwardSlash(base).length);
  }
  return path;
}

export { appendForwardSlash as a, removeBase as b, isRemotePath as i, prependForwardSlash as p, removeTrailingForwardSlash as r };
