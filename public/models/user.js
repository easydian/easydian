can.Model("Models.User", {
    findOne: 'GET /users/{id}',
    currentUser: function() {
        return can.ajax({
            url: '/current_user',
            type: 'get'
        });
    },
    login: function(params) {
        return can.ajax({
            url: '/login',
            type: 'post',
            dataType: 'json',
            data: params
        });
    },
    logout: function() {
         return can.ajax({
            url: '/logout',
            type: 'delete'
        });   
    },
    create: 'POST /users',
    update: 'PUT /users/{id}',
    destroy: 'DELETE /users/{id}',
},{
    init: function() { 
        this.attr('id', this._id); 
    }
});