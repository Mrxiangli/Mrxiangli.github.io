---
permalink: /publications/
---

<!-- <style>
  .publications-container {
    max-width: 100%;
    margin: 0 auto;
  }

  .publication-item {
    margin-bottom: 2rem;
  }
</style> -->

{% assign sorted_publications = site.publications | sort: 'date' | reverse %}

{% for pub in sorted_publications %}
### **{{ pub.title }}**  
[Paper]({{ pub.paperurl }}) | {% if pub.codeurl != "" %} [Code]({{ pub.codeurl }})
{% else %}
  <span style="color: grey; display: inline;">Code not available</span>
{% endif %}

<span style="font-size: 0.8em;">Authors: {{ pub.authors }}</span><br>
<span style="font-size: 0.8em;">Venue: {{ pub.venue }}</span><br>
<span style="font-size: 0.8em;">Date: {{ pub.date | date: "%B %d, %Y" }}</span><br>

<span style="font-size: 0.7em; display: block; line-height: 1.5;">{{ pub.Abstract }}</span>

---
{% endfor %}
