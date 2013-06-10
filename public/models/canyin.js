can.Model("Models.Canyin", {
    findAll: 'GET     /canyin/shops',
    findOne: 'GET     /canyin/shops/{id}',
    create : 'POST    /canyin/shops',
    update : 'PUT     /canyin/shops/{id}',
    destroy: 'DELETE  /canyin/shops/{id}',
    visit: function(id) {
        return can.ajax({
            url:  '/canyin/shops/' + id + '/visit',
            type: 'put'
        });
    },
    add_comment_bad: function(id) {
        return can.ajax({
            url:  '/canyin/shops/' + id + '/bad',
            type: 'put'
        });
    },
    add_comment_good: function(id) {
        return can.ajax({
            url:  '/canyin/shops/' + id + '/good',
            type: 'put'
        });
    },
    comments: function(id, params, success) {
        var self = this;
        return can.ajax({
            url:  '/canyin/shops/' + id + '/comments',
            type: 'get',
            dataType: 'json',
            data: params,
            success: success
        });
    }, 
    add_comment: function(id, data) {
        var self = this;
        return can.ajax({
            url:  '/canyin/shops/' + id + '/comment',
            type: 'post',
            dataType: 'json',
            data: data
        });
    },
    update_comment: function(id, data) {
        var self = this;
        return can.ajax({
            url:  '/canyin/shops/' + id + '/comment',
            type: 'put',
            dataType: 'json',
            data: data
        });
    }, 
    delete_comment: function(id, data) {
        var self = this;
        return can.ajax({
            url:  '/canyin/shops/' + id + '/comment',
            type: 'delete',
            dataType: 'json',
            data: data
        });
    }, 
    news: function(id, params) {
        var self = this;
        return can.ajax({
            url:  '/canyin/shops/' + id + '/news',
            type: 'get',
            dataType: 'json',
            data: params
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

