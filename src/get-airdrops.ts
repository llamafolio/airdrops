import { chains, dataPath, type Chain } from "#/constants";
import type { Airdrop } from "#/types";

/**
 *
 *  Between the two IDK which one is more performant. Will run bench later
 *
 */

export async function getAirdrops(chain: Chain): Promise<Array<Airdrop>> {
  if (!chains.includes(chain))
    throw new Error("Chain is not supported. Press F");
  const data = await Bun.file(`${dataPath}/${chain}.json`).json();
  return data;
}

export async function getAirdrops_(chain: Chain): Promise<Array<Airdrop>> {
  const { default: data } = await import(`${dataPath}/${chain}.json`, {
    assert: { type: "json" },
  });
  return data;
}
