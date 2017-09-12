#!/bin/sh

# Will create a new task definition revision on aws ecs
# if the docker-compose.yml has changed.

export AWS_REGION=eu-west-1
ecs-cli compose --project-name pdf_to_ebinterface create
