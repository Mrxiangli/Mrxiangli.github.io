---
layout: single
author_profile: true
classes: 
  - wide
  - photography-layout
permalink: /photography/
title: Photography & Life
---

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<div class="photography-hero">
  <p class="photography-subtitle">Capturing moments across the globe, one frame at a time.</p>
</div>

<div id="photo-map" class="styled-map"></div>

<div class="album-grid-container">
  <h2 class="section-title">Visual Journeys</h2>
  <div class="album-grid">
    {% for album in site.data.map_locations %}
      <a href="{{ album.link }}" class="album-card">
        <div class="album-card-image" style="background-image: url('{{ album.image | relative_url }}');"></div>
        <div class="album-card-overlay">
          <div class="album-card-content">
            <h3>{{ album.title }}</h3>
            <span class="view-album">View Gallery</span>
          </div>
        </div>
      </a>
    {% endfor %}
  </div>
</div>

<script>
  var map = L.map('photo-map', {
    scrollWheelZoom: false,
    zoomControl: false
  }).setView([37.8, -96], 4);

  L.control.zoom({ position: 'bottomright' }).addTo(map);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
  }).addTo(map);

  {% for pin in site.data.map_locations %}
    var marker = L.marker([{{ pin.lat }}, {{ pin.lng }}]).addTo(map);
    
    var popupContent = `
      <div class="map-popup">
        <a href="{{ pin.link }}" class="map-popup-title">{{ pin.title }}</a>
        {% if pin.image %}
          <div class="map-popup-image" style="background-image: url('{{ pin.image | relative_url }}');"></div>
        {% endif %}
      </div>
    `;

    marker.bindPopup(popupContent);
  {% endfor %}
</script>