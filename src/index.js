import * as Service from './service.js';
import * as Common from './lib/common.js';

const API = {
  go,                   // start app launch sequence
  stop,                 // kill app, cleanup, and exit (after async jobs parameter completes)
  say,                  // say something to console (throws if console closed)

  ui : {
    open,               // open UI window
    close,              // close UI window
    move,               // move UI window (throws if no window open)
    size,               // size UI window (throws if no window open)
    minimize,           // minimize UI window (throws if no window open)
    maximize,           // maximize UI window (throws if no window open)
    fullscreen,         // UI window to fullscreen
    partscreen,         // UI window to part of screen
  },

  control: {
    send,               // send a DevTools command (throws if ui not connected yet)
    on,                 // start listening for a DevTools event (throws if ui not connected yet)
    off,                // stop listening for a DevTools event (throws if ui not connected yet)
  },

  util: {
    sleep: Common.sleep
  }
};

export default API;

let App;

// basic functions
  async function go() {
    App = await Service.go();
    //Common.DEBUG && console.log({App});
    return App;
  }

  async function stop() {
    if ( !App ) {
      throw new TypeError(`stop can only be called if App has started and is not already stopped.`);
    }

    await App.killService();
  }

  function say(msg) {
    return App.notify(msg, null, {}, e => {
      Common.DEBUG && console.info("say.App.notify", e);
      throw new TypeError(`Cannot say a console message because App Console has already closed.`);
    });
  }

async function open() {
  const {ServicePort} = App;
  const sessionId = App.newSessionId();
  let browser, UI;
  try {
    ({UI,browser} = await Service.newBrowser({ServicePort, sessionId}));
  } catch(e) {
    console.log("open", e);
  }
  return {UI,browser};
}

async function close(UI = App.UI) {
  return await UI.send("Browser.close", {}); 
}

async function move({x,y}, UI = App.UI) {
  UI.x = x;
  UI.y = y;
  return await UI.send("Browser.setWindowBounds", {
    windowId: UI.windowId,
    bounds: {
      left: x,
      top: y
    }
  });
}

async function size({width,height}, UI = App.UI) {
  UI.width = width;
  UI.height = height;
  await UI.send("Emulation.setDeviceMetricsOverride", {
		mobile: false,
		width,
		height,
		deviceScaleFactor: 1,
		screenOrientation: {
      angle: 0,
      type: 'portraitPrimary'
    },
  });
  return await UI.send("Browser.setWindowBounds", {
    windowId: UI.windowId,
    bounds: {
      width,
      height: height+85
    }
  });
}

async function minimize(UI = App.UI) {
  if ( UI.windowState == 'minimized' ) return;
  const result = await UI.send("Browser.setWindowBounds", {
    windowId: UI.windowId,
    bounds: {
      windowState: 'minimized'
    }
  });
  UI.windowState = 'minimized';
  return result;
}

async function maximize(UI = App.UI) {
  if ( UI.windowState == 'maximized' ) return;
  const result = await UI.send("Browser.setWindowBounds", {
    windowId: UI.windowId,
    bounds: {
      windowState: 'maximized'
    }
  });
  UI.windowState = 'maximized';
  return result;
}

async function fullscreen(UI = App.UI) {
  if ( UI.windowState == 'fullscreen' ) return;
  const result = await UI.send("Browser.setWindowBounds", {
    windowId: UI.windowId,
    bounds: {
      windowState: 'fullscreen'
    }
  });
  UI.windowState = 'fullscreen';
  return result;
}

async function partscreen(UI = App.UI) {
  if ( UI.windowState == 'normal' ) return;
  const result = await UI.send("Browser.setWindowBounds", {
    windowId: UI.windowId,
    bounds: {
      windowState: 'normal'
    }
  });
  UI.windowState = 'normal';
  return result;
}

async function send(command, params, UI = App.UI) {
  return await UI.send(command, params);
}

async function on(eventName, handler, UI = App.UI) {
  return await UI.on(eventName, handler);
}

function off() {
  throw new TypeError(`off is not implemented yet...`);
}