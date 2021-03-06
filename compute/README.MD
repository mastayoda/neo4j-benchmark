# Compute Engine Benchmarks

# Trueno Compute Server
The TruenoDB distributed computation server.

> **Trueno Compute Server**
> Trueno Compute Server relies on Spark Job Server, and GraphX.

> 1. Page Rank Algorithm.
> 2. Connected Components.
> 3. Strongly Connected Components.
> 4. Triangle Counting.

## Spark Compute Server Algorithm Generator
We designed an algorithm generator. The architecture includes connectivity to a key value store in which the parameters of new algorithms will be stored.
The algorithm generator will create the **algorithms-release.jar** that will be uploaded into the Spark Job Server in order to receive **REST** requests.
The results will be stored in the Database (e.g. Apache Cassandra, Scylla).

---------------

# Using Apache Spark and Neo4j for Big Data Graph Analytics

## Mazerunner for Neo4j

Neo4j uses mazarunner for big data graph processing. Mazerunner is an unmanaged extension [1].
Apache Spark’s GraphX module constitutes the main component of Mazerunner. When an agent job is dispatched, a subgraph is
exported from Neo4j and written to Apache Hadoop HDFS.  After Neo4j exports a subgraph to HDFS, a separate service for
Spark is notified to begin processing that data [1].

One focus of this approach is on data safety, that’s why it uses a persistent queue (RabbitMQ) to communicate data between Neo4j and Spark [2].

The infrastructure is set up using Docker containers, there are dedicated containers for Spark, RabbitMQ, HDFS and Neo4j with the Mazerunner Extension [2].

**Example**

```
http://mazerunner_docker_host:7474/service/mazerunner/analysis/{analysis}/{relationship_type}
```

### Pagerank
```
http://mazerunner_docker_host:7474/service/mazerunner/analysis/pagerank/ITERACTION
```

### Architecture in a nutshell

<p align="center">
  <img height="400" src="https://raw.githubusercontent.com/mastayoda/neo4j-benchmark/master/assets/images/neo4j_mazerunner_arquitecture.png">
</p>

----------


# Comparing Neo4j and TruenoDB [Spark based architecture]

Since they both depend on Spark GraphX the running time for the provided algorithms is roughly the same.
TruenoDB takes a little bit longer when requesting a job to the spark engine (Spark Job Server).

## GraphX PageRank Algorithm


| GraphDB                     | Spark Job Request (secs) | PageRank (secs) | Total |
| --------------------------- | ------------------------ | --------------- | ----- |
| TruenoDB                    |      3.0536457           | 26.2495         | 29.3031457 |
| Neo4j + Mazerunner + HDFS   |      2.2883707           | 30.4506902      | 32.7390609 |

<p align="left">
  <img height="400" src="https://raw.githubusercontent.com/mastayoda/neo4j-benchmark/master/assets/images/trueno_neo4j_compute_pagerank_plot.png">
</p>

----------

## GraphX Connected Components Algorithm


| GraphDB                     | Spark Job Request (secs) | Connected Components (secs) | Total |
| --------------------------- | ------------------------ | --------------------------- | ----- |
| TruenoDB                    |      3.0536457           | 9.0676                      | 12.1212457 |
| Neo4j + Mazerunner + HDFS   |      2.2883707           | 10.757                      | 13.0453707 |

<p align="left">
  <img height="400" src="https://raw.githubusercontent.com/mastayoda/neo4j-benchmark/master/assets/images/trueno_neo4j_compute_connectedcomponents_plot.png">
</p>

# Spark GraphX and ElasticSearch Connector

| GraphDB                     | Throughput(recs/sec) | 
| --------------------------- | ------------------------ |
| TruenoDB + Spark + ES - Vertices  |      1181.75172     | 
| TruenoDB + Spark + ES - Edges     |      4484.230697    | 

<p align="left">
  <img height="400" src="https://raw.githubusercontent.com/mastayoda/neo4j-benchmark/master/assets/images/trueno_neo4j_compute_es_plot.png">
</p>

# References
* [1] https://neo4j.com/blog/using-apache-spark-neo4j-big-data-graph-analytics/
* [2] https://neo4j.com/developer/apache-spark/
* [3] https://www.elastic.co/guide/en/elasticsearch/hadoop/master/spark.html
* [4] https://www.elastic.co/guide/en/elasticsearch/hadoop/master/configuration.html
* [5] https://www.elastic.co/guide/en/elasticsearch/hadoop/current/install.html
 

