---
layout: js
---

var cal_dates = {{ site.cal_dates}};

var assigned_text = " assigned";
var assigned2_text = " assigned2";
var due_text = " due ";
var due2_text = " due2 ";

{%- if site.assigned_text -%}assigned_text = "{{site.assigned_text}}"; {%- endif -%}
{%- if site.assigned2_text -%}assigned2_text = "{{site.assigned2_text}}"; {%- endif -%}
{%- if site.due_text -%}due_text = "{{site.due_text}}"; {%- endif -%}
{% if site.due2_text %}due2_text = "{{site.due2_text}}"; {% endif %}

var dates = [
  {%- for c in site.collections -%}
    {%- assign type = c.label -%}
    {%- for item in site[type] -%}
    {%- if item.due
     or item.due2
     or item.assigned
     or item.assigned2
     or item.exam_date
     or item.lecture_date -%}
          {%- if item.no_calendar -%}
          {%- else -%}
            {% include calendar_item.js %},
          {%- endif -%}
        {%- endif -%}
    {%- endfor -%}
  {%- endfor -%}
];

for (var i=0; i<cal_dates.length; i++) {
    cal_dates[i].type = "cal_date";
}
dates = dates.concat(cal_dates);

var cal = {
    numWeeks : {{ site.num_weeks }},
    extraExamWeek : {% if site.extra_exam_week %}{{site.extra_exam_week}}{% else %}false{% endif %},
    startDate : moment("{{site.start_date}}"),
    startWeek : {% if site.start_week %}{{site.start_week}}{% else %}1{% endif %},
    days : {},
    days_outside_calendar : []
};


function thisDayPlusOne(thisDay) {
    return thisDay.add(1,"days");
}

function traverseDates(dates) {
    var thisDay = moment(cal.startDate);
    var mmdd = thisDay.format("MM/DD");
    for(var i=cal.startWeek; i<(cal.startWeek + cal.numWeeks); i++){
	for (var j=1; j<=7; j++) {
	    console.log("Setting up cal.days[" + mmdd + "]");
	    cal.days[mmdd] = [];
	    thisDay = thisDayPlusOne(thisDay);
	    mmdd = thisDay.format("MM/DD");	    
	}
    }
    if (cal.extraExamWeek) {
	for (var j=1; j<=7; j++) {
	    console.log("Setting up cal.days[" + mmdd + "]");
	    cal.days[mmdd] = [];
	    thisDay = thisDayPlusOne(thisDay);
	    mmdd = thisDay.format("MM/DD");	    
	}
	
    }
    for (var i = 0, len = dates.length; i < len; i++) {
	processItem(dates[i]);
    }
}

function processItem(item) {

    if (item.assigned) {
	mmdd_assigned = moment(item.assigned).format("MM/DD");
	var assigned = {"asn_type" : item.type,
			"date_type" : "assigned",
			"value": JSON.stringify(item) };
	pushToDaysOrErrors(assigned,mmdd_assigned,cal.days,cal.days_outside_calendar);
    }

    if (item.assigned2) {
	var mmdd_assigned2 = moment(item.assigned2).format("MM/DD");
	var assigned2 = {"asn_type" : item.type,
			"date_type" : "assigned2",
			"value": JSON.stringify(item) };
	pushToDaysOrErrors(assigned2,mmdd_assigned2,cal.days,cal.days_outside_calendar);
    }

    if (item.due) {
	var due = {"asn_type" : item.type,
		   "date_type" : "due",
		   "value": JSON.stringify(item)};
	mmdd_due = moment(item.due).format("MM/DD");
	pushToDaysOrErrors(due,mmdd_due,cal.days,cal.days_outside_calendar);
    }

    if (item.due2) {
	var due2 = {"asn_type" : item.type,
		   "date_type" : "due2",
		   "value": JSON.stringify(item)};
	var mmdd_due2 = moment(item.due2).format("MM/DD");
	pushToDaysOrErrors(due2,mmdd_due2,cal.days,cal.days_outside_calendar);
    }

    
    if (item.date) {
	mmdd_date = moment(item.date).format("MM/DD");
	var assigned = {"asn_type" : item.type,
			"date_type" : "date",
			"value": JSON.stringify(item) };
	pushToDaysOrErrors(assigned,
			   mmdd_date,
			   cal.days,
			   cal.days_outside_calendar);	
    }
}

