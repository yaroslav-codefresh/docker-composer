#!/bin/bash

PROFILE=${1:-default}
echo "using profile ${PROFILE}"
docker build --build-arg profile=${PROFILE} -t composer:${PROFILE} .