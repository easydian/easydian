can.Control('Apps.CanyinCtrl', {
    pluginName: 'canyin',
    defaults: {
        current_user: null,
        comment_id:   0,
        page_id:      0
    }
},
{
    init: function(element, options) {
        var self = this;
        var canyin_ejs_dir = '/apps/canyin/ejs/';
        var layout_ejs_dir = '/apps/layout/ejs/';
        easyUtils.set_title('Canyin');

        if(options.page === undefined) {
            can.when(                
                Models.Canyin.findAll({'start': (Apps.CanyinCtrl.defaults.page_id * 20), 'limit': (Apps.CanyinCtrl.defaults.page_id + 1) * 20, 'fields': '_id style shopwebsite shopname shoplogo description'}, function(data){                    
                    element.append(can.view(canyin_ejs_dir  + 'container.ejs', data));

                    for(var i=0; i<data.length; i++){
                        $('#filters li a').each(function(){ 
                            var option = $(this).attr('data-option-value');
                            if(option.indexOf(data[i].style) != -1)
                                $(this).css('display', 'block');
                        })
                    }
                })
            ).then(function(){
                steal('jquery-isotope').then('sorting').then(function(){ 
                    $('.projects').sorting();
                });  
                steal('jquery-prettyPhoto', '/css/prettyPhoto.css').then(function(){                                    
                    var tool_bar = '<div class="twitter"><a id="praise" href="javascript:void(0)" class="btn" data-count="none"><img src="images/glyphicons/png/glyphicons_343_thumbs_up.png" alt="" /></a><a id="collect" href="javascript:void(0)" class="btn" data-count="none"><img src="images/glyphicons/png/glyphicons_049_star.png" alt="" /></a><a id="criticize" href="javascript:void(0)"" class="btn" data-count="none"><img src="images/glyphicons/png/glyphicons_344_thumbs_down.png" alt="" /></a></div>';
                    //PrettyPhoto
                    $("a[rel^='prettyPhoto']").prettyPhoto({theme:'light_rounded', social_tools: tool_bar, resethash: 'canyin',                   
                        beforeinlineclonecallback: function(){
                            $('#canyin_chart_view').css({'height':'200px', 'width':'500px'});
                        }, 
                        changepicturecallback: function() {
                            $('#inline_canyin_chart_view').empty();
                            Models.Canyin.findOne({id: $.cookie("canyin_shop_id")}, function(data){
                                self.create_spline_view(data);
                            });                                
                        },  
                        callback: function() {
                            easyUtils.recover_element($('#inline_canyin_chart_view'), 'canyin_chart_view');                                          
                        }
                    });
                });                                 
            });
        }

        easyUtils.set_current_menu('menu_canyin');
    },
    '.hover_img mouseover': function(element) {
        var info=element.find("img");
        info.stop().animate({opacity:0.2},300);
        $.cookie("canyin_shop_id", info.attr('id'));
        $.cookie("canyin_shop_logo", info.attr('src'));                 
        $(".preloader").css({'background':'none'});
    },
    '.hover_img mouseout': function(element) {
        var info=element.find("img");
        info.stop().animate({opacity:1},300);
        $(".preloader").css({'background':'none'});
    },
    '#praise click': function(element) {
        can.when(
            Models.Canyin.praise($.cookie("canyin_shop_id"), function(data){
            })
        ).then(function(){
        });
    }, 
    '#collect click': function(element) {
        can.when(
            Models.User.collect($.cookie("canyin_shop_id"), function(data){
            })
        ).then(function(){
        });
    },       
    '#criticize click': function(element) {
        can.when(
            Models.Canyin.criticize($.cookie("canyin_shop_id"), function(data){
            })
        ).then(function(){
        });
    },
    create_spline_view: function(data) {
        locate_marker = function(arr, flag) {
            var i, low = 0, up = 0, max = arr[0], min = arr[0];
            for(i = 1; i < arr.length; i++) {
                if (arr[up] < arr[i]) {
                   up = i;
                }
                if (arr[low] > arr[i]) {
                   low = i;
                }                    
            }
            arr[up] = {
                y: arr[up],
                marker: {
                    symbol: 'url(' + (flag?'images/sun.png' : 'images/snow.png') + ')'
                }
            }
            arr[low] = {
                y: arr[low],
                marker: {
                    symbol: 'url(' + (flag?'images/snow.png' : 'images/sun.png') + ')'
                }
            }                
            return arr;
        };

        steal('highcharts').then('highcharts-exp').then(function(){
            new Highcharts.Chart({
                chart: {
                    renderTo: 'canyin_chart_view',
                    type  : 'spline',
                    height: 200,
                    width : 500
                },
                credits: {
                    enabled: true,
                    text: 'More... >>',
                    href: '#canyin_comment'
                },                            
                title: {
                    text: 'Weekly Comments Record'
                },
                legend: {
                    enabled: false
                },
                xAxis: {
                    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sta',
                        'Sun']
                },
                yAxis: {
                    title: {
                        text: 'Comments'
                    },
                    labels: {
                        formatter: function() {
                            return this.value
                        }
                    }
                },
                tooltip: {
                    crosshairs: true,
                    shared: true
                },
                plotOptions: {
                    spline: {
                        marker: {
                            radius: 4,
                            lineColor: '#666666',
                            lineWidth: 1
                        }
                    }
                },
                series: [{
                    name: 'Praise',
                    marker: {
                        symbol: 'square'
                    },
                    data: locate_marker(data.shopgoodt, true)
        
                }, {
                    name: 'Criticize',
                    marker: {
                        symbol: 'diamond'
                    },
                    data: locate_marker(data.shopbadt, false)
                }]
            });
        });               
    },      
    get_current_user: function(current_user) {
        return defaults.current_user;
    }
});