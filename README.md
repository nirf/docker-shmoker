running 2 app servers on different host
the db is in one
communicate them by docker network: bridge(inter host comminication), overlay(outer host communication)
node-0
sudo apt install docker.io
sudo groupadd docker
sudo usermod -aG docker ${USER}
logout login
docker run hello-world
docker network create --driver bridge int-host
docker run --net=int-host --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=argus -d mysql:5.7
