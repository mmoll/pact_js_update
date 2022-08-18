import fetch from "isomorphic-unfetch";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();
const { searchServiceBaseUrl } = serverRuntimeConfig;

const APPLICATION_JSON = "application/json";

const fetcher = <R>(url: RequestInfo, init?: RequestInit) =>
  fetch(url, init).then((r) => r.json() as Promise<R>);

export const fetchNavigation = <R>(
  locale: string,
  slug?: string
): Promise<R> =>
  fetcher<R>(
    slug
      ? encodeURI(`${searchServiceBaseUrl}/categories?slug=${slug}`)
      : `${searchServiceBaseUrl}/categories`,
    {
      headers: {
        accept: APPLICATION_JSON,
        "x-locale": `${locale}`,
      },
    }
  );
