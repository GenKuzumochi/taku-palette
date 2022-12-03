import { kMaxLength } from "buffer";
import jQuery from "jquery";
import { Character, CharacterClipboardData, Status } from "./ccfolia";
import { zenkana2hankana } from "./utils";
import * as Mar from "./marType"



const heroforce: { [key: string]: string } = {
    "エクステンション":
        "単体/本文/対象が行う攻撃の対象を「範囲（選択）」に変更する。もともと「範囲（選択）」「範囲」の場合には「対象：場面（選択）」「射程：視界」に変更する。/変更後の対象を「場面（選択）」に変更し、さらに「射程：視界」に変更する。",
    "グレイトサクセス":
        "単体/判定直後/メジャーアクションの判定をクリティカルにする。/使用した判定にリアクションは行えない。",
    "スーパーアタック":
        "単体/DR直前/10D点のダメージ増加を行う（ダメージを受けるキャラクター１人のみ）。ダメージを受ける対象がブレイクしている場合、さらに属性を〈神〉に変更。/さらにダメージ属性を〈神〉に変更し、ダメージを適用するキャラクターをHF以外で変更できなくなる。",
    "スクランブルアタック":
        "単体/DR直前/5D点のダメージ増加を行う（ダメージを受けるキャラクターすべて）。ダメージを受ける対象が1人でもブレイクしている場合、さらに属性を〈神〉に変更。/さらにダメージ属性を〈神〉に変更し、ダメージを適用するキャラクターをHF以外で変更できなくなる。",
    "ゼロダメージ":
        "自身/DR直後/実ダメージを0にする。追加で受けるバッドステータスや特技、アイテムの効果なども打ち消す。/このHFを「対象：場面（選択）」に変更する。",
    "ダブルアクセル":
        "単体☆×/イニシアチブ/対象にメインプロセスを行わせる。/このHFを「対象：単体☆」に変更する（自身に使えるようになる）。",
    "ディストラクション":
        "本文/オート/宣言されたHFの効果を打ち消す。/-",
    "ナイトメアムーン":
        "単体/判定直後/判定の達成値に-20する。クリティカルも打ち消す。ただし、HFによるクリティカルは打ち消せない《ライジングサン》を使用した判定に使用した場合には効果が相殺される）。/判定をファンブルにする。",
    "ハイスピード":
        "自身/イニシア/任意の場所に移動する。退場も可能。同じエンゲージにいる任意のキャラクターも移動、退場させることができる。/「宣言：判定直後」としてリアクションの判定に使用可能。判定をクリティカルにする。",
    "フェニックスホープ":
        "単体/オート/対象のHP、MPを最大値まで回復する。戦闘不能、死亡も回復できる。ただし、その場合の対象のFPは1となり、死亡はそのシーンで死亡したキャラクターのみ回復可能。/戦闘不能から回復した場合、FPを最大値まで回復する。",
    "ミラクルフェイト":
        "本文/オート/-/願いを１つ叶える。使用回数増加不可、コピー不可。",
    "ライジングサン":
        "単体/判定直後/判定の達成値に+20する。ファンブルも打ち消し、さらに達成値を+20する。《ナイトメアムーン》を使用した判定に使用した場合には効果が相殺される）。/判定をクリティカルにする。",
    "リブートコマンド":
        "単体☆/オート/HFの使用回数を1回分追加する。/-",
    "リベンジバイト":
        "本文/実ダメージ適用の際/あなたが受けた実ダメージを、その実ダメージを与えた相手にも同時に与える。最大で【力場値】点まで。HF以外で軽減不可。/効果を「最大で[【力場値】×2]点まで」に変更する。",
    "レインボースクリュー":
        "単体☆/イニシア/対象に5Dの〈神〉ダメージを与える。/与えるダメージを15Dに変更する。 "
}

export function getMar(url: string) {
    return new Promise((resolve, reject) => {
        const key = new URL(url).searchParams.get("key");
        jQuery.getJSON(`https://character-sheets.appspot.com/mar/display?ajax=1&key=${key}&callback=?`).done(
            (x: any) => resolve(x)
        ).fail((x: any) => reject(x))
    })
}

function createArmors(data: Mar.MarCharacter) {
    const x = data.armourstotal;
    return `斬${x.slash}/刺${x.pierce}/殴${x.crash}/炎${x.fire}/氷${x.ice}/電${x.thunder}/光${x.light}/闇${x.dark}`
}

export function createMarParams(data: Mar.MarCharacter) {
    const classes: [string, number][] = data.classes.map(c => ([c.nametext ?? c.name, parseInt(c.level, 10)]))
    const res = []
    res.push({ label: "体力", value: data.abl.strong.dispbonus },
        { label: "反射", value: data.abl.reflex.dispbonus },
        { label: "知覚", value: data.abl.sense.dispbonus },
        { label: "理知", value: data.abl.intellect.dispbonus },
        { label: "意志", value: data.abl.will.dispbonus },
        { label: "幸運", value: data.abl.bllesing.dispbonus },
        { label: "命中", value: data.outfits.total.hit },
        { label: "回避", value: data.outfits.total.dodge },
        { label: "心魂", value: data.outfits.total.magic },
        { label: "魂魄", value: data.outfits.total.countermagic },
        { label: "行動", value: data.outfits.total.action })
    res.push(...classes.map(([name, level]) => ({ label: name + "CL", value: String(level) })))
    return res;
}

