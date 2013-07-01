/**
 * This is fixture for test without Canyin Restful API.
 */
Apps.canyinData = {};

can.fixture('GET /canyin/shops', function() {
    return [{'_id': can.fixture.rand(10000000, 999999), 'description': 'Aenean iaculis sodales dui, non hendrerit lorem rhoncus ut.Aenean iaculis sodales dui', 'style': 'chinese-style', 'shopwebsite': 'www.edian.com', 'shopname': 'Ken De Ji', 'shoplogo': '/images/portfolio/' + can.fixture.rand(1, 9) + '.jpg'},
        {'_id': can.fixture.rand(10000000, 999999), 'description': 'Aenean iaculis sodales dui, non hendrerit lorem rhoncus ut.', 'style': 'western-style','shopwebsite': 'www.edian.com', 'shopname': 'Ken De Ji', 'shoplogo': '/images/portfolio/' + can.fixture.rand(1, 9) + '.jpg'},
        {'_id': can.fixture.rand(10000000, 999999), 'description': 'Description', 'style': 'chinese-style','shopwebsite': 'www.edian.com', 'shopname': 'Ken De Ji', 'shoplogo': '/images/portfolio/' + can.fixture.rand(1, 9) + '.jpg'},
        {'_id': can.fixture.rand(10000000, 999999), 'description': 'Donec et eros leo, non pellentesque arcu. Curabitur vitae mi enim, at vestibulum magna. Cum sociis natoque penatibus et magnis dis parturient montes, Aenean iaculis sodales dui, non hendrerit lorem rhoncus ut.', 'style': 'western-style','shopwebsite': 'www.edian.com', 'shopname': 'Ken De Ji', 'shoplogo': '/images/portfolio/' + can.fixture.rand(1, 9) + '.jpg'},
        {'_id': can.fixture.rand(10000000, 999999), 'description': 'Description', 'style': 'western-style','shopwebsite': 'www.edian.com', 'shopname': 'Ken De Ji', 'shoplogo': '/images/portfolio/' + can.fixture.rand(1, 9) + '.jpg'},
        {'_id': can.fixture.rand(10000000, 999999), 'description': 'Description', 'style': 'western-style','shopwebsite': 'www.edian.com', 'shopname': 'Ken De Ji', 'shoplogo': '/images/portfolio/' + can.fixture.rand(1, 9) + '.jpg'},
        {'_id': can.fixture.rand(10000000, 999999), 'description': 'Description', 'style': 'western-style','shopwebsite': 'www.edian.com', 'shopname': 'Ken De Ji', 'shoplogo': '/images/portfolio/' + can.fixture.rand(1, 9) + '.jpg'}];
});

can.fixture('GET /canyin/ads', function() {
    return [{'shopwebsite': 'www.edian.com', 'shoplogo': '/images/slider/' + can.fixture.rand(1, 3) + '.jpg'},
        {'shopwebsite': 'www.edian.com', 'shoplogo': '/images/slider/' + can.fixture.rand(1, 3) + '.jpg'},
        {'shopwebsite': 'www.edian.com', 'shoplogo': '/images/slider/' + can.fixture.rand(1, 3) + '.jpg'}];
});

can.fixture('GET /canyin/promotion', function() {
    return [{'_id': can.fixture.rand(10000000, 999999), 'description': 'Description', 'style': 'chinese-style', 'shopwebsite': 'www.edian.com', 'shopname': 'Ken De Ji', 'shoplogo': '/images/portfolio/' + can.fixture.rand(1, 9) + '.jpg'},
        {'_id': can.fixture.rand(10000000, 999999), 'description': 'Description', 'style': 'western-style','shopwebsite': 'www.edian.com', 'shopname': 'Ken De Ji', 'shoplogo': '/images/portfolio/' + can.fixture.rand(1, 9) + '.jpg'},
        {'_id': can.fixture.rand(10000000, 999999), 'description': 'Description', 'style': 'chinese-style','shopwebsite': 'www.edian.com', 'shopname': 'Ken De Ji', 'shoplogo': '/images/portfolio/' + can.fixture.rand(1, 9) + '.jpg'},
        {'_id': can.fixture.rand(10000000, 999999), 'description': 'Description', 'style': 'western-style','shopwebsite': 'www.edian.com', 'shopname': 'Ken De Ji', 'shoplogo': '/images/portfolio/' + can.fixture.rand(1, 9) + '.jpg'},
        {'_id': can.fixture.rand(10000000, 999999), 'description': 'Description', 'style': 'western-style','shopwebsite': 'www.edian.com', 'shopname': 'Ken De Ji', 'shoplogo': '/images/portfolio/' + can.fixture.rand(1, 9) + '.jpg'}];
});

