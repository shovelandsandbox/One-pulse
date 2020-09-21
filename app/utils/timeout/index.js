const TIMEOUT = 1800000;
class TimeoutLinstener {
  constructor() {
    this.timer = null;
    this.interval = null;
  }

  start(callback) {
    this.timer = new Date().getTime();
    this.interval = setInterval(() => {
      if (new Date().getTime() - this.timer >= TIMEOUT) {
        callback();
      }
    }, 20000);
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
  }

  reStart() {
    this.timer = new Date().getTime();
  }
}

export default new TimeoutLinstener();