export function createMar(data: Mar.MarCharacter, url: string, marOpt : MarOption): { commands: string, koma: string } {
    const p = createMarPalette(data, marOpt)
    const st = getStatusCommand(data.skills)
    const [_, name] = data.base.name.match(/(.+?)[\(（]/) ?? [, data.base.name]
    const obj: CharacterClipboardData = {
        kind: "character",
        data: {
            name,
            memo: `${data.base.name ?? ""} ${data.base.nameKana ? `(${data.base.nameKana})` : ""}\nPL:${data.base.player}\n\n` + createArmors(data),
            commands: p,
            externalUrl: url,
            initiative: parseInt(data.outfits.total.action),
            params: createMarParams(data),
            status: [
                { label: "FP", max: parseInt(data.outfits.total.fp, 10), value: parseInt(data.outfits.total.fp, 10) },
                { label: "HP", max: parseInt(data.outfits.total.hp, 10), value: parseInt(data.outfits.total.hp, 10) },
                { label: "MP", max: parseInt(data.outfits.total.mp, 10), value: parseInt(data.outfits.total.mp, 10) }
            ].concat(data.specials.map((x: any) => ({ label: zenkana2hankana(x.name), max: 0, value: 1 })), [{ label: "財産点", max: parseInt(data.addfortunepoint, 10), value: parseInt(data.addfortunepoint, 10) }], st)
        }
    }

    return { commands: obj.data.commands!, koma: JSON.stringify(obj) }
}

type S = {

}

function getStatusCommand(skills: Mar.Skill[]): Status[] {
    const res = []
    for (const skill of skills) {
        for (const l of (skill.memo?.split("\n") ?? [])) {
            let [, value, max, label] = l.match(/^;(\d+)\/(\d+)\s*(.*)$/) ?? [];
            if (value) {
                if (label == null || label === "") label = skill.name;
                res.push({ value: parseInt(value, 10), max: parseInt(max, 10), label })
            } else {
                const [, max] = l.match(/;1?シーン(\d+)/) ?? l.match(/;1?ラウンド(\d+)/) ?? l.match(/;1?R(\d+)/) ?? l.match(";1?シナリオ(\d+)") ?? []
                if (!max) continue;
                res.push({ value: parseInt(max, 10), max: parseInt(max, 10), label: skill.name })
            }
        }
    }
    return res;
}
function getL(str: string | null): string {
    return str?.split("\n").filter(x => !x.startsWith(";")).join("\\n").replaceAll(";\\n", "\n").replaceAll("\\n\\n", "\n").trim() ?? ""
}

export type MarOption = Partial<{
    noPassive: boolean;
    slashStatus: boolean;
}>

export function createMarPalette(data: Mar.MarCharacter, { noPassive, slashStatus }: MarOption) {
    const skills = data.skills.map(s => {
        const [_, val, tan] = s.cost?.match(/(\d+)(MP|HP|FP)/i) ?? [];
        let res = "";
        if (noPassive && s.timing === "常時") {
            res += s.memo.split("\n").filter(l => l.startsWith("//")).join("\n")
        }
        else {
            const line = `${getL(s.name)} / ${getL(s["class"])} / ${getL(s.type)} / ${getL(s.target)} / ${getL(s.timing)} / ${getL(s.range)} / ${getL(s.cost)} / ${getL(s.memo?.replaceAll("{CL}", `{${s["class"] ?? ""}CL}`))}`
            if (line !== " /  /  /  /  /  /  / ") {
                res += line;
            }
            if (val && tan) {
                res += `\n:${tan.toUpperCase()}-${val} ${getL(s.name)} ${getL(s.timing)}`
            }
        }
        return res
    }).filter(x => x !== "").join("\n")

    const classes: [string, number][] = data.classes.map(c => ([c.nametext ?? c.name, parseInt(c.level, 10)]))

    let res = "";
    if (slashStatus) res += `//体力=${data.abl.strong.dispbonus}
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
${classes.map(([name, level]) => `//${name}CL=${level}`).join("\n")}
`
    res += `2d+{体力}[] 体力
2d+{反射}[] 反射
2d+{知覚}[] 知覚
2d+{理知}[] 理知
2d+{意志}[] 意志
2d+{幸運}[] 幸運
2d+{命中}[] 命中
2d+{回避}[] 回避
2d+{心魂}[] 心魂
2d+{魂魄}[] 魂魄
${data.base.level}D6 舞台裏回復
//---特技
${skills}
//---ヒーローフォース
${data.specials.map((x: { name: string }) => x.name + " " + heroforce[x.name]).join("\n")}
`
    return res;
}