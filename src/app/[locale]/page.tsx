import { getTranslations, setRequestLocale } from "next-intl/server";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("HomePage");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center rounded-3xl border border-border bg-card p-10 shadow-sm">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-lg">
          <ShoppingBag aria-hidden className="h-7 w-7" />
        </div>
        <h1 className="max-w-xl text-center text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-lg text-center text-lg text-muted">
          {t("description")}
        </p>
        <Link
          href="#"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition hover:opacity-90"
        >
          {t("cta")}
        </Link>
      </div>
    </main>
  );
}
