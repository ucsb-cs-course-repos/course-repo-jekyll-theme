var nav = {
    {% if site.data.navigation.offerings %}
    "offerings": {
	"title" : "{{ site.data.navigation.offerings.title }}",
	"url" : "{{ site.data.navigation.offerings.url }}",
	"baseurl" : "{{ site.data.navigation.offerings.baseurl }}",
	"items" : [
	    {% for item in site.data.navigation.offerings.items %}
	    {
		"title" : "{{ item.title }}",
		"url" : "{{ item.url }}",
		"baseurl" : "{{ item.baseurl }}",
	    },
	    {% endfor }
	],
    },
    {% endif %}
    {% if site.data.navigation.offering_links %}
    "offering_links": {
	"title" : "{{ site.data.navigation.offerings.title }}",
	"url" : "{{ site.data.navigation.offerings.url }}",
	"baseurl" : "{{ site.data.navigation.offerings.baseurl }}",
	"items" : [
	    {% for item in site.data.navigation.offerings.items %}
	    {
		"title" : "{{ item.title }}",
		"url" : "{{ item.url }}",
		"baseurl" : "{{ item.baseurl }}",
	    },
	    {% endfor }
	],
    },
    {% endif %}
    {% if site.data.navigation.offering_menus %}
    "offering_menus" : [
	{% for term in site.data.navigation.offering_menus %}
	{
	    "term": "{{term.term}}",
	    "baseurl": "{{term.baseurl}}",
	    "items": [
		"TODO": "PUT ITEMS HERE",
	    ],
	},
	{% endfor %}
    ],
    {% endif %}
    
}
