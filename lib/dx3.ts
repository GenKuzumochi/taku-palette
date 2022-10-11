import jQuery from 'jquery'

export function getMar(url: string) {
    return new Promise((resolve, reject) => {
        const key = new URL(url).searchParams.get("key");
        jQuery.getJSON(`https://character-sheets.appspot.com/mar/display?ajax=1&key=${key}&callback=?`).done(
            (x: any) => resolve(x)
        ).fail((x: any) => reject(x))
    })
}

export async function getYtsheetDx(url: string) {
    const u = new URL(url)
    u.searchParams.set("mode", "json")
    return await fetch("/api/ytsheet?src=" + decodeURIComponent(u.href)).then(x => x.json())
}