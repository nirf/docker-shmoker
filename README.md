# description
running 2 app servers on different host
the db is in one
communicate them by docker network: bridge(inter host communication), overlay(outer host communication)

# node-0
sudo apt install docker.io <br/>
sudo groupadd docker<br/>
sudo usermod -aG docker ${USER}<br/>
logout login<br/>
docker run hello-world<br/>
docker network create --driver bridge int-host<br/>
docker run --net=int-host --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=argus -d mysql:5.7<br/>
sudo apt-get install mysql-server<br/>
mysql -h localhost -P 3306 --protocol=tcp -u root -p root<br/>
```
use argus;
CREATE TABLE `resources` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `something` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
```
docker pull nirf/resource-service <br/>
docker run --net=int-host -d -p 80:3000 --name resource-service nirf/resource-service<br/>

goto: http://ec2-52-58-119-26.eu-central-1.compute.amazonaws.com/api/swagger/<br/>

## adding overlay network using swarm
## crete the swarm master node (from node-0 using its ip address)
docker swarm init --advertise-addr=172.31.16.245 (private ip) </br>

Overlay Network Creation on Node 1 <br/>
docker network create --driver=overlay --attachable overlay-net<br/>

# adding the app resource-service to the overlay network
docker network connect overlay-net resource-service


# node-1
sudo apt install docker.io <br/>
sudo groupadd docker<br/>
sudo usermod -aG docker ${USER}<br/>
logout login<br/>
docker run hello-world<br/>
## Node 1 Joins Swarm
docker swarm join --token SWMTKN-1-5lulj8kqydk5lmih3q5uanrfacfilp9aaub4gdae0jid1or9w5-5b0kgt7uh14l1pdy192ev0hcu 172.31.16.245:2377
This node joined a swarm as a worker.

docker pull nirf/resource-service <br/>
docker run --net=overlay-net -d -p 80:3000 --name resource-service nirf/resource-service<br/>

goto: http://ec2-18-197-149-170.eu-central-1.compute.amazonaws.com/api/swagger <br/>

### Reference
https://dzone.com/articles/creating-a-docker-overlay-network
