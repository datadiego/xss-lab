docker rmi -f $(docker images -q)
docker rm -f $(docker ps -aq)
docker build -t users-app:latest .
docker run -d --name users-app -p 3000:3000 users-app:latest