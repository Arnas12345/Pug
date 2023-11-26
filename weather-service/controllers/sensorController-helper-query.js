import dayjs from "dayjs";

const parseQueryParams = (reqQuery) => {
  return {
    sensorIds: getSensorIds(reqQuery?.sensorIds),
    metrics: getMetrics(reqQuery?.metrics),
    statistic: getStatistic(reqQuery?.statistic),
    dateRange: getDateRange(reqQuery?.dateRange),
  };
};

const getSensorIds = (sensorIds) => {
  const sensorIdsArray = sensorIds?.split(",");
  const sensorIdsNumbers = sensorIdsArray?.map((id) => parseInt(id));
  const areSensorIdsNumbers = sensorIdsNumbers.every((id) =>
    Number.isFinite(id)
  );
  if (!areSensorIdsNumbers) {
    throw new Error("SensorIds should be an array of numbers");
  }
  return sensorIds;
};

const getMetrics = (metrics) => {
  const definedMetrics = {
    temperature: "temperature",
    humidity: "humidity",
    windSpeed: "windSpeed",
  };
  const metricsArray = metrics?.split(",");
  metricsArray.forEach((metric) => {
    if (!definedMetrics.hasOwnProperty(metric)) {
      throw new Error("Invalid metrics provided");
    }
  });
  return metricsArray;
};

const getStatistic = (statistic) => {
  const definedStatistics = {
    average: "AVG",
    min: "MIN",
    max: "MAX",
    sum: "SUM",
  };
  if (!definedStatistics.hasOwnProperty(statistic)) {
    throw new Error("Invalid statistic provided");
  }
  return definedStatistics[statistic];
};

const getDateRange = (dateRange) => {
  const numberOfDays = parseInt(dateRange);
  if (!Number.isFinite(numberOfDays)) {
    throw new Error("Invalid dateRange provided");
  }
  const dateRangeTimestamp = dayjs().subtract(numberOfDays, "day").valueOf();
  return dateRangeTimestamp;
};

export { parseQueryParams };
