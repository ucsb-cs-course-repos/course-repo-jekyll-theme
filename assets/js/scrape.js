---
layout: js
---

var DEBUGGING_ONLY = {
    "collections" : [

	{% for c in site.collections %}
	{% assign name = collection.label %}
	{
	    "label" : "{{name}}",
	    "items" : [
		{% for item in site[name] %}
		{
		   "collection" : "{{name}}",
		   "url" : "{{item.url}}",
		   "num" : "{{item.num}}",
		},
	    {% endfor %}
	    ]
	},
	{% endfor %}
    ],
    "static_files" : [
	{% for f in site.static_files %}
	{
	    "path" : "{{f.path}}",
	    "name" : "{{f.name}}"
	    "basename" : "{{f.basename}}"
	    "extname" : "{{f.extname}}"	    
	},
	{% endfor %}

    ],
    {% assign scripts = site.static_files | where:'extname', '.js' %}
    
    "scripts" : [
	
	{% for f in scripts %}
	{
	    "path" : "{{f.path}}",
	    "name" : "{{f.name}}"
	    "basename" : "{{f.basename}}"
	    "extname" : "{{f.extname}}"	    
	},
	{% endfor %}

    ],
};

