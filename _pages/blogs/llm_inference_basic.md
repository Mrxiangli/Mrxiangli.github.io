--- 
permalink: /blog/llm-inference-basic/
title: "Introduction to Large Language Model (LLM) Inference"
---
This is a brief introduction of large language model(LLM) inference. In this content, we won't go into to much technical details from the the serving side. We will mainly focus on some fundementals of LLM. For those who is looking for deeper technique details related to serving, you can jump to the following sections.

## 📘 What is LLM Inference?

LLM inference refers to the **process of using a pre-trained language model to generate output** based on a given input (prompt). It’s the stage where the model performs tasks like:

- Answering questions
- Completing sentences or code
- Summarizing text
- Translating languages

Unlike training, inference doesn’t change the model's weights — it only *uses* what the model already learned.


## The two phases of LLM Inference

The LLM inference process consists of two phases:
1. **Prefill Phase**: the whole input prompt is being tokenized and perform a forward pass through the model to generate the first token.
2. **Decode Phase**: the generated token is appended to the input and perform another forward pass to generate the next token, repeated until a stop creteria is met.

This all happens in milliseconds — but under the hood, it’s computationally intense!

---

