export const time = time => new Promise(resolve => setTimeout(resolve, time))

export const crypt = msg => btoa(msg)

export const decrypt = msg => atob(msg)

export const setMessageOnURL = msg => {
    const message = crypt(msg)
    window.history.pushState('', '', `/?${message}`)
}

export const getMessageFromURL = _ => {
    try {
        const message = decrypt(window.location.search.replace('?',''))
        const hasMessage = message && message.length > 0
        return hasMessage
            ? message
            : ''

    } catch (err) {
        return ''
    }
}

export const copyLink = link => {
    try {
        const elm = document.getElementById('link')
        elm.value = `${window.location.origin}/messenger/?${link}`
        elm.select()
        const result = document.execCommand('copy')

    } catch (err) {
        console.error(err)
    }
}
