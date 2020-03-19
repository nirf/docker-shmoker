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
sudo apt-get install mysql-server
mysql -h localhost -P 3306 --protocol=tcp -u root -p root
```
use argus;
CREATE TABLE `resources` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `something` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
```
docker pull nirf/resource-service
docker run --net=int-host -d -p 8080:3000 --name resource-service nirf/resource-service

goto: http://ec2-52-58-119-26.eu-central-1.compute.amazonaws.com:8080/api/swagger/

node-1
https://dzone.com/articles/creating-a-docker-overlay-network
