#!/usr/bin/env bash

docker run --name composer -d -p 3000:3000 -v /var/run/docker.sock:/var/run/docker.sock composer:default