const callsites = require("callsites");

var Handlebars = require("handlebars");

const fs = require("fs");
const path = require("path");

Handlebars.registerHelper("querify", object => {
  return JSON.stringify(object).replace(/"/g, "");
});

Handlebars.registerHelper("JSONStringify", object => {
  return JSON.stringify(object);
});

Handlebars.registerHelper("toLowerCase", str => {
  return str.toLowerCase();
});

/**
 *
 * @param {*} pathToTemplate
 * @param {*} context
 * @param {*} callsiteDepth to resolve the file relative to where the path is.
 *                          Generally it should be 1 since that's the caller but if it's called above that
 *                          we resolve the relative file path where it's referenced.
 */
function jsonFromTemplate(pathToTemplate, context, callsiteDepth=1) {
  const pathToCallerTemplate = path.resolve(
    path.dirname(callsites()[callsiteDepth].getFileName()),
    pathToTemplate
  );
  const source = fs.readFileSync(pathToCallerTemplate, "utf8");
  const template = Handlebars.compile(source);
  return JSON.parse(template(context));
}

/**
 * Takes an object like:
 * {
 *   env: production,
 *   app: customer-app
 * }
 * and returns this:
 *   env:production,app:customer-app
 * @param {*} scope
 */
function generateTaggedData(scope) {
  var tags = []

  for (const key in scope) {
    tags.push(`${key}:${scope[key]}`)
  }
  return tags.join(',')
}

module.exports = {
  jsonFromTemplate,
  generateTaggedData
};
