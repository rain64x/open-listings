#!/bin/bash
echo 'Cleaning everything with docker'

echo 'Stop running containers'
docker stop $(docker ps -a -q --filter "name=mongo")
docker stop $(docker ps -a -q --filter "name=redis-service")

echo 'Remove containers'
docker rm $(docker ps -a -q --filter "name=mongo")
docker rm $(docker ps -a -q --filter "name=redis-service")

echo 'Remove images whose container name is "mongo" or "open-listings-redis"'
docker rmi $(docker images -q --filter "reference=mongo")
docker rmi $(docker images -q --filter "reference=open-listings-redis")

echo 'Remove dangling resources'
docker system prune
