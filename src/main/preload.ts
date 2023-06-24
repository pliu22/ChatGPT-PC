import { contextBridge, ipcRenderer } from 'electron'


console.log("->>>", contextBridge)

contextBridge.exposeInMainWorld('electronAPI', {
    onLoadUserSetting: () => ipcRenderer.invoke('load-user-setting'),
    saveUserSetting: (data: any) => ipcRenderer.send('save-user-setting', data),
    onRouterInit: (callback: any) => ipcRenderer.on('router-init', callback),
    saveSystemSetting: (data: any) => ipcRenderer.send('save-system-setting', data),
    getSystemSetting: () => ipcRenderer.invoke('get-system-setting'),
})

