import Store from 'electron-store'
import defalutSetting from './defalutSetting.json'
import { ConfigModel, SystemModel } from './model'

const store = new Store();

export function getUserSetting() {
    const user = store.get('user')
    console.log('user', user)
    if(!user) {
        store.set('user', {})
        store.set('user.customSetting', defalutSetting)
        return defalutSetting
    }
    const data = (user as any).customSetting
    if(!data) {
        store.set('user.customSetting', defalutSetting)
        return defalutSetting
    }
    return data;
}

export function setUserSetting(data: ConfigModel) {
    store.set('user.customSetting', data)
}


export function getSystemSetting() {
    const system = store.get('system')
    if(!system) {
        store.set('system', {})
        store.set('system.theme', 'dark')
        return {
            theme: 'dark'
        }
    }
    const data = (system as any).theme
    if(!data) {
        store.set('system.theme', 'dark')
        return {
            theme: 'dark'
        }
    }
    return system;
}

export function setSystemSetting(data: SystemModel) {
    store.set('system', data)
}

module.exports = {
    getUserSetting,
    getSystemSetting
}