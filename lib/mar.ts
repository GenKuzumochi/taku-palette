import jQuery from "jquery";
import {CharacterClipboardData} from "./ccfolia";
import {zenkana2hankana} from "./utils";

const heroforce: { [key: string]: string } = {
    "エクステンション":
        "単体/本文/対象が行う攻撃の対象を「範囲（選択）」に変更する。/変更後の対象を「場面（選択）」に変更し、さらに「射程：視界」に変更する。",
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

function createArmors(data: any) {
    const x = data.armourstotal;
    return `斬${x.slash}/刺${x.pierce}/殴${x.crash}/炎${x.fire}/氷${x.ice}/電${x.thunder}/光${x.light}/闇${x.dark}`
}

export function createMar(data: any, url: string): { commands: string, koma: string } {
    const p = createMarPalette(data)
    const [_, name] = data.base.name.match(/(.+?)[\(（]/) ?? [, data.base.name]
    const obj = {
        kind: "character",
        data: {
            name,
            memo: `${data.base.name ?? ""} ${data.base.nameKana ? `(${data.base.nameKana})` : ""}\n\n` + createArmors(data),
            commands: p,
            externalUrl: url,
            initiative: parseInt(data.outfits.total.action),
            status: [
                {label: "FP", max: parseInt(data.outfits.total.fp, 10), value: parseInt(data.outfits.total.fp, 10)},
                {label: "HP", max: parseInt(data.outfits.total.hp, 10), value: parseInt(data.outfits.total.hp, 10)},
                {label: "MP", max: parseInt(data.outfits.total.mp, 10), value: parseInt(data.outfits.total.mp, 10)}
            ].concat(data.specials.map((x: any) => ({label: zenkana2hankana(x.name), max: 0, value: 1})))
        }
    }

    return {commands: obj.data.commands, koma: JSON.stringify(obj)}
}


export function createMarPalette(data: any) {
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
//---ヒーローフォース
${data.specials.map((x: { name: string }) => x.name + " " + heroforce[x.name]).join("\n")}
`
}