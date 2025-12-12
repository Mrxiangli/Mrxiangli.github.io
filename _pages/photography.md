---
permalink: /photography/
title: On the road
---

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>

<h3>Locations</h3>
<div id="photo-map"></div>

<script>
  // Initialize map (Centered on US by default: 37.8, -96)
  var map = L.map('photo-map').setView([37.8, -96], 4);

  // Add OpenStreetMap tiles (The visual map layer)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
  }).addTo(map);

  // Loop through Jekyll Data and add markers
  {% for pin in site.data.map_locations %}
    
    var marker = L.marker([{{ pin.lat }}, {{ pin.lng }}]).addTo(map);
    
    // Create popup content
    var popupContent = `
      <div style="text-align: center;">
        <a href="{{ pin.link }}" class="map-popup-link">{{ pin.title }}</a>
        {% if pin.image %}
          <a href="{{ pin.link }}">
            <img src="{{ pin.image | relative_url }}" class="map-popup-img">
          </a>
        {% endif %}
      </div>
    `;

    marker.bindPopup(popupContent);

  {% endfor %}
</script>