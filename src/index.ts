import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import { swagger } from "@elysiajs/swagger";
import { chains, API_VERSION } from "#/constants";
import { getAirdrops } from "#/get-airdrops";
import { landingHTML } from "#/landing";
import { dateHygene, stringToObject } from "#/utilities";
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

app.onError((context) => {
  console.log(context);
  return new Response(context.error.toString(), {
    status: context.set.status,
  });
});

app.get("/version", () => API_VERSION);

app.get("/", (context) => (context.set.redirect = `/${API_VERSION}`));

app.group(`/${API_VERSION}`, (app) =>
  app
    // @ts-ignore
    .get("/", (context) => context.html(landingHTML))
    /**
     * Endpoint: /v1/docs
     */
    .get("/docs", (context) => (context.set.redirect = `/docs`))
    /**
     * Not a valid endpoint
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
         * Endpoint /v1/airdrops/:chain
         */
        .get(
          "/:chain",
          async ({ params }) => await getAirdrops(params.chain),
          // this is for the query parameter filter
          {
            schema: {
              query: t.Optional(t.Object({ filter: t.Optional(t.String()) })),
            },
          }
        )
        /**
         * Endpoint: /v1/airdrops/:chain/:filter
         * Structure: /v1/airdrops/:chain/{"key":"value"}
         * Example: /v1/airdrops/:chain/{"website":"https://arbitrum.io"}
         *
         * The filter path parameter takes a stringified JSON object where
         *    - key is the property of the Airdrop type,
         *    - and value is the value of the property.
         *
         * Currently it only supports filtering by a single property.
         *
         * Valid keys are: protocol, token, contract, start, end, website
         *
         * For `start` and `end`, the value should be a date string in the format of YYYY-MM-DD
         * Example: /v1/airdrops/:chain/{"start":"2021-09-01"}
         *
         * When using `start`, the airdrop's start date must be on or after the given date.
         * When using `end`, the airdrop's end date must be on or before the given date.
         *
         */
        .get("/:chain/:filter", async (context) => {
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent
          const filter = decodeURIComponent(context.params.filter);
          try {
            let { key, value } = stringToObject<Airdrop>(filter);
            const usingDateFilter = ["start", "end"].includes(key);
            if (usingDateFilter) value = dateHygene(value);
            const airdrops = await getAirdrops(context.params.chain);
            return airdrops.filter((airdrop) => {
              if (!usingDateFilter) return airdrop[key] === value;
              const date = new Date(airdrop[key]);
              if (key === "start") {
                return date >= new Date(value);
              }
              if (key === "end") {
                return date <= new Date(value);
              }
            });
          } catch (error) {
            throw new Error(
              `Invalid filter: ${filter}. See README.md in repo for reference.`
            );
          }
        })
    )
);

app.listen(process.env.PORT);

console.info(
  `🦊 Airdrops is running at http://${app.server?.hostname}:${app.server?.port}`
);
