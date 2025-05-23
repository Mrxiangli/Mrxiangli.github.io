---
title: "Ascendra: Dynamic Request Prioritization for Efficient LLM Serving"
collection: publications
date: 2025-4-25   
venue: arXiv
paperurl: 'https://arxiv.org/abs/2504.20828'
codeurl: ''
authors: Azam Ikram, Xiang Li, Sameh Elnikety, Saurabh Bagchi
Abstract: "The rapid advancement of Large Language Models (LLMs) has driven the need for more efficient serving strategies. In this context, efficiency refers to the proportion of requests that meet their Service Level Objectives (SLOs), particularly for Time To First Token (TTFT) and Time Between Tokens (TBT). However, existing systems often prioritize one metric at the cost of the other. We present Ascendra, an LLM serving system designed to meet both TTFT and TBT SLOs simultaneously. The core insight behind Ascendra is that a request's urgency evolves as it approaches its deadline. To leverage this, Ascendra partitions GPU resources into two types of instances: low-priority and high-priority. Low-priority instances maximize throughput by processing requests out of arrival order, but at the risk of request starvation. To address this, Ascendra employs a performance model to predict requests at risk of missing their SLOs and proactively offloads them to high-priority instances. High-priority instances are optimized for low-latency execution and handle urgent requests nearing their deadlines. This partitioned architecture enables Ascendra to effectively balance high throughput and low latency. Extensive evaluation shows that Ascendra improves system throughput by up to 1.7x compared to vLLM and Sarathi-Serve while meeting both TTFT and TBT SLOs."
---