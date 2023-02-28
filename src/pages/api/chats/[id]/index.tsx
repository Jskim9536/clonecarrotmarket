import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { Responsetype } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Responsetype>,
) {
  const {
    query: { id, page },
    session: { user },
  } = req;
  const pageVar = parseInt(page + "") || 1;
  const chatList = await client.chats.findMany({
    take: 10,
    skip: (pageVar - 1) * 10,

    where: {
      chatRoomsId: Number(id),
    },
    select: {
      id: true,
      chats: true,
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  res.json({ ok: true, chatList });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler: handler,
  }),
);

//핸들러 쓰는 이유 : post인지 체크 하고 함수 실행시키기 때문에 서버를 보호할 수 있음.
