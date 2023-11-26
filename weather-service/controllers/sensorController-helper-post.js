const bodyIsValid = (...params) => params?.every(Number.isFinite);

const parsePostBody = (reqBody) => {
  const sensorId = parseFloat(reqBody?.sensorId);
  const temperature = parseFloat(reqBody?.temperature);
  const humidity = parseFloat(reqBody?.humidity);
  const windSpeed = parseFloat(reqBody?.windSpeed);

  return { sensorId, temperature, humidity, windSpeed };
};

export { parsePostBody, bodyIsValid };
