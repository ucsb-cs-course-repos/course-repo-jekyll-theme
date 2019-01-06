---
layout: js
---

var DEBUGGING_ONLY = {
    "collections" : [

	{% for c in site.collections %}
	{
	    "label" : "{{c.label}}"
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

