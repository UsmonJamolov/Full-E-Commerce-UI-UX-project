import FlashSalesContent from "./FlashSalesContent";
import { IProduct, SearchParams } from "@/types";


interface Props {
  searchParams: SearchParams
  products: IProduct[]
  title: string
  noProducts: string
  viewAllLabel: string
}

export default async function FlashSalesSection({searchParams, products, title, noProducts, viewAllLabel}: Props) {

  return <FlashSalesContent products={products} searchParams={searchParams} title={title} noProducts={noProducts} viewAllLabel={viewAllLabel}  />;
}