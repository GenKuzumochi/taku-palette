// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'

type Data = {
    result: "error",
    value: string,
} | {
    result: "success",
    value: any
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const src = req.query.src;
    try {
        if(!src) throw "Invalid src";
        const s = new URL(Array.isArray(src) ? src[0] : src);
        if (s.host !== "yutorize.2-d.jp") {
            throw "Bad url";
        }
        s.searchParams.set("mode", "json")
        const j = await fetch(s).then(x => x.json())

        res.status(200).json({result: "success", value: j})
    } catch (e) {
        res.status(403).json({result: 'error', value: "Bad url"})
    }
}
