import FlashSalesContent from "./FlashSalesContent";
import { IProduct, SearchParams } from "@/types";


interface Props {
  searchParams: SearchParams
  products: IProduct[]
}

export default async function FlashSalesSection({searchParams, products}: Props) {

  return <FlashSalesContent products={products} searchParams={searchParams}  />;
}