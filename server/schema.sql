-- portfolio_db setup
CREATE TABLE IF NOT EXISTS projects (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(120)  NOT NULL,
  description TEXT          NOT NULL,
  problem     TEXT,
  solution    TEXT,
  outcome     TEXT,
  tech_stack  JSON,
  live_url    VARCHAR(255),
  repo_url    VARCHAR(255),
  category    VARCHAR(60),
  featured    TINYINT(1)    DEFAULT 0,
  sort_order  INT           DEFAULT 0,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contacts (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(120) NOT NULL,
  email      VARCHAR(255) NOT NULL,
  message    TEXT         NOT NULL,
  created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS skills (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(60) NOT NULL,
  percentage  INT NOT NULL,
  category    VARCHAR(60) DEFAULT 'Core',
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed projects if empty
INSERT IGNORE INTO projects (id, title, description, problem, solution, outcome, tech_stack, live_url, repo_url, category, featured, sort_order) VALUES
(1,
 'AWS S3 Core Infrastructure',
 'Re-architected S3 metadata service to eliminate P99 latency spikes that were costing millions in SLA penalties.',
 'P99 read latency at 240 ms was breaching SLA thresholds during peak traffic, causing cascading failures in 12 downstream services.',
 'Replaced synchronous metadata lookups with an async event-driven pipeline using Redis Streams and sharded DynamoDB partitions. Introduced adaptive back-pressure to prevent queue saturation.',
 'P99 latency dropped from 240 ms to 38 ms (84% reduction). Zero SLA breaches in 18 months. System now handles 2x baseline traffic without additional hardware.',
 '["Go","Redis Streams","DynamoDB","AWS Lambda","Terraform","Prometheus"]',
 'https://aws.amazon.com/s3/', 'https://github.com/', 'Infrastructure', 1, 1),

(2,
 'Real-Time Fraud Detection Pipeline',
 'Built a sub-100 ms fraud scoring engine for Flipkart processing 1M+ transactions per day with 99.8% precision.',
 'Rule-based fraud detection had a 6% false-positive rate, blocking legitimate orders and causing significant revenue loss.',
 'Designed a streaming ML scoring pipeline using Kafka for ingestion, Spark Structured Streaming for feature computation, and a gradient-boosted model served via gRPC micro-service.',
 'False positives reduced by 73%. Fraud losses down 41%. Pipeline sustains 12K events/sec with p95 latency under 80 ms.',
 '["Apache Kafka","Spark","Python","gRPC","PostgreSQL","XGBoost","Kubernetes"]',
 'https://www.flipkart.com/', 'https://github.com/', 'Data Engineering', 1, 2),

(3,
 'Razorpay Webhook Delivery Engine',
 'Designed a fault-tolerant webhook engine achieving 99.99% delivery reliability across 40+ payment events.',
 'Legacy webhook system had a 2.3% drop rate under load spikes, causing merchants to miss critical payment confirmations.',
 'Built an immutable event log with at-least-once delivery guarantees. Exponential back-off retry with dead-letter queue. Per-merchant rate limiting to prevent thundering herd.',
 '99.99% delivery reliability. Retry success rate 97.4%. Under 50 ms median dispatch latency. Serves 800+ enterprise merchants.',
 '["Node.js","MySQL","Redis","BullMQ","Docker","Nginx"]',
 'https://razorpay.com/', 'https://github.com/', 'Backend Systems', 1, 3);

-- Seed skills if empty
INSERT IGNORE INTO skills (id, name, percentage, category, sort_order) VALUES
(1, 'Node.js', 95, 'Core', 1),
(2, 'React', 92, 'Core', 2),
(3, 'TypeScript', 88, 'Core', 3),
(4, 'AWS', 82, 'Infrastructure', 4),
(5, 'Kubernetes', 76, 'Infrastructure', 5),
(6, 'MySQL', 85, 'Database', 6);
