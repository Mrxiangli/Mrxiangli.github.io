---
permalink: /photography/
title: On the road
---

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>

<h3>Locations</h3>

<div id="photo-map" style="height: 600px; width: 100%; z-index: 1; border-radius: 8px;"></div>

<script>
  var map = L.map('photo-map').setView([37.8, -96], 4);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
  }).addTo(map);

  {% for pin in site.data.map_locations %}
    var marker = L.marker([{{ pin.lat }}, {{ pin.lng }}]).addTo(map);
    
    var popupContent = `
      <div style="text-align: center;">
        <a href="{{ pin.link }}" class="map-popup-link" style="font-weight:bold; color:#333; text-decoration:none;">{{ pin.title }}</a>
        {% if pin.image %}
          <br>
          <a href="{{ pin.link }}">
            <img src="{{ pin.image | relative_url }}" style="width:120px; border-radius:4px; margin-top:8px;">
          </a>
        {% endif %}
      </div>
    `;

    marker.bindPopup(popupContent);
  {% endfor %}
</script>