let timer = null;

self.onmessage = function (e) {
  const { type, interval, utValue } = e.data;

  if (type === 'start' && utValue) {
    self.postMessage({ type: 'heartbeat', value: utValue });
    timer = self.setInterval(() => {
      self.postMessage({ type: 'heartbeat', value: utValue });
    }, interval);
  } else if (type === 'stop') {
    if (timer !== null) {
      self.clearInterval(timer);
      timer = null;
    }
  }
};