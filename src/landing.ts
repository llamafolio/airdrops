import { API_VERSION, links } from "#/constants";

export const landingHTML =
  /* HTML */
  ` <!DOCTYPE html>
    <html style="padding:16px">
      <head>
        <meta charset="utf-8" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/@picocss/pico/css/pico.min.css"
        />
        <link href="public/favicon.svg" rel="icon" type="image/svg+xml" />
        <title>Airdrops API ${API_VERSION}</title>
      </head>
      <body>
        <h1>&#x1F98A; Airdrops API ${API_VERSION}</h1>
        <a href="/docs">Documentation</a>
        <hr />
        ${links
          .map(([name, url]) => `<a href="${url}">${name}</a>`)
          .join(" | ")}
      </body>
      <script>
        const styles = [
          "color: darkgreen",
          "background: #F8D3D3",
          "font-size: 35px",
          "font-weight: bold",
          "text-shadow: 1px 1px black",
          "padding: 10px",
        ].join(";"); // 2. Concatenate the individual array item and concatenate them into a string separated by a semi-colon (;)

        console.log("%c🦙", styles);
        // 3. Pass the styles variable
        console.log("%chi there", styles);
        console.log("%cwanna contribute to Open Source LlamaFolio?", styles);
        console.log("%chttps://github.com/llamafolio", styles);
      </script>
    </html>`;
