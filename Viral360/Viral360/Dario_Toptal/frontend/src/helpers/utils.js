function formatNumber(n) {
  if (!n) {
    return ';'
  }
  return (Math.round(n * 100) / 100).toFixed(2).toString();
}

export {
  formatNumber,
};
