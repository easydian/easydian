can.Control('Apps.RoutingCtrl', {
        pluginName: 'routing'
    },
    {
        'route': function(data) {
            this.handle_route(data);
        },
        ':widget route': function(data) {
            this.handle_route(data);
        },
        ':widget/:sub route': function( data ) {
            this.handle_route(data);
        },
        handle_route: function(data){
            var widget = data['widget'];
            var sub    = data['sub'];
            app_state.attr('route', {'widget': widget, 'sub': sub});
            if(widget) {
                if(widget === 'canyin' && sub === undefined) {
                    steal('/apps/canyin/canyin.js', function() {
                        new Apps.CanyinCtrl(document.body);
                    });
                } else if(widget === 'canyin' && sub === 'comment')  {
                    alert(sub);
                    steal('/apps/canyin/canyin_comment.js', function() {
                        new Apps.CanyinCommentCtrl(document.body);
                    });
                }
            } else {
                steal('/apps/layout/layout.js', function() {
                    new Apps.LayoutCtrl(document.body);
                });
            }
        }
});