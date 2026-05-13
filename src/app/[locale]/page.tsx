import { setRequestLocale } from "next-intl/server";
import { Storefront } from "@/components/storefront/storefront";
import { getProducts } from "@/lib/graphql/get-products";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Readonly<Props>) {
  const { locale } = await params;
  setRequestLocale(locale);

  const products = await getProducts(locale);

  return <Storefront initialProducts={products} />;
}
