---
layout: null
---




$(document).ready(function(){
    console.log("exam.js: document is ready");
    
    
    $('.page-break-before').each(function(i) {
	var pageNum = i+1;
	
	var prev = $(this).prev();
	var evenOddClass = (pageNum % 2 == 0)?
	    "even-page" : "odd-page";
	$(this).addClass(evenOddClass);
	var $div = $("<div>", {class: "pagebreak " + evenOddClass});
	prev.append($div);
	$('.exam-page-header-template').first().clone().appendTo($div);
	if (pageNum %2 ==0) {
	    var img = $('<img>');
	    img.addClass("even-page-staple-img");
            img.attr('src', "{{ '/assets/img/Staple-Even-Pages.png' | relative_url }}");
	    img.appendTo($div);
	} else {
	 $('.exam-name-header-template').first().clone().appendTo($div); 
	}
	prev.css('margin-bottom','0');
    });


    $('td.page-num').each(function(i) {
	var pageNum = i + 1
	$(this).html(pageNum); // re-calculate page numbers
	$(this).data("pageNum",pageNum);
	if (pageNum % 2==0) {
	    $(this).parents(".pagebreak").removeClass("odd-page");
	    $(this).parents(".pagebreak").addClass("even-page");
	} else {
	    $(this).parents(".pagebreak").removeClass("even-page");
	    $(this).parents(".pagebreak").addClass("odd-page");
	}
    });
    console.log("exam.js: done");
    
});
