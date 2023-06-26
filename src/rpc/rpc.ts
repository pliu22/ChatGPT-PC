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
  init() {
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
    ipcMain.handle('load-user-setting', async () => {
      return getUserSetting();
    })
  }
}
