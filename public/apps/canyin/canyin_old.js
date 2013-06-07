//Ajax Tooltip script: By JavaScript Kit: http://www.javascriptkit.com
jQuery(document).ready(function(){
	var shopPars = { 
	    pageId: 0,
	    commentId: 0,
	    newsId: 0,  
	    shopId: 0,
	    timeId: 0,
        chart: null,
	    context: this   
    };

    // Create a Tooltip control that takes:
    //   - html - the html for the tooltip
    //   - relativeTo - which element to position this tooltip relative to
    var Tooltip = can.Control({
        init: function () {
            // we'll use this offset to position this.element
            var offset = this.options.relativeTo.offset();
            // set the html 
            this.element.html(this.options.html)
            // add a class for styling
            .addClass("tooltip")
            // append to the offsetParent so scrolling works better
            .appendTo(this.options.relativeTo.offsetParent())
            // set the position of the tooltip
            .offset({
                left: this.left(),
                top: this.top()
            })
        },
        // listen for any hover on the window
        '{window} hover': function (el, ev) {
            // remove only if we hovered outside the tooltip
            // or outside the relative element
            if (!this.element.has(ev.target).length &&
            ev.target !== this.element[0] &&
            ev.target !== this.options.relativeTo[0]) {
                shopPars.chart = null
                this.element.remove()
            }
        },
        left: function () {
            var tipx = (this.options.relativeTo.offset().left * 2 + this.options.relativeTo.width()) / 2
            if (tipx > $(window).width() / 2) {
                tipx = tipx - 600
            }
            return tipx
        },
        top: function () {
            var tipy = (this.options.relativeTo.offset().top * 2 + this.options.relativeTo.height()) / 2
            if (($(window).height() - tipy) < (this.options.relativeTo.height() / 2)) {
                tipy = tipy - this.options.relativeTo.height() / 2
            }
        }
    })

    // Get dining shop information:
    //   - options - ajax data field: 
    //              {'category':'Dining','fields': 'shopwebsite shopname', 'start': 0, 'limit': 1}
    getDiningShopsNextPage = function(options) {
        $.get("/shops", options, function(data) { 
            var html = can.view.render("tmpls/dining/diningviewtmpl.ejs", {"shops": data});
            $('#diningBody').append(html);        
            shopPars.pageId++; 
        }); 
    };

    if (shopPars.pageId == 0) {
        var options = {'category':'Dining','fields': 'shopwebsite shopname shoplogo', 'start': (shopPars.pageId * 20), 'limit': (shopPars.pageId + 1) * 20}
        getDiningShopsNextPage(options);
    }

	$('section article img').live('mouseenter', function(e){ //mouseenter element
		shopPars.context = this;        
		shopPars.timeId = setTimeout(function(){
            shopPars.shopId = $(shopPars.context).attr('id')
			var htmlBody = '<div style="font-style:italic">Fetching Dining Shop information...</div>';
			var toolTip = new Tooltip($("<div>"), {
	            relativeTo: $(shopPars.context),
	            html: htmlBody
        	});
            var options = {'category':'Dining', 'comments': 0, 'news': 0, 'fields': 'shopbadt shopgoodt ', 'start': 0, 'limit': 10}
			$.get("/shop/"+shopPars.shopId, options, function(data) { 				
				htmlBody = can.view.render("tmpls/dining/diningchartviewtmpl.ejs", {"shop": data});
				toolTip.element.html(htmlBody)
				creatDiningShopTipTool(data)
	    	}); 		
		}, 200);
	}).live('mouseleave', function(e){ //mouseleave element
		clearTimeout(shopPars.timeId);
	});

    // Get dining shop information:
    //   - type - the info type of the shop: comment, news, both
    //   - options - ajax data field: 
    //				{'category':'Dining','fields': 'shopwebsite shopname', 'start': 0, 'limit': 1}
	getDiningShopInfo = function(type, options) {
		//$.get("/shop/"+shopPars.shopId, {'category':'Dining','fields': 'shopwebsite shopname', 'start': (shopPars.pageId * 20), 'limit': (shopPars.pageId + 1) * 20}, function(data) { 
		$.get("/shop/"+shopPars.shopId, options, function(data) { 
			var html = '';
			if (type == 'comment') {
				html = can.view.render("tmpls/dining/diningcommenttmpl.ejs", {"shops": data});
				shopPars.commentId++;
        	} else if (type == 'news') {
        		html = can.view.render("tmpls/dining/diningnewstmpl.ejs", {"shops": data});
        		shopPars.newsId++;
        	} else {
        		html = can.view.render("tmpls/dining/diningviewtmpl.ejs", {"shops": data});
        	}
        	return html; 
    	}); 
	};

	$(window).scroll(function() {	
		var bh = $(document).height();
		var wh = $(window).height();
		var st = $(window).scrollTop();		
		if ((wh + st) >= bh) {	
			var options = {'category':'Dining','fields': 'shopwebsite shopname shoplogo', 'start': (shopPars.pageId * 20), 'limit': (shopPars.pageId + 1) * 20}		
		 	getDiningShopsNextPage(options);
		}		
	});

	creatDiningShopTipTool = function(commentInfo) {
        shopPars.chart = new Highcharts.Chart({
            chart: {
                renderTo: 'dining-chart-tip-' + commentInfo._id,
                type: 'line',
                height: 150,
                marginRight: 130,
                marginBottom: 25
            },
            credits: {
                enabled: false,
                text: 'Detailed Comments >>',
                href: '/diningcomment'
            },
            title: {
                text: 'Good/Bad Comments',
                x: -20 //center
            },
            xAxis: {
                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
				'Sun']
            },
            yAxis: {
                title: {
                    text: 'Comments'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return 'Week: ' + this.x + '<br/>' + this.series.name  + ': ' + this.y
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                y: 50,
                borderWidth: 0
            },
            series: [{
                name: 'Good Comments',
                data: [shopweekstats, 70, 80, 90, 100, 110, 120]
            }, {
                name: 'Bad Comments',
                data: [15, 25, 35, 45, 55, 65, 75]
            }]
        });
	}
});