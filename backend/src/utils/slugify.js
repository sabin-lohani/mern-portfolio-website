export default function slugify(string = null, separator = "-") {
  if (!string) {
    return "";
  }

  // Remove spaces from the beginning and from the end of the string
  string = string.trim();

  // Lower case everything
  // using toLowerCase() with locale support for Nepali
  string = string.toLowerCase();

  // Make alphanumeric (removes all other characters)
  // this makes the string safe especially when used as a part of a URL
  // this keeps Latin characters and Nepali characters as well
  // Nepali Unicode range: \u0900-\u097F
  string = string.replace(/[^a-z0-9\u0900-\u097F\s-_]/g, "");

  // Remove multiple dashes or whitespaces
  string = string.replace(/[\s-]+/g, " ");

  // Convert whitespaces and underscore to the given separator
  string = string.replace(/[\s_]/g, separator);

  return string;
}
