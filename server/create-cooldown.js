const createCooldown = (delay) => {

  let lastUpdateTime = 0;

  return () => {
    if (Date.now() - lastUpdateTime > delay) {
      lastUpdateTime = Date.now();
      return true;
    }

    return false;
  }

};

module.exports = createCooldown;
