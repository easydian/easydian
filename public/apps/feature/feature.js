steal(
    'header-footer'
)
.then('highcharts-exp')
.then(function() {
    can.Control('Apps.FeatureCtrl', {
        pluginName: 'feature',
        defaults: {
            current_user: null
        }
    },
    {
        init: function(element, options) {
            var feature_ejs_dir = '/apps/feature/ejs/';
            var layout_ejs_dir = '/apps/layout/ejs/';
            this.element.html(can.view(layout_ejs_dir + 'template.ejs'));
            $('#header').html(can.view(layout_ejs_dir  + 'header.ejs'));

            var $page_container = $('#page_container');
            if(options.feature == 'scaffolding') {
                $page_container.append(can.view(layout_ejs_dir  + 'breadcrumb.ejs', {hash: 'feature', type: 'Feature', 'page': 'Scaffolding'}));
                $page_container.append(can.view(feature_ejs_dir  + 'scaffolding.ejs'));
            }
            else if(options.feature == 'shortcodes'){
                $page_container.append(can.view(layout_ejs_dir  + 'breadcrumb.ejs', {hash: 'feature', type: 'Feature', 'page': 'Short Codes'}));
                $page_container.append(can.view(feature_ejs_dir  + 'shortcodes.ejs'));
            }
            else if(options.feature == 'tables'){
                $page_container.append(can.view(layout_ejs_dir  + 'breadcrumb.ejs', {hash: 'feature', type: 'Feature', 'page': 'Tables'}));
                $page_container.append(can.view(feature_ejs_dir  + 'tables.ejs'));
            }
            else {
                $page_container.append(can.view(layout_ejs_dir  + 'breadcrumb.ejs', {hash: 'feature', type: 'Feature', 'page': 'Typography'}));
                $page_container.append(can.view(feature_ejs_dir  + 'typography.ejs'));
            }
            
            $('#footer').html(can.view(layout_ejs_dir  + 'footer.ejs'));              
        },
        get_current_user: function(current_user) {
            return defaults.current_user;
        }
    });
});