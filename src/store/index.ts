import Store from 'electron-store'
import defalutSetting from './defalutSetting.json'
import { ConfigModel } from './model'

const store = new Store();

export function getUserSetting() {
    const user = store.get('user')
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

module.exports = {
    getUserSetting
}