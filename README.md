# Airdrops

Register of airdrops from DeFi and other crypto projects by LlamaFolio

REST API: [https://airdrop.up.railway.app](https://airdrops.up.railway.app/)
Data Source: `./src/data/`
____

#### Adding new airdrops to registry

TODO

#### Get started for development

Ensure `bun` is installed

```sh
bun --upgrade
```

↑ if that fails:

```sh
curl -fsSL <https://bun.sh/install> | bash
# or npm install --global bun@latest
```

```sh
bun --version
```

↑ should work now

```sh
bun install
```

```sh
bun run dev
```

open browser at <http://0.0.0.0:3033>

#### Run in docker locally

First, build:

```sh
docker build . \
  --no-cache \
  --progress plain \
  --file ./Dockerfile \
  --build-arg PORT="3033" \
  --tag llamafolio-airdrops
```

Then, run:

```sh
docker run \
  -it \
  --rm \
  --publish 3033:3033 \
  llamafolio-airdrops
```

open browser at <http://0.0.0.0:3033>
