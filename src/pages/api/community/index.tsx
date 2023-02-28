import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { Responsetype } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Responsetype>,
) {
  if (req.method === "POST") {
    const {
      body: { question, longitude, latitude },
      query: { id },
      session: { user },
    } = req;
    const post = await client.post.create({
      data: {
        question: question,
        longitude,
        latitude,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({ ok: true, post });
  } else if (req.method === "GET") {
    const {
      query: { longitude, latitude }, //url 주소에서 /community?latitude=${latitude}&longtitude=${longtitude} 로 되있으면, req.query에서 해당 파라미터들에 접근이 가능함.
    } = req;
    const parsedLatitude = parseFloat(latitude!.toString());
    const parsedLongtitude = parseFloat(longitude!.toString());
    const posts = await client.post.findMany({
      include: {
        user: {
          select: {
            name: true,
            id: true,
          },
        },
        _count: {
          select: {
            answer: true,
            wondering: true,
          },
        },
      },
      where: {
        longitude: {
          gte: parsedLongtitude - 0.01,
          lte: parsedLongtitude + 0.01,
        },
        latitude: {
          gte: parsedLatitude - 0.01,
          lte: parsedLatitude + 0.01,
        },
      },
    });
    res.json({ ok: true, posts });
  }
}

export default withApiSession(
  withHandler({
    methods: ["POST", "GET"],
    handler: handler,
  }),
);

//핸들러 쓰는 이유 : post인지 체크 하고 함수 실행시키기 때문에 서버를 보호할 수 있음.
