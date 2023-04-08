import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import { swagger } from "@elysiajs/swagger";
import { staticPlugin } from "@elysiajs/static";
import type { Airdrop } from "#/types";
import { landingHTML } from "#/landing";
import { getAirdrops } from "#/get-airdrops";
import { chains, API_VERSION } from "#/constants";
import { dateHygene, stringToObject } from "#/utilities";

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
  .use(staticPlugin())
  .use(html());

/**
 * Error handler. All thrown errors will be handled here.
 */
app.onError((context) => {
  return new Response(JSON.stringify({ error: context.error.message }), {
    status: context.set.status,
  }).json();
});

app.get("/favicon.ico", () => Bun.file("public/favicon.ico"));

app.get("/version", () => API_VERSION);

/* make sure we always use version path parameter */
app.get("/", (context) => (context.set.redirect = `/${API_VERSION}`));

app.group(`/${API_VERSION}`, (app) =>
  app
    // @ts-ignore: types broken
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
          async ({ params }) => {
            if (!params.chain)
              throw new Error("Either /all or /:chain path param is required");
            return await getAirdrops(params.chain);
          },
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
         * Valid keys are: `protocol`, `token`, `contract`, `start`, `end`, `website`
         *
         * For `start` and `end`, the value should be a date string in the format of YYYY-MM-DD
         * Example: /v1/airdrops/:chain/{"start":"2021-09-01"}
         *
         * When using `start`, the airdrop's start date must be on or after the given date.
         * When using `end`, the airdrop's end date must be on or before the given date.
         */
        .get("/:chain/:filter", async (context) => {
          if (!chains.includes(context.params.chain))
            throw new Error(
              `Invalid chain. Valid chains are: ${chains.join(", ")}`
            );
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent
          const filter = decodeURIComponent(context.params.filter);
          try {
            let { key: filterKey, value: filterValue } =
              stringToObject<Airdrop>(filter);
            const airdrops = await getAirdrops(context.params.chain);
            const usingDateFilter = ["start", "end"].includes(filterKey);
            if (!usingDateFilter) {
              return airdrops.filter(
                (airdrop) => airdrop[filterKey] === filterValue
              );
            }
            filterValue = dateHygene(filterValue);
            return airdrops.filter((airdrop) => {
              const date = new Date(airdrop[filterKey]);
              if (filterKey === "start") {
                return date >= new Date(filterValue);
              }
              if (filterKey === "end") {
                return date <= new Date(filterValue);
              }
            });
          } catch {
            throw new Error(
              `Invalid filter: ${filter}. See README.md in repo for reference.`
            );
          }
        })
    )
)

app.listen(
  process.env.PORT);

console.info(
  `🦊 Airdrops is running at http://${app.server?.hostname}:${app.server?.port}`
);
