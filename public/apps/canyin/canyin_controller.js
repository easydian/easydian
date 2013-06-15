can.Control('Apps.CanyinCtrl', {
    pluginName: 'canyin',
    defaults: {
        current_user: null,
        current_user_id: null,
        current_chart: null,
        current_canyin_id: null,
        current_comment_id: null
    }
},
{
    init: function(element, options) {
        var self = this;
        var canyin_ejs_dir = '/apps/canyin/ejs/';
        var layout_ejs_dir = '/apps/layout/ejs/';

        if(options.page === undefined) {
            can.when(
                Models.Canyin.ads(function(data){
                    element.append(can.view(layout_ejs_dir  + 'slider.ejs', {'ads': data}));
                })
            ).then(function(){
                steal('camera', function() {
                    //Slider
                    $('#camera_wrap_1').camera({height: '15%'});
                });  
            });

            can.when(
                Models.Canyin.findAll({}, function(data){
                    element.append(can.view(canyin_ejs_dir  + 'container.ejs', {'shops': data}));
                })
            ).then(function(){
                steal('jquery-isotope').then('sorting').then(function(){ 
                    $('.projects').sorting();
                });  
                steal('jquery-prettyPhoto', '/css/prettyPhoto.css').then(function(){                                    
                    var tool_bar = '<div class="twitter"><a href="#canyin/praise" class="btn" data-count="none"><img src="images/glyphicons/png/glyphicons_343_thumbs_up.png" alt="" /></a><a href="#canyin/collect" class="btn" data-count="none"><img src="images/glyphicons/png/glyphicons_049_star.png" alt="" /></a><a href="#canyin/criticize" class="btn" data-count="none"><img src="images/glyphicons/png/glyphicons_344_thumbs_down.png" alt="" /></a></div>';
                    //PrettyPhoto
                    $("a[rel^='prettyPhoto']").prettyPhoto({theme:'light_rounded', social_tools: tool_bar, resethash: 'canyin',                   
                        beforeinlineclonecallback: function(){
                            $('#canyin_chart_view').css({'height':'200px', 'width':'500px'});
                        }, 
                        changepicturecallback: function() {
                            $('#inline_canyin_chart_view').empty();
                            Models.Canyin.findOne({id: Apps.CanyinCtrl.defaults.current_canyin_id}, function(data){
                                self.create_spline_view(data);
                            });                                
                        },  
                        callback: function() {
                            Apps.CanyinCtrl.defaults.current_chart = null;
                            easyUtils.recover_element($('#inline_canyin_chart_view'), 'canyin_chart_view');  
                            //window.location.hash = '#canyin';                      
                        }
                    });
                });                                 
            });
        }
        else if(options.page === 'comments') {
            if($('div').hasClass('pp_pic_holder'))
                $.prettyPhoto.close();

            element.append(can.view(layout_ejs_dir  + 'breadcrumb.ejs', {hash: 'canyin', type: 'Canyin', 'page': 'Comments'}));                
            can.when(
                Models.CanyinComment.findAll({id: Apps.CanyinCtrl.defaults.current_canyin_id}, function(data){
                    element.append(can.view(canyin_ejs_dir  + 'comment.ejs'));
                    $('#post').append(can.view(canyin_ejs_dir  + 'post.ejs', {'data': data}));
                    $('#sidebar').append(can.view(canyin_ejs_dir  + 'sidebar.ejs', {'data': data}));
                })
            ).then(function(){
            });
        }
        else if(options.page === 'praise') {
            can.when(
                Models.CanyinComment.praise(Apps.CanyinCtrl.defaults.current_canyin_id, function(data){
                })
            ).then(function(){
            });
        } 
        else if(options.page === 'collect') {
            can.when(
                Models.User.collect(current_user_id, {'canyin': Apps.CanyinCtrl.defaults.current_canyin_id}, function(data){                        
                })
            ).then(function(){
            });
        }   
        else if(options.page === 'criticize') {
            can.when(
                Models.CanyinComment.criticize(Apps.CanyinCtrl.defaults.current_canyin_id, function(data){
                })
            ).then(function(){
            });
        }

        easyUtils.set_current_menu('menu_canyin');
    },
    '.hover_img mouseover': function(element) {
        var info=element.find("img");
        info.stop().animate({opacity:0.2},300);
        Apps.CanyinCtrl.defaults.current_canyin_id = info.attr('id');                     
        $(".preloader").css({'background':'none'});
    },
    '.hover_img mouseout': function(element) {
        var info=element.find("img");
        info.stop().animate({opacity:1},300);
        $(".preloader").css({'background':'none'});
    },
    //High Charts
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
            Apps.CanyinCtrl.defaults.current_chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'canyin_chart_view',
                    type  : 'spline',
                    height: 200,
                    width : 500
                },
                credits: {
                    enabled: true,
                    text: 'More... >>',
                    href: '#canyin/comments'
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