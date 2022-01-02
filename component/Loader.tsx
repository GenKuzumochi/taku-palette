import { H3, Card, ControlGroup, Button, InputGroup, TextArea } from "@blueprintjs/core";
import { match } from "assert";
import { EventHandler, MouseEventHandler, SyntheticEvent, useRef, useState } from "react";
import { Character, CharacterClipboardData } from "../lib/ccfolia";
import { getMar } from "../lib/souko";
import { AppToaster, zenkana2hankana } from "../lib/utils";

function handleValueChange<T>(handler: (value: T) => void) {
    return (event: React.FormEvent<HTMLElement>) => handler(((event.target as HTMLInputElement).value as unknown) as T);
}

function createMar(data: any, url: string): CharacterClipboardData {
    const p = createMarPalette(data)
    const [_, name] = data.base.name.match(/(.+?)[\(（]/) ?? [, data.base.name]
    console.log(data)
    return {
        kind: "character",
        data: {
            name,
            memo: `${data.base.name ?? ""} ${data.base.kanaName}`,
            commands: p,
            externalUrl: url,
            status: [
                { label: "FP", max: parseInt(data.outfits.total.fp, 10), value: parseInt(data.outfits.total.fp, 10) },
                { label: "HP", max: parseInt(data.outfits.total.hp, 10), value: parseInt(data.outfits.total.hp, 10) },
                { label: "MP", max: parseInt(data.outfits.total.mp, 10), value: parseInt(data.outfits.total.mp, 10) },
                { label: zenkana2hankana(data.abl.specialpower["1st"]), max: 0, value: 1 },
                { label: zenkana2hankana(data.abl.specialpower["2nd"]), max: 0, value: 1 },
                { label: zenkana2hankana(data.abl.specialpower["3rd"]), max: 0, value: 1 },
            ]
        }
    }
}

function createMarPalette(data: any) {
    const skills = data.skills.map((s: any) => {
        const [_, val, tan] = s.cost?.match(/(\d+)(MP|HP|FP)/i) ?? []
        let res = `${s.name ?? ""} / ${s["class"] ?? ""} / ${s.type ?? ""} / ${s.target ?? ""} / ${s.timing ?? ""} / ${s.range ?? ""} / ${s.cost ?? ""} / ${s.memo ?? ""}`
        if (val && tan) {
            res += `\n:${tan.toUpperCase()}-${val} ${s.name}`
        }
        return res
    }).join("\n")
    return `//体力=${data.abl.strong.dispbonus}
//反射=${data.abl.reflex.dispbonus}
//知覚=${data.abl.sense.dispbonus}
//理知=${data.abl.intellect.dispbonus}
//意志=${data.abl.will.dispbonus}
//幸運=${data.abl.bllesing.dispbonus}
//命中=${data.outfits.total.hit}
//回避=${data.outfits.total.dodge}
//心魂=${data.outfits.total.magic}
//魂魄=${data.outfits.total.countermagic}
//行動=${data.outfits.total.action}
2d+{体力}[] 体力
2d+{反射}[] 反射
2d+{知覚}[] 知覚
2d+{理知}[] 理知
2d+{意志}[] 意志
2d+{幸運}[] 幸運
2d+{命中}[] 命中
2d+{回避}[] 回避
2d+{心魂}[] 心魂
2d+{魂魄}[] 魂魄
//---特技
${skills}
`
}

export const Loader = () => {
    const [url, setUrl] = useState("")
    const ref1 = useRef<HTMLTextAreaElement>(null)
    const [value, setValue] = useState<any>({})
    const handleInput = handleValueChange<string>(x => setUrl(x))
    const handleLoadKoma = (_: any) => {
        getMar(url).then(
            json => {
                const data = createMar(json, url)
                if(ref1.current) ref1.current.value = JSON.stringify(data)
            }
        ).catch( x => alert("エラー\n\n"+x))
    }
    const handleLoad = (_: any) => {
        getMar(url).then(
            json => {
                const data = createMar(json, url)
                if(ref1.current) ref1.current.value = data.data.commands ?? ""
            }
        ).catch( x => alert("エラー\n\n"+x))
    }
    const handleCopy = (_: any) => {
        navigator.clipboard.writeText(ref1.current?.value ?? "").then( x => {
            AppToaster?.show({message:"コピーしました"})
        }).catch( x => alert("エラー\n\n"+x))
    }
    return <Card>
        <H3>キャラクターシート倉庫のURL</H3>
        <ControlGroup fill={true} vertical={false}>
            <InputGroup placeholder="キャラクターシート倉庫" value={url} onChange={handleInput} />
            <Button icon="import" onClick={handleLoad}>チャパレ</Button>
            <Button icon="import" onClick={handleLoadKoma}>駒</Button>
        </ControlGroup>
        <TextArea inputRef={ref1} style={{width:"100%",height:"10rem"}}/>
        <Button icon="clipboard" onClick={handleCopy}>Copy</Button>
    </Card>
}