// Used to cal.days[date], but fail over to
//  the cal.days_outside_calendar as a backup

function pushToDaysOrErrors(obj, mmdd, days, errors) {
    var daysElem = days[mmdd];
    if ( daysElem instanceof Array) {
	daysElem.push(obj);
    } else {
	var errorObject = Object();
	errorObject.mmdd = mmdd;
	errorObject.obj = obj;
	errors.push(errorObject);
    }
}

function reportError(error_message) {
    console.log(error_message);
    $('#calendar').append('<p>' + error_message + '</p>');

}


function setUpCalendar() {

    // page is now ready, initialize the calendar...
    var startDate = cal.startDate;
    var startDayOfWeek = startDate.format("ddd");

    
    if (startDayOfWeek != "Sun") {
	reportError("Error: site.start_date is not a Sunday.  Instead, it is: " + startDayOfWeek);
	return;
    }


    traverseDates(dates);
    addCalendarTable(cal);
    reportDaysOutsideCalendar(cal);

}

function addCalendarTable(cal) {
    
    $('#calendar').append(  '<table >' );
    $('#calendar table').append( '<tr><th>Week</th><th>S</th><th>M</th><th>T</th><th>W</th><th>R</th><th>F</th><th>S</th></tr>');
    var thisDay = new moment(cal.startDate);
    for(var i=cal.startWeek; i<(cal.startWeek + cal.numWeeks); i++){
	$('#calendar table').append( '<tr data-week-num="' + i +'" />')
	var thisWeeksTrSelector = '#calendar table tr[data-week-num="' + i + '"]';
	$(thisWeeksTrSelector).append('<td>' + i + '</td>');
	for (var day=1; day<=7; day++) {
	    var thisDateFormatted = thisDay.format("MM/DD");
	    var cal_mmdd = $('<div class="cal_mmdd">'+ thisDateFormatted + '</div>');
	    var assignments = getAssignments(cal,thisDateFormatted);
	    $('<td/>')
		.append(cal_mmdd)
		.append(assignments)
		.attr('data-mmdd',thisDateFormatted)
		.appendTo(thisWeeksTrSelector)
	    
	    thisDay = thisDay.add(1,'days');
	}
    }
    // TODO: Factor out duplicate code from loop above and if below
    if (cal.extraExamWeek) {
	var selector = "exam-week";
	var label = "Final<br>Exam<br>Week";
	
	$('#calendar table').append( '<tr data-week-num="' + selector +'" />')
	var thisWeeksTrSelector = '#calendar table tr[data-week-num="' + selector + '"]';
	$(thisWeeksTrSelector).append('<td class="exam-week-label">' + label + '</td>');
	for (var day=1; day<=7; day++) {
	    var thisDateFormatted = thisDay.format("MM/DD");
	    var cal_mmdd = $('<div class="cal_mmdd">'+ thisDateFormatted + '</div>');
	    var assignments = getAssignments(cal,thisDateFormatted);
	    $('<td/>')
		.append(cal_mmdd)
		.append(assignments)
		.attr('data-mmdd',thisDateFormatted)
		.appendTo(thisWeeksTrSelector)
	    
	    thisDay = thisDay.add(1,'days');
	}
    }
    
    $('.cal-assignments div[data-asn-type="hwk"]').each(function() {
	var hwk = ($(this).data("date-value"));
    if (hwk.ready && hwk.ready=="true") {
		$(this).addClass("ready");
	} else {
		$(this).addClass("not-ready");
	}
	var link = $('<a />')
	    .attr('href',hwk.url)
	    .text(hwk.num)
	    .appendTo($(this));
	$(this).addClass("hwk");
    });

    $('.cal-assignments div[data-asn-type="pa"]').each(function() {
	var asn = $(this).data("date-value");
	if (asn.ready && asn.ready=="true") {
	    $(this).addClass("ready");
	} else {
	    $(this).addClass("not-ready");
	}
	var link = $('<a />')
	    .attr('href',asn.url)
	    .text(asn.num)
	    .appendTo($(this));
	$(this).addClass("pa");
    });

    
    
    $('.cal-assignments div[data-asn-type="lab"]').each(function() {
	var asn = $(this).data("date-value");
	if (asn.ready && asn.ready=="true") {
		$(this).addClass("ready");
	} else {
		$(this).addClass("not-ready");
	}
	var link = $('<a />')
	    .attr('href',asn.url)
	    .text(asn.num)
	    .appendTo($(this));
	$(this).addClass("lab");
    });


    $('.cal-assignments div[data-asn-type="exam"]').each(function() {
	var exam = ($(this).data("date-value"));
    if (exam.ready && exam.ready=="true") {
		$(this).addClass("ready");
	} else {
		$(this).addClass("not-ready");
	}
	var label = $('<span />')
	    .text(exam.desc + ": ")
	    .appendTo($(this));
	var link = $('<a />')
	    .attr('href',exam.url)
	    .text(exam.num)
	    .appendTo($(this));
	$(this).addClass("exam")
;
    });


    $('.cal-assignments div[data-asn-type="lectures"]').each(function() {
	var asn = $(this).data("date-value");
	if (asn.ready && asn.ready=="true") {
	    $(this).addClass("ready");
	} else {
	    $(this).addClass("not-ready");
	}
	var link = $('<a />')
	    .attr('href',asn.url)
	    .text(asn.num)
	    .prependTo($(this));
	$(this).addClass("lecture");
    });

    
    $('.cal-assignments div[data-asn-type="cal_date"]').each(function() {
	var cal_date = ($(this).data("date-value"));
	$(this).addClass("ready");

	var label = $('<span />')
	    .text(cal_date.label)
	    .appendTo($(this));
	$(this).addClass("cal_date")
;
    });

    
    $('.cal-assignments div[data-date-type="due"]').each(function() {
	var asn = ($(this).data("date-value"));
	var asnType =  ($(this).data("asn-type"));
	console.log("asnType="+asnType);
	if (asnType.endsWith("WIP"))
	    return;	
	$(this).append(due_text + moment(asn.due).format("hh:mma") );
    });

    $('.cal-assignments div[data-date-type="due2"]').each(function() {
	var asn = ($(this).data("date-value"));
	var asnType =  ($(this).data("asn-type"));
	console.log("asnType="+asnType);
	if (asnType.endsWith("WIP"))
	    return;	
	$(this).append(due2_text + moment(asn.due).format("hh:mma") );
    });

    
    $('.cal-assignments div[data-date-type="assigned"]').each(function() {
	var asnType =  ($(this).data("asn-type"));
	console.log("asnType="+asnType);
	if (asnType.endsWith("WIP"))
	    return;
	$(this).append(assigned_text);
    });

    $('.cal-assignments div[data-date-type="assigned2"]').each(function() {
	var asnType =  ($(this).data("asn-type"));
	console.log("asnType="+asnType);
	if (asnType.endsWith("WIP"))
	    return;
	$(this).append(assigned2_text);
    });

    
}

