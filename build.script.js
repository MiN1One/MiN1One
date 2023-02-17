const childProcess = require('child_process');

const executeScript = async (command) => {
  if (!command) return;
  return new Promise((resolve, reject) => {
    const child = childProcess.exec(command, (err => {
      if (err) {
        reject(err);
      }
      resolve(command);
    }));
    child.stdout.on('data', (data) => {
      console.log(`[${command.toUpperCase()}]:` + data);
    });
    child.stdin.end();
  });
};

(async () => {
  try {
    await executeScript('yarn start:build');
    await executeScript('yarn prebuild');
    await executeScript('yarn build:server');
  } catch (er) {
    console.log(er);
    process.exit(1);
  }
})();