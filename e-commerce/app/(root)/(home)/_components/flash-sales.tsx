import { getProducts } from "@/actions/admin.aciton";
import FlashSalesContent from "./FlashSalesContent";


export default async function FlashSalesSection() {
  const res = await getProducts();
  const products = res?.data?.products || [];

  return <FlashSalesContent products={products} />;
}