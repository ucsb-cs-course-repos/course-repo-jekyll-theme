---
layout: null
---


  

$(document).ready(function(){

    
    $('.pagebreak').each(function() {
	$('.hwk-page-header-template').first().clone().appendTo($(this));
    });

    $('td.page-num').each(function(i) {
	$(this).html(i+1); // re-calculate page numbers
    });

    
});
