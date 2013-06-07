steal(
    '/models/canyin.js',
    '/models/canyin_fixture.js'
)
.then(function() {
    can.Control('Apps.CanyinCommentCtrl', {
        pluginName: 'canyincomment',
        defaults: {
            current_user: null
        }
    },
    {
        init: function(element, options) {
            var ejs_dir = '/apps/canyin/ejs/';
            this.element.html(can.view(ejs_dir + 'template.ejs'));
            $('#header').html(can.view(ejs_dir  + 'header.ejs'));
            var $page_contaiter = $('#page_container');
            $page_contaiter.append(can.view(ejs_dir  + 'breadcrumb.ejs', {'page': 'Comments'}));
            can.when(
                Models.Canyin.comments({id: 123456}, {}, function(data){
                    $page_contaiter.append(can.view(ejs_dir  + 'comment.ejs', {'comments': data}));
                })
            ).then(function(){
            });
            
            $('#footer').html(can.view(ejs_dir  + 'footer.ejs'));  

            $(document).ready(function(){     
                //build dropdown
                $("<select />").appendTo("nav#main_menu div");
                
                // Create default option "Go to..."s
                $("<option />", {
                   "selected": "selected",
                   "value"   : "",
                   "text"    : "Please choose page"
                }).appendTo("nav#main_menu select");    
                
                // Populate dropdowns with the first menu items
                $("nav#main_menu li a").each(function() {
                    var el = $(this);
                    $("<option />", {
                        "value"   : el.attr("href"),
                        "text"    : el.text()
                    }).appendTo("nav#main_menu select");
                });
                
                //make responsive dropdown menu actually work           
                $("nav#main_menu select").change(function() {
                    window.location = $(this).find("option:selected").val();
                });
                        
                //Twitter Setup
                $(".tweet_block").tweet({
                  join_text: "auto",
                  username: "envato",
                  avatar_size: 0,
                  count: 3,
                  auto_join_text_default: "",
                  auto_join_text_ed: "",
                  auto_join_text_ing: "",
                  auto_join_text_reply: "",
                  auto_join_text_url: "",
                  loading_text: "loading tweets..."
                }); 

                //Iframe transparent
                $("iframe").each(function(){
                    var ifr_source = $(this).attr('src');
                    var wmode = "wmode=transparent";
                    if(ifr_source.indexOf('?') != -1) {
                    var getQString = ifr_source.split('?');
                    var oldString = getQString[1];
                    var newString = getQString[0];
                    $(this).attr('src',newString+'?'+wmode+'&'+oldString);
                    }
                    else $(this).attr('src',ifr_source+'?'+wmode);
                });      

                //Tooltip
                $('.follow_us a').tooltip(); 

                //Flickr Integration
                $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?id=36334875@N04&lang=en-us&format=json&jsoncallback=?", function(data){
                    $.each(data.items, function(i,item){
                        if(i<=11){ // <— change this number to display more or less images
                            $("<img/>").attr("src", item.media.m.replace('_m', '_s')).appendTo(".FlickrImages ul")
                            .wrap("<li><a href='" + item.link + "' target='_blank' title='Flickr'></a></li>");
                        }
                    });         
                });  
            });           
        },
        get_current_user: function(current_user) {
            return defaults.current_user;
        }
    });
});