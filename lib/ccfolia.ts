import {z} from "zod"

export type CharacterClipboardData = {
    kind: "character";
    data: Partial<Character>;
}


const Status = z.object({
    label: z.string(),
    value: z.number().int().nonnegative(),
    max: z.number().int().nonnegative(),
})
export type Status = z.infer<typeof Status>

const Param = z.object({
    label: z.string(),
    value: z.string()
})
export type Param = z.infer<typeof Param>

const Face = z.object({
    label: z.string(),
    iconUrl: z.string()
})
export type Face = z.infer<typeof Face>

export const Character = z.object({
    name: z.string().default(""),
    playerName: z.string().default(""),
    memo: z.string().default(""),
    initiative: z.number().int().default(0),
    externalUrl: z.string().default(""),
    status: Status.array().default([]),
    params: Param.array().default([]),
    iconUrl: z.string().default(""),
    faces: Face.array().default([]),
    x: z.number().int().default(0),
    y: z.number().int().default(0),
    z: z.number().int().default(0),
    angle: z.number().int().default(0),
    height: z.number().int().nonnegative().default(0),
    width: z.number().int().nonnegative().default(4),
    active: z.boolean().default(true),
    secret: z.boolean().default(false),// ステータスを非公開にする
    invisible: z.boolean().default(false), // 発言時キャラクターを表示しない
    hideStatus: z.boolean().default(false), // 盤面キャラクター一覧に表示しない
    color: z.string().default("#888888"),
    roomId: z.null().default(null),
    commands: z.string().default(""),
    speaking: z.literal(false).default(false)
})
export type Character = z.infer<typeof Character>

export const CharacterOption = Character.pick({
    active: true,
    secret: true,
    invisible: true,
    hideStatus: true,
    color: true,
    width: true,
    angle: true,
}).extend({
    hasMemoBasic: z.boolean().default(true),
    hasImages: z.boolean().default(true)
})
export type CharacterOption = z.infer<typeof CharacterOption>

const Entities = z.object({
    room: z.object({}).default({}),
    items: z.object({}).default({}),
    decks: z.object({}).default({}),
    characters: z.record(Character),
    effects: z.object({}).default({}),
    scenes: z.object({}).default({}),
})

export const CcfoliaZip = z.object({
    meta: z.object({version: z.literal("1.1.0")}),
    entities: Entities,
    resources: z.record(z.object({
        type: z.string() // mime type
    }))
})
export type CcfoliaZip = z.infer<typeof CcfoliaZip>
