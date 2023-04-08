FROM oven/bun

ARG ENV="production"
ARG PORT

WORKDIR /app

# Copy "everything" -- most files will be ignored by .dockerignore
COPY . .

SHELL [ "/bin/bash", "-o", "pipefail", "-c" ]

# Give permission to execute all files in /app
RUN chmod -R 777 /app && \
  #
  # Install dependencies
  bun install

EXPOSE $PORT

CMD [ "bun", "run", "--hot", "./src/index.ts" ]