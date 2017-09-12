#!/bin/sh

docker build -t pdf-to-ebinterface .
docker tag pdf-to-ebinterface:latest 752277495799.dkr.ecr.eu-west-1.amazonaws.com/pdf-to-ebinterface:latest
docker push 752277495799.dkr.ecr.eu-west-1.amazonaws.com/pdf-to-ebinterface:latest
