import './app'
import './index.css';

// @ts-ignore
window.electronAPI.onLoadUserSetting((event, value) => {
    window.localStorage.setItem('userSetting', JSON.stringify(value))
    event.sender.send('loaded-user-setting', 'ok')
})