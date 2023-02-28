import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { Responsetype } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Responsetype>,
) {
  console.log(req.query);
  const {
    query: { id },
    session: { user },
  } = req;

  const product = await client.product.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          Fav: true,
        },
      },
    },
  });
  const term = product?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));
  const relatedProducts = await client.product.findMany({
    where: {
      OR: term,
      AND: {
        id: {
          not: product?.id,
        },
      },
    },
  });
  const isLiked = Boolean(
    await client.fav.findFirst({
      where: {
        productId: product?.id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    }),
  );
  res.json({ ok: true, product, isLiked, relatedProducts });
  console.log(relatedProducts);
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler: handler,
  }),
);

//핸들러 쓰는 이유 : post인지 체크 하고 함수 실행시키기 때문에 서버를 보호할 수 있음.
