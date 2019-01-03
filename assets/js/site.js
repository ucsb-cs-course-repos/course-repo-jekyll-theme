---
layout: null
---



// TODO: Rewrite in JQuery.  Add unit tests
function pointCount(n) {
  var text = n.data;
  // look for (x pts) where x is some sequence of [0-9]+
  // save the result of [0-9]+ in result[1]
  var pointRegExp = /\([ ]*([0-9]+)[ ]*pt[s]?[ ]*\)/i;  
  var result = pointRegExp.exec(text);
  return result ? parseInt(result[1]) : 0; 
  // if there was a match, result is truthy
  // if there was a match, numeric part is in result[1]
  // otherwise result is 0 points
}

// TODO: Rewrite in JQuery 
function countPoints(n) {                     // n is a Node 
  if (n.nodeType == 3 /*Node.TEXT_NODE*/)   // Check if n is a Text object
    return pointCount(n);                 // If so, parse its text and return number of points
  // Otherwise, iterate through n's children, totalling up the points
  var numpoints = 0; 
  for(var m = n.firstChild; m != null; m = m.nextSibling)  {
     numpoints += countPoints(m);  
  }
  return numpoints;   // Return total of all children's points
}

$(document).ready(function(){

    $('.template').each(function(i) {
	$(this).css('display','none');
    });

    // Use with  <div class="copy-of" data-id="foo"></div>
    // Use   <div id="foo" class="template"></div> on the stuff you want to copy
    // The class="template" will hide it the first time.
    // The  class="copy-of" data-id="foo" signals that you want a copy of foo inserted here.
    
    $('.copy-of').each(function(i) {
	var id = $(this).data('id')
	$(this).html($(document.getElementById(id)).clone().html());
    });


    $('[data-hfj]').each(function() {
	var chapter_num = $(this).data('hfj');
	var href = "{{ site.hfj_chapter_url_prefix }}" + chapter_num;
	$(this).html($('<a href="' + href + '">HFJ Chapter ' + $(this).data('hfj') + '</a>'));
    });

    $('[data-hfdp]').each(function() {
	var chapter_num = $(this).data('hfdp');
	var href = "{{ site.hfdp_chapter_url_prefix }}" + chapter_num;
	$(this).html($('<a href="' + href + '">HFDP Chapter ' + $(this).data('hfdp') + '</a>'));
    });

    if ($(".pointCount").length > 0 ) {
      var total = countPoints(document.body);
      $(".pointCount").html(total);
    }


	       
});


function toggle_nav_items(o) {
    /*  o has form { "text": "W19 Mirza", "url": "..."} */
    $("#offerings-dropdown").text(o.text);
    $(".nav-item").each( function() {
	var term=$(this).data("term");
	if (term) {
	    if (term==o.text) {
		$(this).removeClass("d-none");
	    } else {
		$(this).addClass("d-none");
	    }
	}
    });
}




$( document ).ready(function() {
    var offering = localStorage.getItem("offering");
    if (offering!==null) {
	var o = JSON.parse(offering);
	toggle_nav_items(o);
    }
    $(".offerings-dropdown-item").click(
	function(){
	    var o = {
		"text" : $(this).text(),
		"url" : $(this).data("url")
	    };
	    toggle_nav_items(o);
	    var offering = JSON.stringify(o);
	    console.log("offering="+offering);
	    localStorage.setItem("offering",offering);
	    window.location = o.url;
	}
    );
});

// toggle footer-navbar visibility when g then h (for GitHub) is pressed

Mousetrap.bind('g h', function() {
    console.log("toggle footer-navbar visibility");
    $(".footer-navbar").each ( function() {
	if ($(this).hasClass("d-none")) {
	    $(this).removeClass("d-none");
	} else {
	    $(this).addClass("d-none");
	}
    });

});

// toggle footer-navbar visibility when g then h (for GitHub) is pressed

Mousetrap.bind('t c', function() {
    console.log("toggle travis-ci image visibility");
    $(".travis-ci-status").each ( function() {
	if ($(this).hasClass("d-none")) {
	    $(this).removeClass("d-none");
	} else {
	    $(this).addClass("d-none");
	}
    });

});
	       
