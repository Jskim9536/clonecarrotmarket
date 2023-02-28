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
    body: { name, price, description, photoId },
    session: { user },
    query: { page },
  } = req;

  if (req.method === "GET") {
    const productCount = await client.product.count(); //pagination 방법
    const products = await client.product.findMany({
      take: 10,
      skip: (Number(page) - 1) * 10,
      include: {
        _count: {
          select: {
            Fav: true,
          },
        },
      },
    });
    res.json({ ok: true, products, pages: Math.ceil(productCount / 10) });
  } else if (req.method === "POST") {
    const product = await client.product.create({
      data: {
        name,
        price,
        description,
        // imageUrl: "111",
        imageUrl: photoId,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({ ok: true, product });
    console.log(product);
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler: handler,
  }),
);

//핸들러 쓰는 이유 : post인지 체크 하고 함수 실행시키기 때문에 서버를 보호할 수 있음.
