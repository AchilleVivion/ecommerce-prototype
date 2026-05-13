import { setRequestLocale } from "next-intl/server";
import { Storefront } from "@/components/storefront/storefront";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Readonly<Props>) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <Storefront />;
}
