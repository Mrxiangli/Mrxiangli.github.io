--- 
permalink: /photography/dumpling/
---

<div class="photo-gallery">
  {% assign album_path = "images/dumpling" %}
  {% assign images = site.static_files %}
  
  {% for image in images %}
    {% if image.path contains album_path %}
      <div class="photo">
        <img src="{{ image.path | relative_url }}" alt="{{ image.name }}">
      </div>
    {% endif %}
  {% endfor %}
</div>