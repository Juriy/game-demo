const createCooldown = (delay) => {
  let lastUpdateTime = 0;

  // if cooled down - resets the timer
  // and returns true, otherwise - false
  return () => {
    if (Date.now() - lastUpdateTime > delay) {
      lastUpdateTime = Date.now();
      return true;
    }
    return false;
  };

};

module.exports = createCooldown;
