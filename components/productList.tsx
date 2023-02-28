import { Product } from "@prisma/client";
import useSWR from "swr";
import Item from "./item";

interface ProductListProps {
  kind: "favs" | "sales" | "purchases";
}

interface ProductWithCount extends Product {
  _count: {
    Fav: number;
  };
}
interface Record {
  id: number;
  product: ProductWithCount;
}

interface ProductListResponse {
  [key: string]: Record[];
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/${kind}`);
  return data ? (
    <>
      {data[kind]?.map((record) => (
        <Item
          id={record.product.id}
          key={record.id}
          title={record.product.name}
          price={record.product.price}
          likeCount={record.product._count.Fav}
        />
      ))}
    </>
  ) : null;
}
