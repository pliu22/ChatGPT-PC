export interface ConfigModel {
    chatGPT: {
        auth: {
            apikey: string
        },
        propts: {
            name: string
            value: string
            isNeedSend: boolean
        }[]
    },
    proxy: {
        host: string
        port: number
    }
}

export interface SystemModel {
    theme?: string
}