#!/bin/sh

export NODE_VERSION=16.14.2

# Builds the custom runtime layer and packages it as a zip-file.
docker build --build-arg NODE_VERSION=$NODE_VERSION -t custom-node-runtime-layer-v16.x .

# Copy the build result to the host.
docker cp $(docker create --rm custom-node-runtime-layer-v16.x):/tmp/node-v${NODE_VERSION}-runtime-layer.zip ../node-v${NODE_VERSION}-runtime-layer.zip