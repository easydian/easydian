steal(
    'jquery-preloader',
    'superfish',
    'header-footer',
    '/models/canyin.js',
    '/models/canyin_fixture.js'
)
.then(function(){
    can.Control('Apps.CanyinCommentCtrl', {
        pluginName: 'canyin_comment',
        defaults: {
            current_user:       null,
            current_user_id:    null,
            comments_page_id:   1,
            loading:            false
        }
    },
    {
        init: function(element, options) {
            var self = this;
            easyUtils.set_title('Canyin-Comments');
            easyUtils.set_current_menu('menu_canyin');

            if($('div').hasClass('pp_pic_holder'))
                $.prettyPhoto.close();

            element.append(can.view('/apps/layout/ejs/breadcrumb.ejs', {hash: 'canyin', type: 'Canyin', 'page': 'Comments'}));                
            can.when(
                Models.CanyinComment.findAll({id: $.cookie("canyin_shop_id"), 'start': 0, 'limit': 15, 'fields': '_id username comment createtime'}, function(data){       
                    element.append(can.view('/apps/canyin/comment/ejs/comment.ejs'));
                    $('#post').append(can.view('/apps/canyin/comment/ejs/post.ejs', data));
                    $('#post_comments').append(can.view('/apps/canyin/comment/ejs/post_comment.ejs', data));
                    $('#sidebar').append(can.view('/apps/canyin/comment/ejs/sidebar.ejs', data));                   
                })
            ).then(function(){                
            });          
        },
        'li click': function(element) {
            if(element.attr('id') !== undefined)
                $.cookie("canyin_comment_id", element.attr('id'));
        },
        'a[id*="update"] click': function(element) {            
            if($.cookie("canyin_comment_id")) {
                can.when(
                    Models.Canyin.comment_update({id: $.cookie("canyin_shop_id"), comment_id: $.cookie("canyin_comment_id")}, function(data){                        
                        if(element.attr('id') !== undefined){
                            var comment_id = (element.attr('id')).split("_");
                            $.cookie("canyin_comment_id", comment_id[1]);
                        }
                    })
                ).then(function(){
                    $('#' + $.cookie("canyin_comment_id")).remove();
                });                
            }
        }, 
        'a[id*="delete"] click': function(element) {
            if($.cookie("canyin_comment_id")) {
                can.when(
                    Models.Canyin.comment_destroy({id: $.cookie("canyin_shop_id"), comment_id: $.cookie("canyin_comment_id")}, function(data){                        
                        if(element.attr('id') !== undefined){
                            var comment_id = (element.attr('id')).split("_");                            
                            $.cookie("canyin_comment_id", comment_id[1]);
                        }                        
                    })
                ).then(function(){
                    $('#' + $.cookie("canyin_comment_id")).remove();
                });                
            }
        }, 
        '{window} scroll': function() {
            var self = this;
            if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
                self.render_comments();
            }
        }, 
        '#create_comment click': function(element) {
            var self = this;
            self.create_comment();
            element.preventDefault();
            return false;      
        },
        render_comments: function() { 
            var self = this;
            if(Apps.CanyinCommentCtrl.defaults.loading) return;
            Apps.CanyinCommentCtrl.defaults.loading = true;
            can.when(          
                Models.CanyinComment.findAll({id: $.cookie("canyin_shop_id"), 'start': (Apps.CanyinCommentCtrl.defaults.comments_page_id * 15), 'limit': (Apps.CanyinCommentCtrl.defaults.comments_page_id + 1) * 15, 'fields': '_id username comment createtime'}, function(data){       
                    Apps.CanyinCommentCtrl.defaults.comments_page_id++;
                    $('#post_comments').append(can.view('/apps/canyin/comment/ejs/post_comment.ejs', data));                
                })
            ).then(function(){            
                Apps.CanyinCommentCtrl.defaults.loading = false;           
            });
        }, 
        create_comment: function() { 
            var self = this;
            can.when(
                Models.Canyin.comment_create({id: $.cookie("canyin_shop_id")}, { }, function(data){
                    alert(data);
                })
            ).then(function(){
            });
        },                                   
        get_current_user: function(current_user) {
            return Apps.CanyinCommentCtrl.defaults.current_user;
        }
    });
});