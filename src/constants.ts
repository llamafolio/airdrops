export const API_VERSION = "v1";

export const chains = [
  "ethereum",
  "polygon",
  "arbitrum",
  "avalanche",
  "optimism",
];

export type Chain = typeof chains[number];

export const dataPath = Bun.fileURLToPath(new URL("../data", import.meta.url));

export const links = [
  ["Source code", "https://github.com/llamafolio/airdrops"],
  ["LlamaFolio", "https://llamafolio.com"],
  ["GitHub", "https://github.com//llamafolio"],
  ["Twitter", "https://twitter.com/llamafolio"],
];