can.fixture('GET /canyin/shop/{id}', function() {
    return {'_id': can.fixture.rand(10000000, 999999), 'shopbadt': [90, 70, 80, 90, 100, 110, 120], 'shopgoodt': [15, 25, 35, 45, 55, 65, 75]};
});

can.fixture('POST /canyin/shop', function() {
    return true;
});

can.fixture('PUT /canyin/shop/{id}', function() {
    return true;
});

can.fixture('DELETE /canyin/shop/{id}', function() {
    return true;
});

can.fixture('PUT /canyin/shop/{id}/visit', function() {
    return true;
});

can.fixture('PUT /canyin/shop/{id}/bad', function() {
    return true;
});

can.fixture('PUT /canyin/shop/{id}/good', function() {
    return true;
});

can.fixture('GET /canyin/shop/{id}/comments', function() {
    return [{'_id': can.fixture.rand(10000000, 999999), 'username': 'Adam White', 'comment': 'I like this site, has inline comments I like this site, has inline comments I like this site, has inline comments I like this site, has inline comments I like this site, has inline comments I like this site, has inline comments', 'createtime': '25 Apr 2013'},
        {'_id': can.fixture.rand(10000000, 999999), 'username': 'Guest', 'comment': 'I like this site', 'createtime': '25 Apr 2013'},
        {'_id': can.fixture.rand(10000000, 999999), 'username': 'Tom Sawyer', 'comment': 'I like this site', 'createtime': '25 Apr 2013'},
        {'_id': can.fixture.rand(10000000, 999999), 'username': 'Tom Sawyer', 'comment': 'I like this site, has inline comments', 'createtime': '25 Apr 2013'},
        {'_id': can.fixture.rand(10000000, 999999), 'username': 'Adam White', 'comment': 'I like this site', 'createtime': '25 Apr 2013'},
        {'_id': can.fixture.rand(10000000, 999999), 'username': 'Adam White', 'comment': 'I like this site, has inline comments', 'createtime': '25 Apr 2013'},
        {'_id': can.fixture.rand(10000000, 999999), 'username': 'Guest', 'comment': 'I like this site', 'createtime': '25 Apr 2013'},
        {'_id': can.fixture.rand(10000000, 999999), 'username': 'Tom Sawyer', 'comment': 'I like this site', 'createtime': '25 Apr 2013'},
        {'_id': can.fixture.rand(10000000, 999999), 'username': 'Tom Sawyer', 'comment': 'I like this site, has inline comments', 'createtime': '25 Apr 2013'},
        {'_id': can.fixture.rand(10000000, 999999), 'username': 'Adam White', 'comment': 'I like this site', 'createtime': '25 Apr 2013'}];        
});

can.fixture('GET /canyin/shop/{id}/comment', function() {
    return {'_id': 22222, 'username': 'Guest', 'comment': 'I like this site', 'createtime': '25 Apr 2013'};
});

can.fixture('PUT /canyin/shop/{id}/comment', function() {
    return true;
});

can.fixture('POST /canyin/shop/{id}/comment', function() {
    return true;
});

can.fixture('DELETE /canyin/shop/{id}/comment', function() {
    return true;
});

can.fixture('GET /canyin/shop/{id}/news', function() {
    return true;
});
