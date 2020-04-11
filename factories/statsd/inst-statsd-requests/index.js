const Templates = require("../../../lib/templates");
const DatadogGraph = require("../../../datadog_graph");

class InstStatsdRequestsGraphFactory {
  constructor() {}

  /**
   * Creates an instance count timeseries
   * @param {object} metricPrefix - should be something like `request`
   * @param {object} scope
   */
  requestTimes(metricPrefix, scope) {
    return new DatadogGraph("templates/requestTimes.hbs", {
      title: "Requests by Time (95%ile)",
      metricPrefix: metricPrefix,
      scope: Templates.generateTaggedData(scope),
    });
  }

  /**
   * Creates a query value for request times
   * @param {object} metricPrefix - should be something like `request`
   * @param {object} scope
   */
  requestTimesValue(metricPrefix, scope) {
    return new DatadogGraph("templates/requestTimesValue.hbs", {
      title: "Requests by Time (95%ile)",
      metricPrefix: metricPrefix,
      scope: Templates.generateTaggedData(scope),
    });
  }
}

module.exports = InstStatsdRequestsGraphFactory;