function getAssignments(cal,mmdd) {

    var div = $("<div />")
	.addClass("cal-assignments")
	.attr("data-mmdd",mmdd);
    if ( (typeof(cal.days[mmdd]) === undefined)
	 || (! cal.days[mmdd] instanceof Array )
	 || ( typeof(cal.days[mmdd].length) === undefined ) ) {
	div.text("error: " + mmdd);
    } else if (cal.days[mmdd].length != 0) {
	// There are some assignments
	for (var i=0,len=cal.days[mmdd].length; i<len; i++) {
	    var item=cal.days[mmdd][i];
	    $("<div />")
		.attr("data-asn-type",item.asn_type)
		.attr("data-date-type",item.date_type)
	    	.attr("data-date-value",item.value)
		.appendTo(div);
	}
    }
    
    return div;
}

function reportDaysOutsideCalendar(cal) {
    if (cal.days_outside_calendar.length > 0) {
	$('#calendar').append(  '<div class="calendar-errors" />' );
	$('#calendar div.calendar-errors').append("<h2>Errors:</h2>");
	$('#calendar div.calendar-errors').append("<p>These events were found that lie outside the range of the calendar for this term:</p>");
	for (var i=0, len=cal.days_outside_calendar.length; i<len; i++) {
	    $('#calendar div.calendar-errors').append("<p><code>" +
						      JSON.stringify(cal.days_outside_calendar[i]) +
						      "</p>");
	}
    }
}

$(document).ready(function() {
    setUpCalendar();
});

// Next, we include calendar_custom.js
// to allow customization of the calendar

{% include calendar_custom.js %}
