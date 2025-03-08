---
permalink: /photography/
title: Things that make our life better
---
### Meet Dumpling! <a href="/photography/dumpling" class="view-full-album">more</a>

<div class="photo-gallery">
  {% assign album_path = "images/dumpling" %}
  {% assign images = site.static_files %}
  {% assign count = 0 %}

  {% for image in images %}
    {% if image.path contains album_path and count < 3 %}
      <div class="photo">
        <img src="{{ image.path | relative_url }}" alt="{{ image.name }}">
      </div>
      {% assign count = count | plus: 1 %}
    {% endif %}
  {% endfor %}
</div>

### Travel in US <a href="/photography/us_travel" class="view-full-album">more</a>

<div class="photo-gallery">
  {% assign album_path = "images/us_travel" %}
  {% assign images = site.static_files %}
  {% assign count = 0 %}

  {% for image in images %}
    {% if image.path contains album_path and count < 3 %}
      <div class="photo">
        <img src="{{ image.path | relative_url }}" alt="{{ image.name }}">
      </div>
      {% assign count = count | plus: 1 %}
    {% endif %}
  {% endfor %}
</div>