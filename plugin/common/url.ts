export const pathJoin = (base: string, path: string): string => {
  const baseURL = new URL(base)

  return new URL(
    [baseURL.pathname, path].join("/").replace(/\/+/g, "/"),
    baseURL.origin
  ).href
}
