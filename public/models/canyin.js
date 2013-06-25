can.Model("Models.Canyin", {
    findAll: 'GET     /canyin/shops',
    findOne: 'GET     /canyin/shop/{id}',
    create : 'POST    /canyin/shop',
    update : 'PUT     /canyin/shop/{id}',
    destroy: 'DELETE  /canyin/shop/{id}',
    praise: function(id, success) {
        return can.ajax({
            url:  '/canyin/shop/' + id + '/bad',
            type: 'put',
            success: success
        });
    },
    criticize: function(id, success) {
        return can.ajax({
            url:  '/canyin/shop/' + id + '/good',
            type: 'put',
            success: success
        });
    },
    visit: function(id, success) {
        return can.ajax({
            url:  '/canyin/shop/' + id + '/visit',
            type: 'put'
        });
    }, 
    news: function(id, params, success) {
        var self = this;
        return can.ajax({
            url:  '/canyin/shop/' + id + '/news',
            type: 'get',
            dataType: 'json',
            data: params,
            success: success
        });
    }, 
    ads: function(success) {
        var self = this;
        return can.ajax({
            url:  '/canyin/ads',
            type: 'get',
            dataType: 'json',
            success: success
        });
    }, 
    promotion: function() {
        var self = this;
        return can.ajax({
            url:  '/canyin/promotion',
            type: 'get',
            dataType: 'json'
        });
    },
    comments: function(id, params, success) {
        var self = this;
        return can.ajax({
            url:  '/canyin/shop/' + id + '/comments',
            type: 'get',
            data: params,
            dataType: 'json'
        });
    }, 
    comment_create: function(id, params, success) {
        var self = this;
        return can.ajax({
            url:  '/canyin/shop/' + id + '/comment',
            type: 'post',
            dataType: 'json',
            data: params,
            success: success
        });
    }, 
    comment_update: function(id, comment_id, params, success) {
        var self = this;
        return can.ajax({
            url:  '/canyin/shop/' + id + '/comment',
            type: 'put',
            dataType: 'json',
            data: params,
            success: success
        });
    }, 
    comment_destroy: function(id, comment_id, params, success) {
        var self = this;
        return can.ajax({
            url:  '/canyin/shop/' + id + '/comment',
            type: 'delete',
            dataType: 'json',
            data: params,
            success: success
        });
    }        
}, {
    init : function() {
        var self = this;
        self.attr('data', Apps.canyinData);
        //TODO get from server
        // $.ajax({
        // url : "/test",
        // async : false,
        // dataType : "json",
        // success : function(data) {
        // self.attr('test', data);
        //}
        // });
    }
});

can.Model("Models.CanyinComment", {
    findAll: 'GET     /canyin/shop/{id}/comments',
    findOne: 'GET     /canyin/shop/{id}/comment/{comment_id}',
    create : 'POST    /canyin/shop/{id}/comment',
    update : 'PUT     /canyin/shop/{id}/comment/{comment_id}',
    destroy: 'DELETE  /canyin/shop/{id}/comment/{comment_id}'
}, {
        init : function() {
        var self = this;
        self.attr('data', Apps.canyinData);
        //TODO get from server
        // $.ajax({
        // url : "/test",
        // async : false,
        // dataType : "json",
        // success : function(data) {
        // self.attr('test', data);
        //}
        // });
    }
});

