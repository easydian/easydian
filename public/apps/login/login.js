steal(
    'apps/login/login.css',
)
.then(function() {
    can.Control('Apps.LoginCtrl', {
        pluginName: 'login'
    },
    {
        init: function(element) {
            var self = this;
            this.element.html(can.view('apps/login/ejs/login.ejs'));
        },
        "#login_form submit": function(ele, eve) {
            eve.preventDefault();
            formParams = ele.formParams();
            alert("Input: " + formParams);
        }
    });
});