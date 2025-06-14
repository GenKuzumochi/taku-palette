import jQuery from 'jquery'



export async function getYtsheetDx(url: string) {
    const u = new URL(url)
    u.searchParams.set("mode", "json")
    return await fetch("/api/ytsheet?src=" + encodeURIComponent(u.href)).then(x => x.json())
}

export function createYtsheetDx(data: any, url: string) {
    let str = ""
    for( let i = 1 ; ; i++){
        const name = data.value[`effect${i}Name`] ?? "";
        const note = data.value[`effect${i}Note`]  ?? "";
        const lv = data.value[`effect${i}Lv`] ?? "";
        const fclty = data.value[`effect${i}Dfclty`] ?? "";
        const range = data.value[`effect${i}Range`] ?? "";
        const restrict = data.value[`effect${i}Restrict`] ?? "";
        const skill = data.value[`effect${i}Skill`] ?? "";
        const target = data.value[`effect${i}Target`] ?? "";
        const timing = data.value[`effect${i}Timing`] ?? "";
        const encroach = data.value[`effect${i}Encroach`] ?? "";
        str += `${name}/${lv}Lv/${timing}/${skill}/${fclty}/${range}/${target}/${encroach}/${restrict}/ ${note}\n`
        str += {}
        str += `:侵蝕+${encroach} ${name}\n`
        if(!name) break;
    }
    return { commands: str , koma: str};
}