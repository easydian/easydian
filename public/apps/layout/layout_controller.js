can.Control('Apps.LayoutCtrl', {
    pluginName: 'layout',
    defaults: {
        current_user: null
    }
},
{
    init: function(element, options) {
        easyUtils.set_title('Home');
        var layout_ejs_dir = '/apps/layout/ejs/';
        can.when(
            Models.Canyin.ads(function(data){
                element.append(can.view(layout_ejs_dir  + 'slider.ejs', {'ads': data}));
            })
        ).then(function(){
            steal('camera', function() {
                //Slider
                $('#camera_wrap_1').camera({height: '30%'});
            });            
        });

        easyUtils.set_current_menu('menu_home');
    },
    get_current_user: function(current_user) {
        return defaults.current_user;
    }
});