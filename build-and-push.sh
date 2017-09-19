#!/bin/sh

docker build -t ebinterface/pdf-to-ebinterface .
docker tag pdf-to-ebinterface:latest ebinterface/pdf-to-ebinterface:latest
docker push ebinterface/pdf-to-ebinterface:latest
