FROM alpine:3.15.4

ARG NODE_VERSION

WORKDIR /tmp

RUN apk add tar
RUN apk add curl
RUN apk add xz
RUN apk add zip

RUN curl https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz --output node.tar.xz
RUN mkdir -p layer/bin
RUN mkdir -p node_runtime/
RUN tar -xf node.tar.xz -C node_runtime/ --strip-components=1
RUN cp node_runtime/bin/node layer/bin/node
COPY bootstrap layer/bootstrap
RUN cd layer && \
  chmod +x bin/node && \
  chmod +x bootstrap && \
  zip -r /tmp/node-v${NODE_VERSION}-runtime-layer.zip *