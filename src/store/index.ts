import Store from 'electron-store'
import defalutSetting from './defalutSetting.json'
import { ConfigModel, SystemModel } from './model'
import { getOnlinePrompts } from './update';

const store = new Store();

export async function getUserSetting() {
    console.log('getUserSetting')
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
    console.log('getUserSetting2')

    // diff propmts with online
    const onlinePrompts = await getOnlinePrompts()
    const localPrompts = data.chatGPT.prompts as any[]
    console.log('online',onlinePrompts)
    JSON.parse(onlinePrompts).forEach((item: any) => {
        if(!localPrompts.find((i: any) => i.name === item.name)) {
            localPrompts.push(item)
        }
    })
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