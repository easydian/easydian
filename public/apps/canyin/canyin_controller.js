can.Control('Apps.CanyinCtrl', {
    pluginName: 'canyin',
    defaults: {
        current_user:     null,
        shops_page_id:    1,
        loading:          false
    }
},
{
    init: function(element, options) {
        easyUtils.set_title('Canyin');
        easyUtils.set_current_menu('menu_canyin');

        var self = this;
        
        element.append(can.view('/apps/canyin/ejs/container.ejs')); 
        
        can.when(                
            Models.Canyin.findAll({'start': 0, 'limit': 20, 'fields': '_id style shopwebsite shopname shoplogo description'}, function(data){                            
                easyUtils.show_filter($('#filters li a'), data);
                $('#shops_group').append(can.view('/apps/canyin/ejs/container_shops.ejs', data));
            })
        ).then(function(){                            
            self.prettyPhoto_shops();  
            self.sorting_shops($('#shops_group'));                              
        });
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
    '{window} scroll': function() {
        var self = this;
        if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
            self.render_shops();
        }
    },        
    create_spline_view: function() {
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

        Models.Canyin.findOne({id: $.cookie("canyin_shop_id")}, function(data){
            steal('highcharts').then(function(){
                new Highcharts.Chart({
                    chart: {
                        renderTo: 'canyin_chart_view',
                        type  : 'spline',
                        height: 200,
                        width : 580
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
        });               
    }, 
    render_comments: function() { 
        Models.CanyinComment.findAll({id: $.cookie("canyin_shop_id"), 'start': 0, 'limit': 15, 'fields': '_id username comment createtime'}, function(data){       
            steal('jquery-jcarousel').then('/css/skins/tango/skin.css').then(function(){ 
                $('#canyin_comment_view').append(can.view('/apps/canyin/ejs/inline_comment.ejs', data));
                $('#inline_comment').jcarousel();  
            });
        });
    },
    render_shops: function() {
        var self = this;
        if(Apps.CanyinCtrl.defaults.loading) return;
        Apps.CanyinCtrl.defaults.loading = true;
        can.when(             
            Models.Canyin.findAll({'start': (Apps.CanyinCtrl.defaults.shops_page_id * 20), 'limit': (Apps.CanyinCtrl.defaults.shops_page_id + 1) * 20, 'fields': '_id style shopwebsite shopname shoplogo description'}, function(data){
                Apps.CanyinCtrl.defaults.shops_page_id++;
                easyUtils.show_filter($('#filters li a'), data);
                $('#shops_group').append(can.view('/apps/canyin/ejs/container_shops.ejs', data));            
            })
        ).then(function(){            
            self.prettyPhoto_shops();
            self.sorting_shops($('#shops_group')); 
            Apps.CanyinCtrl.defaults.loading = false;           
        });
    }, 
    sorting_shops: function(element) {
        steal('jquery-isotope').then(function(){ 
            var $container = element;
            $container.imagesLoaded(function() { 
                $container.isotope({
                    itemSelector : '.element'
                });

                $('#shops_group > div').each(function(i, el) {
                    if($(this).hasClass('isotope-item')) return;
                    $container.isotope('appended', $(this), true);
                });

                var $optionSets = $('#options .option-set'),
                $optionLinks = $optionSets.find('a');

                $optionLinks.click(function(){ 
                    var $this = $(this);
                    // don't proceed if already selected
                    if ( $this.hasClass('selected') ) {
                      return false;
                    }
                    var $optionSet = $this.parents('.option-set');
                    $optionSet.find('.selected').removeClass('selected');
                    $this.addClass('selected');

                    // make option object dynamically, i.e. { filter: '.my-filter-class' }
                    var options = {itemSelector : '.element', filter: '*'},
                        key = $optionSet.attr('data-option-key'),
                        value = $this.attr('data-option-value');
                    // parse 'false' as false boolean
                    value = value === 'false' ? false : value;
                    options[ key ] = value;
                    if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
                      // changes in layout modes need extra logic
                      changeLayoutMode( $this, options )
                    } else {
                      // otherwise, apply new options
                      $container.isotope( options );
                    }
                    
                    return false;                                                    
                });
            });
        });
    }, 
    prettyPhoto_shops: function() {
        var self = this;
        steal('jquery-prettyPhoto', '/css/prettyPhoto.css').then(function(){                                    
            var tool_bar = '<div class="twitter"><a id="praise" href="javascript:void(0)" class="btn" data-count="none"><img src="images/glyphicons/png/glyphicons_343_thumbs_up.png" alt="" /></a><a id="collect" href="javascript:void(0)" class="btn" data-count="none"><img src="images/glyphicons/png/glyphicons_049_star.png" alt="" /></a><a id="criticize" href="javascript:void(0)"" class="btn" data-count="none"><img src="images/glyphicons/png/glyphicons_344_thumbs_down.png" alt="" /></a></div>';
            //PrettyPhoto
            $("a[rel^='prettyPhoto']").prettyPhoto({theme:'light_rounded', social_tools: tool_bar, resethash: 'canyin', default_height: 430, default_width: 580,                 
                beforeinlineclonecallback: function(){
                    $('#canyin_chart_view').css({'height':'200px', 'width':'580px'});
                    $('#canyin_comment_view').css({'height':'200px', 'width':'580px', 'margin-top': '15px'});
                }, 
                changepicturecallback: function() {
                    $('#inline_canyin_chart_view').empty();
                    self.create_spline_view();
                    self.render_comments();                                                       
                },  
                callback: function() {
                    easyUtils.recover_element($('#inline_canyin_chart_view'), 'canyin_chart_view');                                          
                    easyUtils.recover_element($('#inline_canyin_chart_view'), 'canyin_comment_view');                                          
                }
            });
        }); 
    },
    get_current_user: function(current_user) {
        return Apps.CanyinCtrl.defaults.current_user;
    }
});