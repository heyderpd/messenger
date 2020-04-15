import { time, decrypt } from './utils'

const getSynth = _ => window.speechSynthesis

const getPTBR = synth => synth.getVoices().filter(v => v.lang === 'pt-BR').pop()

const getMessage = _ => {
    const message = decrypt(window.location.search.replace('?',''))
    const hasMessage = message && message.length > 0
    if (!hasMessage) {
        throw Error("don't has message")
    }
    return new SpeechSynthesisUtterance(message)
}

const setVoice = (message, voice) => message.voice = voice

const speak = (synth, message) => synth.speak(message)

const tryTalk = async _ => {
    try {
        await time(500)
        const message = getMessage()
        const synth = getSynth()
        await time(5)
        const voice = getPTBR(synth)
        setVoice(message, voice)
        speak(synth, message)
    } catch (err) {
        console.error(err)
    }
}

export default tryTalk
