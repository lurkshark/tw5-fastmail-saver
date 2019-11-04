FROM node:12-alpine
ARG TW_PLUGIN_NAME
ARG TW_BUILD_EDITION
ARG TW_VERSION

RUN apk add --no-cache git \
  && git clone \
      --branch $TW_VERSION --depth 1 --quiet \
      https://github.com/Jermolene/TiddlyWiki5.git \
      /usr/src/tw5
COPY ./bin/add_plugin.js /usr/bin/
RUN node /usr/bin/add_plugin.js \
    "/usr/src/tw5/editions/${TW_BUILD_EDITION}" \
    $TW_PLUGIN_NAME
WORKDIR /usr/src/tw5
