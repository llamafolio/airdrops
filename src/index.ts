import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import { swagger } from "@elysiajs/swagger";
import { chains, API_VERSION } from "#/constants";
import { getAirdrops } from "#/get-airdrops";
import { landingHTML } from "#/landing";
import type { Airdrop } from "#/types";

const app = new Elysia();

app
  .use(
    swagger({
      path: "/docs",
      documentation: {
        info: {
          title: "LlamaFolio Airdrops API",
          termsOfService: "TBD",
          version: API_VERSION,
        },
      },
      exclude: ["/", /.*docs.*/, `/${API_VERSION}`],
    })
  )
  .use(html());

app.get("/version", () => API_VERSION);

app.get("/", (context) => (context.set.redirect = `/${API_VERSION}`));

app.onError(({ error, code }) => ({ error, code }));
/**
 * Endpoint: /v1
 */
app.group(`/${API_VERSION}`, (app) =>
  app
    /**
     * Endpoint: /v1
     */
    // @ts-ignore
    .get("/", (context) => context.html(landingHTML))
    /**
     * Endpoint: /v1/docs
     */
    .get("/docs", (context) => (context.set.redirect = `/docs`))
    /**
     * Endpoint: /v1/airdrops
     */
    .group("/airdrops", (app) =>
      app
        /**
         * Endpoint: /v1/airdrops/all
         */
        .get("/all", async () => {
          const airdrops = new Map();
          await Promise.all(
            chains.map(async (chain) =>
              airdrops.set(chain, await getAirdrops(chain))
            )
          );
          return Object.fromEntries(airdrops);
        })
        /**
         * Endpoint:
         *    - /v1/airdrops/:chain
         *    - /v1/airdrops/:chain?filter={"website":"https://arbitrum.io"}
         */
        .get(
          "/:chain",
          async ({ query, params }) => {
            if (!query.filter) return await getAirdrops(params.chain);
            try {
              const [[filterKey, filterValue]] = Object.entries(
                JSON.parse(query.filter)
              ) as [keyof Airdrop, string][];
              const airdrops = await getAirdrops(params.chain);
              return airdrops.filter((airdrop) =>
                airdrop[filterKey].includes(filterValue)
              );
            } catch (error) {
              throw new Error("Invalid filter");
            }
          },
          // this is for the query parameter filter
          {
            schema: {
              query: t.Optional(t.Object({ filter: t.Optional(t.String()) })),
            },
          }
        )
        /**
         * Endpoint: /v1/airdrops/:chain/:protocol
         */
        .get("/:chain/:protocol", async ({ params }) => {
          const airdrops = await getAirdrops(params.chain);
          return airdrops.filter(
            ({ protocol }) => protocol === params.protocol
          );
        })
    )
);

app.listen(process.env.PORT || 3033);

console.info(
  `🦊 Airdrops is running at http://${app.server?.hostname}:${app.server?.port}`
);
