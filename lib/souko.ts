import jQuery from 'jquery'

export function getMar(url: string) {
    return new Promise((resolve, reject) => {
        const key = new URL(url).searchParams.get("key");
        jQuery.getJSON(`https://character-sheets.appspot.com/mar/display?ajax=1&key=${key}&callback=?`).done(
            (x: any) => resolve(x)
        ).fail((x: any) => reject(x))
    })
}

