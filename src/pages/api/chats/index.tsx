import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { Responsetype } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Responsetype>,
) {
  //   const { name, price, description } = req.body;
  //   const { user } = req.session;
  const {
    session: { user },
    query: { page },
  } = req;

  const chatRooms = await client.chatRooms.findMany({
    where: {
      OR: [
        {
          chatById: user?.id,
        },
        {
          chatForId: user?.id,
        },
      ],
    },
    include: {
      chatBy: {
        select: {
          name: true,
          avatar: true,
          id: true,
        },
      },
      chatFor: {
        select: {
          name: true,
          avatar: true,
          id: true,
        },
      },
      chats: {
        select: {
          chats: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createAt: "desc",
        },
        take: 1,
      },
    },
  });
  res.json({ ok: true, chatRooms });
}
export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler: handler,
  }),
);

//핸들러 쓰는 이유 : post인지 체크 하고 함수 실행시키기 때문에 서버를 보호할 수 있음.
