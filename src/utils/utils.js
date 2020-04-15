export const time = time => new Promise(resolve => setTimeout(resolve, time))

export const crypt = msg => btoa(msg)

export const decrypt = msg => atob(msg)
