# GraphQL Project

It's a project to consume commercial plan price from SmartMEI and convert to friendly data using Query Language. 

### Architecture Diagram

![Architecture Diagram](/doc/images/architectureDiagram.png)

### Sequence Diagram

![Sequence Diagram](/doc/images/sequenceDiagram.png)

### Why did i use this approach?

Because I believe that this way the application can scale horizontally and will have better performance and less processing between client / server.

**Disadvantage**
* don't have the date in real-time;
* need more infrastructure;
* "more cost".

**Benefits**
* support more throughput, because using the cache service instead of requesting data in real time, you don't have to crawler SmartMEI and exchange site;
* improves the customer UX, because the redis response is faster;
* if Smartmei or exchange site is out/down, cache service will return the last rate obtained;
* the heavy process will be in the background (worker);
* worker can be configured to run the process as needed.

### Technologies

* NodeJS v12
* Redis service (cache)

### Run unit test
Run the command below on your terminal.

```sh
$ npm install
$ npm test
```

### Development
Service can be run via **Docker** ou **Local**.

#### Docker
Run the command below on your terminal.

```sh
$ docker-compose up
```

#### Local
To run the service and worker on your machine, you need node and redis instaled.

**Steps:**
> Up the redis service. If you would like use redis on docker
```sh
$ docker run -p 6379:6379 redis
```
> Change environment variable in `.env`(file)
```
CACHE_HOST=localhost
```
> Install node dependencies
```
$ npm install
```
> Start worker (crawler)
```
$ npm run start-worker
```
> Start GraphQL service
```
$ npm run start
```

### Playground
When you already started the service, you can access the playgraound on `http://localhost:4000/`

##### Query language

*Input*
```javascript
{
  fetchCommercialPlan(site: "https://www.smartmei.com.br/#planos-e-tarifas") {
      queryDate
      description
      realPrice
      usdPrice
      eurPrice
  }
}
```

*Response*
```javascript
{
  "data": {
    "fetchCommercialPlan": {
      "queryDate": "2020-03-23 19:16:59",
      "description": "Transferência",
      "realPrice": "R$ 7,00",
      "usdPrice": "$ 1.38",
      "eurPrice": "€ 1.28"
    }
  }
}
```

### Logger format
`# Timestamp LogerLeve: Message`

Example:
```
2020-03-23 19:35:11 info: Job commercialPlan - cached values - {"queryDate":"2020-03-23 19:35:10","description":"Transferência","realPrice":"R$ 7,00","usdPrice":"$ 1.38","eurPrice":"€ 1.28"}
```
