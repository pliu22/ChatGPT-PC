import { app, BrowserWindow, globalShortcut, Tray, Menu } from "electron";
import path from "path";
import { Rpc } from "./rpc/rpc.ts";
import createGPTFloatWindow from "./main/chatGptFloatView.ts";
declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

// mainWindow
let mainWindow: BrowserWindow | null = null;

// tray
let tray: Tray | null = null;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, "logo.png"),
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
      webviewTag: true,
    },
  });

  // 点击关闭时隐藏窗口而不是退出
  mainWindow.on("close", (event) => {
    if (mainWindow?.isVisible()) {
      mainWindow?.hide();
      event.preventDefault();
    }
  });

  // tray
  tray = new Tray(path.join(__dirname, "logo.png"));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "打开主界面",
      click: () => {
        mainWindow?.show();
      },
    },
    {
      label: "退出",
      click: () => {
        mainWindow?.destroy();
        floatWindow?.destroy();
        app.quit();
      },
    },
  ]);
  tray.setContextMenu(contextMenu);
  tray.setToolTip("ChatGPT Desktop");
  tray.on("click", () => {
    mainWindow?.show();
  });

  // macOS
  if (process.platform === "darwin") {
    app.dock.setIcon(path.join(__dirname, "logo.png"));
  }

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    )
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // clear menubar
  mainWindow.setMenuBarVisibility(false);

  // rpc
  const rpc = new Rpc(mainWindow);

  // ready-to-show life
  mainWindow.once("ready-to-show", () => {
    rpc.loadUserSetting();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);
// InstanceLock
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (_event, _commandLine, _workingDirectory) => {
    if (mainWindow) {
      mainWindow.show();
    }
  });
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  // if (process.platform !== "darwin") {
  //   app.quit();
  // }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// floatWindow
let floatWindow: BrowserWindow | null = null;

// shortcut
app.whenReady().then(() => {
  globalShortcut.register("CommandOrControl+Shift+a", () => {
    // if (process.platform === "darwin") {
    //   app.dock.show();
    // }
    if (floatWindow) {
      floatWindow.isVisible() ? floatWindow.hide() : floatWindow.show();
    } else {
      floatWindow = createGPTFloatWindow();
      floatWindow.webContents.on("crashed", (e) => {
        console.log("crashed", e);
      });
      // floatWindow.webContents.openDevTools();
    }
  });
});

app.on("web-contents-created", (_event, contents) => {
  contents.on("will-attach-webview", (_wawevent, webPreferences, _params) => {
    if (_params.src === "https://chat.openai.com/") {
      webPreferences.contextIsolation = false;
      webPreferences.preload = path.join(__dirname, "./chatGptWebPreload.js");
    }
  });
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
