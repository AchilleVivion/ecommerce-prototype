const FALLBACK_LOCALE = "en";

export interface LocalizedItem {
  language?: string | null;
  value?: string | null;
}

export function resolveLocalizedString(
  items: LocalizedItem[] | null | undefined,
  locale: string,
): string {
  if (!items?.length) {
    return "";
  }

  const preferred = items.find(
    (item) => item.language === locale && item.value?.trim(),
  );
  if (preferred?.value) {
    return preferred.value;
  }

  const fallback = items.find(
    (item) => item.language === FALLBACK_LOCALE && item.value?.trim(),
  );
  return (
    fallback?.value ??
    items.find((item) => item.value?.trim())?.value ??
    ""
  );
}
