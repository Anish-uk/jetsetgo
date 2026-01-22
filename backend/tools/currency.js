const EUR_TO_INR = 90; // approx rate (can later make dynamic)

function convertEURtoINR(amount) {
  return Math.round(amount * EUR_TO_INR);
}

module.exports = { convertEURtoINR };
