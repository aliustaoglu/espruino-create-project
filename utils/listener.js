const stdin = process.openStdin();

module.exports = {
  createListener: () => {
    return new Promise((resolve, reject) => {
      const l = stdin.addListener('data', data => {
        resolve(data.toString());
      });
    });
  }
};
