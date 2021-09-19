export const slug = (name: string): string =>
  encodeURIComponent(name.replaceAll(/\s+/, "-"));
