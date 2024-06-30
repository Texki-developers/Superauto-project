#!bin/bash

echo "Finding the Docker container ID" 
server_container_id=`docker ps | grep 'superauto-server-1' | awk '{print $1}'`

if [ -z "$server_container_id" ];then
    echo "Error: Server container ID not found"
    exit 1
else
    echo "Server Container ID found: $server_container_id"
fi

docker exec -it $server_container_id npx sequelize-cli db:migrate
if [ $? -ne 0 ];then
    echo "DB Migration failed!"
    exit 1
fi
docker exec -it $server_container_id npx sequelize-cli db:seed:all
if [ $? -ne 0 ];then
    echo "DB Seeding failed!"
    exit 1
fi

exit 0