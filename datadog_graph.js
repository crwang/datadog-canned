const Templates = require("./lib/templates");

class DatadogGraph {
  constructor(templatePath, params) {
    this.graphObject = Templates.jsonFromTemplate(templatePath, params, 2);
    this.graphObjectChained = this.graphObject;
  }

  withMarkers(markers) {
    this.graphObjectChained = this.getObjectChained()
    Object.assign(this.graphObjectChained, { markers: markers });
    return this;
  }

  withYAxis(yaxis) {
    this.graphObjectChained = this.getObjectChained()
    Object.assign(this.graphObjectChained, { yaxis: yaxis });
    return this;
  }

  getObjectChained() {
    return this.graphObjectChained || this.graphObject
  }

  getObject() {
    return this.getObjectChained()
  }

  getJson() {
    return JSON.stringify(this.getObjectChained())
  }
}

module.exports = DatadogGraph;
