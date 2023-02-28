import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { Responsetype } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Responsetype>,
) {
  const {
    query: { id },
    body,
    session: { user },
  } = req;

  console.log(body);
  const message = await client.chats.create({
    data: {
      chats: body?.chat,
      chatRooms: {
        connect: {
          id: Number(id),
        },
      },
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  res.json({ ok: true, message });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  }),
);
