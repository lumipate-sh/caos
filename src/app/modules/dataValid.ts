


export const URL_FORMAT = /(https:\/\/|http:\/\/)?([a-zA-Z0-9]*[\.])?([-a-zA-Z0-9]*[\.][a-zA-Z]*)(\/[-\._a-zA-Z0-9]*)*/g;
export const EMAIL_FORMAT = /([-_\.\+a-zA-Z0-9]*)@([-a-zA-Z0-9]*[\.][a-zA-Z]*)/g;





export function isValidURL(url: string): boolean {
    return URL_FORMAT.test(url.trim())
}

export function isValidEmail(email: string): boolean {
    return EMAIL_FORMAT.test(email.trim())
}


// see if possible to improve according to https://www.webdevtutor.net/blog/typescript-type-with-regex

