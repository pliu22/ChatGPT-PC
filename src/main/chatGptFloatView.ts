import { BrowserWindow, screen }  from 'electron'
const path = require('path')
declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;


export default function createGPTFloatWindow() {
  let gptFloatWindow:  BrowserWindow | null //悬浮球
  gptFloatWindow = new BrowserWindow({
      width: 300, 
      height: 450,
      frame: false,   //要创建无边框窗口
      alwaysOnTop: true,  //窗口是否总是显示在其他窗口之前
      webPreferences: {
        webviewTag: true,
        // nodeIntegration: true, //是否集成node
        // contextIsolation: true, //是否上下文隔离
        preload: path.join(__dirname, './preload.js') // 通过预加载将 electron 中的一些 node 的API挂载到window对象上
      }
  });
  //通过获取用户屏幕的宽高来设置悬浮球的初始位置
  const { left, top } = { left: screen.getPrimaryDisplay().workAreaSize.width - 300, top: 100}
  gptFloatWindow.setPosition(left, top, true) //设置悬浮球位置



  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    gptFloatWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL + '/gptFloat');
  } else {
    gptFloatWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    ).then(() => {
      // TODO finish the router.js and the preload.js
      // send the msg that neet to load gptFloatWindow
      gptFloatWindow?.webContents.send('gptFloatWindow', true)
    })
  }

  gptFloatWindow.once('ready-to-show', () => {
    gptFloatWindow!.show()
  });

  gptFloatWindow.on('close', (e) => {
    gptFloatWindow?.hide()
    e.preventDefault()
  })

  gptFloatWindow.webContents.openDevTools();

  return gptFloatWindow
}
