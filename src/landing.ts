import { API_VERSION, links } from "#/constants";

export const landingHTML =
  /* HTML */
  ` <!DOCTYPE html>
    <html style="padding:16px">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/@picocss/pico/css/pico.min.css"
        />
      </head>
      <body>
        <h1>&#x1F98A; Airdrops API ${API_VERSION}</h1>
        <a href="/docs">Documentation</a>
        <hr />
        ${links
          .map(([name, url]) => `<a href="${url}">${name}</a>`)
          .join(" | ")}
      </body>
    </html>`;
