---
permalink: /publications/
---

{% assign my_name = "Xiang Li" %}
{% capture my_name_bold %}<strong>{{ my_name }}</strong>{% endcapture %}

<div class="publications-container">

{% assign sorted_publications = site.publications | sort: 'date' | reverse %}

{% for pub in sorted_publications %}
  <div class="pub-card">
    
    <div class="pub-title">{{ pub.title }}</div>
    
    <div class="pub-authors">
      {{ pub.authors | replace: my_name, my_name_bold }}
    </div>

    <div class="pub-venue">
      {{ pub.venue }} &middot; {{ pub.date | date: "%Y" }}
    </div>

    {% if pub.Abstract %}
      <div class="pub-abstract-container" onclick="this.classList.toggle('expanded')" title="Click to expand">
        <div class="pub-abstract-text">
          {{ pub.Abstract }}
        </div>
        <div class="fade-overlay"></div>
      </div>
    {% endif %}

    <div class="pub-buttons">
      
      {% if pub.paperurl %}
        {% if pub.paperurl contains "arxiv.org" %}
          <a href="{{ pub.paperurl }}" style="text-decoration: none;">
            <img src="https://img.shields.io/badge/arXiv-Paper-b31b1b.svg" alt="arXiv" style="height: 26px;">
          </a>
        {% else %}
          <a href="{{ pub.paperurl }}" class="pub-btn">PDF</a>
        {% endif %}
      {% endif %}

      {% if pub.codeurl and pub.codeurl != "" %}
        <a href="{{ pub.codeurl }}" class="pub-btn">Code</a>
      {% endif %}

    </div>

  </div>
{% endfor %}

</div>