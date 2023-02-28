import { NextApiRequest, NextApiResponse } from "next";

export interface Responsetype {
  ok: boolean;
  [key: string]: any;
}
type method = "GET" | "POST" | "Delete";

interface handlerProps {
  methods: method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

//이것이 클린코드다.
export default function withHandler({
  methods,
  handler,
  isPrivate = true, // default value is true  => 프리이빗 설정이 기본값이고, 만약 퍼블릭으로 만들고 싶으면 true 를 입력하도록
}: handlerProps) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse,
  ): Promise<any> {
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).end(); // 405 상태면 bad 상태임
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: "Please Log-in" });
    }
    try {
      await handler(req, res); //실제 돌아가는 함수 <- 이 함수를 실행하기 전에 안정성 확보를 위해 이렇게 코드를 감싼 상태.
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
