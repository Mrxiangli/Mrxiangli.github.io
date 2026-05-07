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

<div class="lang-en">
  I am a Computer Engineering Ph.D student at Purdue University advised by Professor Saurabh Bagchi, specializing in Systems for Machine Learning. My research at the <a href="https://engineering.purdue.edu/dcsl/" target="_blank" style="text-decoration: none;">Dependable Computing System Lab</a> focuses on optimizing large language model (LLM) inference on GPU clusters and developing efficient AI solutions for resource-constrained embedded devices. During my internship at Futurewei Technologies, I worked on agent memory architectures and planning.
</div>
<div class="lang-zh">
  我是普渡大学计算机工程专业的博士生，专注于机器学习系统。我在<a href="https://engineering.purdue.edu/dcsl/" target="_blank" style="text-decoration: none;">可靠计算系统实验室（DCSL）</a>的研究重点是优化 GPU 集群上的大语言模型（LLM）推理，并为资源受限的嵌入式设备开发高效的 AI 解决方案。在 Futurewei Technologies 实习期间，我参与了智能体记忆架构和规划的研究工作。
</div>

## <span class="lang-en">📰 News</span><span class="lang-zh">📰 最新动态</span>
<div class="news-container">
  {% for item in site.data.news limit:5 %}
    <div class="news-item">
      <div class="news-date">{{ item.date }}</div>
      <div class="news-content">
        <span class="lang-en">{{ item.content | markdownify | remove: '<p>' | remove: '</p>' }}</span>
        <span class="lang-zh">{{ item.content_zh | default: item.content | markdownify | remove: '<p>' | remove: '</p>' }}</span>
      </div>
    </div>
  {% endfor %}
</div>

## <span class="lang-en">🎓 Education</span><span class="lang-zh">🎓 教育背景</span>
*   <span class="lang-en">Ph.D. in Computer Engineering, Purdue University, 2021 – Present</span><span class="lang-zh">普渡大学，计算机工程博士，2021 至今</span>
*   <span class="lang-en">B.S. in Computer Engineering (with Distinction), Purdue University, 2019</span><span class="lang-zh">普渡大学，计算机工程学士（优秀毕业生），2019</span>

## <span class="lang-en">💼 Professional Experience</span><span class="lang-zh">💼 职业经历</span>
<div class="experience-container">
  <div class="experience-item">
    <div class="exp-info">
      <span class="lang-en"><span class="exp-role">ML Algorithm Intern</span>, <span class="exp-company">Futurewei Technologies, San Jose, California</span></span>
      <span class="lang-zh"><span class="exp-role">机器学习算法实习生</span>, <span class="exp-company">Futurewei Technologies, 加州圣何塞</span></span>
    </div>
    <div class="exp-date">
      <span class="lang-en">Sept 2025 – Dec 2025</span>
      <span class="lang-zh">2025年9月 – 2025年12月</span>
    </div>
  </div>
  <div class="experience-item">
    <div class="exp-info">
      <span class="lang-en"><span class="exp-role">ML Research Intern</span>, <span class="exp-company">Houston Methodist Research Institute, Houston, Texas</span></span>
      <span class="lang-zh"><span class="exp-role">机器学习研究实习生</span>, <span class="exp-company">休斯顿卫理公会研究所 (Houston Methodist Research Institute), 德克萨斯州休斯顿</span></span>
    </div>
    <div class="exp-date">
      <span class="lang-en">May 2023 – Aug 2023</span>
      <span class="lang-zh">2023年5月 – 2023年8月</span>
    </div>
  </div>
  <div class="experience-item">
    <div class="exp-info">
      <span class="lang-en"><span class="exp-role">Software/Control Engineer</span>, <span class="exp-company">Cummins Inc, Columbus, Indiana</span></span>
      <span class="lang-zh"><span class="exp-role">软件/控制工程师</span>, <span class="exp-company">康明斯 (Cummins Inc), 印第安纳州哥伦布</span></span>
    </div>
    <div class="exp-date">
      <span class="lang-en">June 2019 – July 2021</span>
      <span class="lang-zh">2019年6月 – 2021年7月</span>
    </div>
  </div>
</div>


## <span class="lang-en">📚 Publications</span><span class="lang-zh">📚 发表论文</span>
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
