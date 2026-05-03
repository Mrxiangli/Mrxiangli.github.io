---
permalink: /
title:
author_profile: true
analytics: true
redirect_from: 
  - /about/
  - /about.html
layout: single
---

<p>
  I am a Computer Engineering Ph.D. student at Purdue University, specializing in Systems for Machine Learning. My research at the Dependable Computing System Lab focuses on optimizing large language model (LLM) inference on GPU clusters and developing efficient AI solutions for resource-constrained embedded devices. During my internship at Futurewei Technologies, I worked on agent memory architectures and planning.
</p>

## 📰 News
<div class="news-container">
  {% for item in site.data.news limit:5 %}
    <div class="news-item">
      <div class="news-date">{{ item.date }}</div>
      <div class="news-content">{{ item.content | markdownify | remove: '<p>' | remove: '</p>' }}</div>
    </div>
  {% endfor %}
</div>

## 🎓 Education
*   Ph.D. in Computer Engineering, Purdue University, 2021 – Present
*   B.S. in Computer Engineering (with Distinction), Purdue University, 2019

## 💼 Professional Experience
<div class="experience-container">
  <div class="experience-item">
    <div class="exp-info">
      <span class="exp-role">ML Algorithm Intern</span>, <span class="exp-company">Futurewei Technologies, San Jose, California</span>
    </div>
    <div class="exp-date">Sept 2025 – Dec 2025</div>
  </div>
  <div class="experience-item">
    <div class="exp-info">
      <span class="exp-role">ML Research Intern</span>, <span class="exp-company">Houston Methodist Research Institute, Houston, Texas</span>
    </div>
    <div class="exp-date">May 2023 – Aug 2023</div>
  </div>
  <div class="experience-item">
    <div class="exp-info">
      <span class="exp-role">Software/Control Engineer</span>, <span class="exp-company">Cummins Inc, Columbus, Indiana</span>
    </div>
    <div class="exp-date">June 2019 – July 2021</div>
  </div>
</div>


## 📚 Publications
<div class="featured-publications">
  {% if site.publications %}
    {% assign sorted_pubs = site.publications | sort: 'date' | reverse %}
    {% for post in sorted_pubs %}
      {% include archive-single.html %}
    {% endfor %}
  {% else %}
    <p>Publications coming soon.</p>
  {% endif %}
</div>
