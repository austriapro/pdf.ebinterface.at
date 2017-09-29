#!/bin/sh

set -e

docker build -t ebinterface/pdf-to-ebinterface .
docker tag ebinterface/pdf-to-ebinterface:latest ebinterface/pdf-to-ebinterface:latest
docker push ebinterface/pdf-to-ebinterface:latest
