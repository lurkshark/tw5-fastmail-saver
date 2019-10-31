FROM node:12-alpine
ARG PLUGIN_NAME
ARG EDITION

RUN apk add --no-cache git \
  && git clone https://github.com/Jermolene/TiddlyWiki5.git \
      /usr/src/tw5
COPY ./bin/add_plugin.js /usr/bin/
RUN node /usr/bin/add_plugin.js \
    "/usr/src/tw5/editions/${EDITION}" \
    $PLUGIN_NAME
WORKDIR /usr/src/tw5
