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
            current_user: null,
            current_user_id: null,
            current_chart: null,
            current_comment_id: null
        }
    },
    {
        init: function(element, options) {
            var self = this;
            var comment_ejs_dir = '/apps/canyin/comment/ejs/';
            var layout_ejs_dir = '/apps/layout/ejs/';
            easyUtils.set_title('Canyin-Comments');

            if(options.page === undefined) {
                if($('div').hasClass('pp_pic_holder'))
                    $.prettyPhoto.close();                
                element.append(can.view(layout_ejs_dir  + 'breadcrumb.ejs', {hash: 'canyin', type: 'Canyin', 'page': 'Comments'}));                
                can.when(
                    Models.CanyinComment.findAll({id: $.cookie("canyin_shop_id")}, function(data){
                        element.append(can.view(comment_ejs_dir  + 'comment.ejs'));
                        $('#post').append(can.view(comment_ejs_dir  + 'post.ejs'));
                        $('#post_comments').append(can.view(comment_ejs_dir  + 'post_comment.ejs', data));
                        $('#sidebar').append(can.view(comment_ejs_dir  + 'sidebar.ejs', {'data': data}));                   
                    })
                ).then(function(){                
                });
            }  
            else if(options.page === 'create') {
                can.when(
                    Models.Canyin.comment_create({id: $.cookie("canyin_shop_id"), comment_id: $.cookie("canyin_comment_id")}, function(data){
                    })
                ).then(function(){
                });
            }

            easyUtils.set_current_menu('menu_canyin');
        },
        'li click': function(element) {
            if(element.attr('id') !== undefined)
                $.cookie("canyin_comment_id", element.attr('id'));
            alert($.cookie("canyin_comment_id"));
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
                    alert("update");
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
                    alert("delete");
                    $('#' + $.cookie("canyin_comment_id")).remove();
                });                
            }
        },                    
        get_current_user: function(current_user) {
            return defaults.current_user;
        }
    });
});