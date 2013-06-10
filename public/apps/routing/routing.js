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
                if(widget === 'canyin') {

                    steal('/apps/canyin/canyin.js', function() {
                        new Apps.CanyinCtrl(document.body, {canyin: sub});
                    });
                } 
                else if(widget === 'feature')  {
                    steal('/apps/feature/feature.js', function() {
                        new Apps.FeatureCtrl(document.body, {feature: sub});
                    });
                } 
                else {
                }

            } else {
                steal('/apps/layout/layout.js', function() {
                    new Apps.LayoutCtrl(document.body);
                });
            }
        }
});