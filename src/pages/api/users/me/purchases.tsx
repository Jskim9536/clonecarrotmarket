import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { Responsetype } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
import Profile from "@src/pages/profile";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Responsetype>,
) {
  const {
    session: { user },
    query: { id },
  } = req;
  const purchase = await client.purchase.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: {
        include: {
          _count: {
            select: {
              Fav: true,
            },
          },
        },
      },
    },
  });
  res.json({ ok: true, purchase });
  // console.log("usermeok", res.json({ ok: true, profile }));
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler: handler,
  }),
);

//핸들러 쓰는 이유 : post인지 체크 하고 함수 실행시키기 때문에 서버를 보호할 수 있음.
