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

        var $page_container = $('#page_container');
        if(options.page == 'scaffolding') {
            easyUtils.set_current_menu('menu_feature', 'menu_scaffolding');
            $page_container.append(can.view(layout_ejs_dir  + 'breadcrumb.ejs', {hash: 'feature', type: 'Feature', 'page': 'Scaffolding'}));
            $page_container.append(can.view(feature_ejs_dir  + 'scaffolding.ejs'));
        }
        else if(options.page == 'shortcodes'){
            easyUtils.set_current_menu('menu_feature', 'menu_shortcodes');
            $page_container.append(can.view(layout_ejs_dir  + 'breadcrumb.ejs', {hash: 'feature', type: 'Feature', 'page': 'Short Codes'}));
            $page_container.append(can.view(feature_ejs_dir  + 'shortcodes.ejs'));
        }
        else if(options.page == 'tables'){
            easyUtils.set_current_menu('menu_feature', 'menu_tables');
            $page_container.append(can.view(layout_ejs_dir  + 'breadcrumb.ejs', {hash: 'feature', type: 'Feature', 'page': 'Tables'}));
            $page_container.append(can.view(feature_ejs_dir  + 'tables.ejs'));
        }
        else {
            easyUtils.set_current_menu('menu_feature', 'menu_typography');
            $page_container.append(can.view(layout_ejs_dir  + 'breadcrumb.ejs', {hash: 'feature', type: 'Feature', 'page': 'Typography'}));
            $page_container.append(can.view(feature_ejs_dir  + 'typography.ejs'));
        }             
    },
    get_current_user: function(current_user) {
        return defaults.current_user;
    }
});