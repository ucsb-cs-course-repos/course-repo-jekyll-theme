{
    "type" : "{{type}}",
    "url" :  "{{ asn.url | relative_url  }}",	   
    {% if item.num %}"num" : "{{ item.num }}",{% endif %}
    {% if item.assigned %}"assigned" : "{{ item.assigned }}",{% endif %}
    {% if item.due %}"due" : "{{ item.due }}",{% endif %}    
    {% if item.ready %}"ready" : "{{ item.ready }}",{% endif %}
    {% if item.desc %}"desc" : "{{ item.desc }}",{% endif %}
    {% if item.exam_date or item.lecture_date or item.date %}
    "date" : "{{ item.date }}",
    {% endif %}
}