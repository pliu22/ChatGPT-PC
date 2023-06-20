/**
 * @file rpc.ts
 * @description Rpc between main and renderer
 */

import { ipcMain, BrowserWindow } from "electron";
import {
  getSystemSetting,
  getUserSetting,
  setSystemSetting,
  setUserSetting,
} from "../store/index.ts";

export class Rpc {
  window: BrowserWindow;
  constructor(window: BrowserWindow) {
    this.window = window;
    ipcMain.on("save-user-setting", (_event, value) => {
      // store
      setUserSetting(value);
    });
    ipcMain.on("save-system-setting", (_event, value) => {
      // store
      setSystemSetting(value);
    });
    ipcMain.handle("get-system-setting", () => {
      return getSystemSetting();
    });
  }
  loadUserSetting() {
    const data = getUserSetting();
    this.window.webContents.send("load-user-setting", data);
    ipcMain.on("loaded-user-setting", (_event, value) => {
      console.log("loaded-user-setting -> ", value); // print to node console
    });
  }
}
