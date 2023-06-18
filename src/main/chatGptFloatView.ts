import { BrowserWindow, screen }  from 'electron'
const path = require('path')
declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;


export default function createGPTFloatWindow() {
  let gptFloatWindow:  BrowserWindow | null //悬浮球
  gptFloatWindow = new BrowserWindow({
      width: 300, 
      height: 450,
      frame: false,   
      alwaysOnTop: true,  
      webPreferences: {
        webviewTag: true,
        preload: path.join(__dirname, './preload.js') 
      }
  });
 
  const { left, top } = { left: screen.getPrimaryDisplay().workAreaSize.width - 300, top: 100}
  gptFloatWindow.setPosition(left, top, true) 



  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    gptFloatWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL).then(() => {
      gptFloatWindow?.webContents.send('router-init', 'chatGptFloat');
    }) 
  } else {
    gptFloatWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    ).then(() => {
      gptFloatWindow?.webContents.send('router-init', 'chatGptFloat');
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
