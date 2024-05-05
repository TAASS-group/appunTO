docker rm -vf $(docker ps -aq)
docker rmi -f $(docker images -aq)
docker volume rm -f $(docker volume ls )