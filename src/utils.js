/**
 * Capitalize a string.
 * @param {string} arg
 * @returns {string}
 */
function capitalize (arg) {
  return arg.charAt(0).toUpperCase() + arg.slice(1);
}

/**
 * Get the classname of arg.
 * @param {object} arg
 * @returns {string}
 */
function getClassname (arg) {
  return Object.prototype.toString.call(arg).slice(8, -1);
}

/**
 * Get the typeof of arg.
 * @param {any} arg
 * @returns {string}
 */
function getTypeof (arg) {
  return typeof arg;
}

module.exports = {
  capitalize,
  getClassname,
  getTypeof
};
