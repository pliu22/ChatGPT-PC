import fetch from "node-fetch";

export const getOnlinePrompts = async () => {
    const res = await fetch('https://api.github.com/repos/pliu22/Beyond-ChatGPT-Prompts/contents/prompts.json')
    const data = await res.json() as any
    return Buffer.from(data.content, 'base64').toString('utf-8');
}
