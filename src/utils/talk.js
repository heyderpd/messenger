import { time, getMessageFromURL } from './utils'

const config = {
    voice: null,
    synth: null,
}

const getSynth = _ => window.speechSynthesis

const getPTBR = _ => config.synth.getVoices().filter(v => v.lang === 'pt-BR').pop()

const getSpeech = _ => {
    const msg = getMessageFromURL()
    if (msg === '') {
        throw Error("don't has message")
    }
    return new SpeechSynthesisUtterance(msg)
}

const setVoice = message => message.voice = config.voice

const speak = msg => config.synth.speak(msg)

export const tryTalk = async (onlyMount = false) => {
    try {
        if (config.synth == null) {
            config.synth = getSynth()
            await time(50)
            config.voice = getPTBR()
            if (onlyMount) {
                console.info('ready')
                return
            }
        }
        const message = getSpeech()
        setVoice(message)
        speak(message)
        console.info('talking')
    } catch (err) {
        console.error(err)
    }
}
