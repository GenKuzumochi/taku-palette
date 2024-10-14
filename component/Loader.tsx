import {H3, Card, ControlGroup, Button, InputGroup, TextArea} from "@blueprintjs/core";
import {match} from "assert";
import {EventHandler, MouseEventHandler, SyntheticEvent, useRef, useState} from "react";
import {Character, CharacterClipboardData} from "../lib/ccfolia";
import {createYtsheetDx, getYtsheetDx} from "../lib/dx3";
import {AppToaster, zenkana2hankana} from "../lib/utils";
import {createMar, createMarPalette, getMar, MarOption} from "../lib/mar";
import {css} from "@emotion/react";
import { MarCharacter } from "../lib/marType";

function handleValueChange<T>(handler: (value: T) => void) {
    return (event: React.FormEvent<HTMLElement>) => handler(((event.target as HTMLInputElement).value as unknown) as T);
}



async function loadData(url: string, opt : MarOption) : Promise<{koma:string,commands:string}> {
    if (url.startsWith("https://character-sheets.appspot.com/mar/") || url.startsWith("http://www.character-sheets.appspot.com/mar/")) {
        return getMar(url).then(json => createMar(json as MarCharacter, url,opt))
    }else if(url.startsWith("https://yutorize.2-d.jp/ytsheet/dx3rd/")) {
        return getYtsheetDx(url).then(json => createYtsheetDx(json, url))
    }
    throw new Error("Invalid URL");
}

export const Loader = () => {
    const [url, setUrl] = useState("")
    const ref1 = useRef<HTMLTextAreaElement>(null)
    const [value, setValue] = useState<any>({})
    const [noPassive, setNoPassive] = useState<boolean>(true);
    const handleInput = handleValueChange<string>(x => setUrl(x))
    const handleLoadKoma = (_: any) => {
        loadData(url,{noPassive, slashStatus: false}).then(data => {
                if (ref1.current) ref1.current.value = data.koma || ""
            }
        ).catch(x => { console.error(x); alert("エラー\n\n" + x ) })
    }
    const handleLoad = (_: any) => {
        loadData(url,{noPassive,slashStatus:true}).then(data => {
                if (ref1.current) ref1.current.value = data.commands || ""
            }
        ).catch(x => alert("エラー\n\n" + x))
    }
    const handleCopy = (_: any) => {
        navigator.clipboard.writeText(ref1.current?.value ?? "").then(x => {
            AppToaster?.show({message: "コピーしました"})
        }
        ).catch(x => { console.error(x); alert("エラー\n\n" + x ) })
    }
    return <Card  style={{width:"100%", maxWidth: "calc( 100% - 2rem)",margin: "1rem"}}>
        <H3>URLからチャパレを生成</H3>
        <ul>
            <li>キャラクターシート倉庫(マージナルヒーローズ)</li>
            <li>ゆとシート(ダブルクロス エフェクト一覧のみ)</li>
        </ul>
        <ControlGroup fill={true} vertical={false}>
            <InputGroup placeholder="URL" value={url} onChange={handleInput}/>
            <Button style={{flexGrow:"0"}} icon="import" onClick={handleLoad}>チャパレ</Button>
            <Button style={{flexGrow:"0"}} icon="import" onClick={handleLoadKoma}>駒</Button>
        </ControlGroup>
        <div>
            <label>
                <input onChange={e=>setNoPassive(e.target.checked)} checked={noPassive} type="checkbox" />タイミングが常時の特技を出力しない（//から始まる行は出力）
            </label>
        </div>
        <TextArea inputRef={ref1} style={{width: "100%", height: "10rem"}}/>
        <Button icon="clipboard" onClick={handleCopy}>Copy</Button>

        <hr/>
        
    </Card>
}

