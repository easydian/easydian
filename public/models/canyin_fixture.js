/**
 * This is fixture for test without Canyin Restful API.
 */
Apps.canyinData = {};

var random = function(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
};

can.fixture('GET /canyin/shops', function() {
    return [{'_id': random(10000000, 999999), 'description': 'Description', 'style': 'chinese-style', 'shopwebsite': 'www.edian.com', 'shopname': 'Ken De Ji', 'shoplogo': '/images/portfolio/' + random(1, 9) + '.jpg'},
        {'_id': random(10000000, 999999), 'description': 'Description', 'style': 'western-style','shopwebsite': 'www.edian.com', 'shopname': 'Ken De Ji', 'shoplogo': '/images/portfolio/' + random(1, 9) + '.jpg'},
        {'_id': random(10000000, 999999), 'description': 'Description', 'style': 'chinese-style','shopwebsite': 'www.edian.com', 'shopname': 'Ken De Ji', 'shoplogo': '/images/portfolio/' + random(1, 9) + '.jpg'},
        {'_id': random(10000000, 999999), 'description': 'Description', 'style': 'western-style','shopwebsite': 'www.edian.com', 'shopname': 'Ken De Ji', 'shoplogo': '/images/portfolio/' + random(1, 9) + '.jpg'},
        {'_id': random(10000000, 999999), 'description': 'Description', 'style': 'western-style','shopwebsite': 'www.edian.com', 'shopname': 'Ken De Ji', 'shoplogo': '/images/portfolio/' + random(1, 9) + '.jpg'}];
});

can.fixture('GET /canyin/ads', function() {
    return [{'shopwebsite': 'www.edian.com', 'shoplogo': '/images/slider/' + random(1, 3) + '.jpg'},
        {'shopwebsite': 'www.edian.com', 'shoplogo': '/images/slider/' + random(1, 3) + '.jpg'},
        {'shopwebsite': 'www.edian.com', 'shoplogo': '/images/slider/' + random(1, 3) + '.jpg'}];
});

can.fixture('GET /canyin/promotion', function() {
    return [{'_id': random(10000000, 999999), 'description': 'Description', 'style': 'chinese-style', 'shopwebsite': 'www.edian.com', 'shopname': 'Ken De Ji', 'shoplogo': '/images/portfolio/' + random(1, 9) + '.jpg'},
        {'_id': random(10000000, 999999), 'description': 'Description', 'style': 'western-style','shopwebsite': 'www.edian.com', 'shopname': 'Ken De Ji', 'shoplogo': '/images/portfolio/' + random(1, 9) + '.jpg'},
        {'_id': random(10000000, 999999), 'description': 'Description', 'style': 'chinese-style','shopwebsite': 'www.edian.com', 'shopname': 'Ken De Ji', 'shoplogo': '/images/portfolio/' + random(1, 9) + '.jpg'},
        {'_id': random(10000000, 999999), 'description': 'Description', 'style': 'western-style','shopwebsite': 'www.edian.com', 'shopname': 'Ken De Ji', 'shoplogo': '/images/portfolio/' + random(1, 9) + '.jpg'},
        {'_id': random(10000000, 999999), 'description': 'Description', 'style': 'western-style','shopwebsite': 'www.edian.com', 'shopname': 'Ken De Ji', 'shoplogo': '/images/portfolio/' + random(1, 9) + '.jpg'}];
});

can.fixture('GET /canyin/shop/{id}', function() {
    return {'_id': random(10000000, 999999), 'shopbadt': [90, 70, 80, 90, 100, 110, 120], 'shopgoodt': [15, 25, 35, 45, 55, 65, 75]};
});

can.fixture('POST /canyin/shop', function() {
    return 'OK';
});

can.fixture('PUT /canyin/shop/{id}', function() {
    return 'OK';
});

can.fixture('DELETE /canyin/shop/{id}', function() {
    return 'OK';
});

can.fixture('PUT /canyin/shop/{id}/visit', function() {
    return 'OK';
});

can.fixture('PUT /canyin/shop/{id}/bad', function() {
    return 'OK';
});

can.fixture('PUT /canyin/shop/{id}/good', function() {
    return 'OK';
});

can.fixture('GET /canyin/shop/{id}/comments', function() {
    return [{'_id': 111111, 'username': 'Adam White', 'comment': 'I like this site, has inline comments', 'createtime': '25 Apr 2013', 'inline': false, 'reply_id': '22222'},
        {'_id': random(10000000, 999999), 'username': 'Guest', 'comment': 'I like this site', 'createtime': '25 Apr 2013', 'inline': false, 'reply_id': ''},
        {'_id': random(10000000, 999999), 'username': 'Tom Sawyer', 'comment': 'I like this site', 'createtime': '25 Apr 2013', 'inline': false, 'reply_id': ''},
        {'_id': 33333, 'username': 'Tom Sawyer', 'comment': 'I like this site, has inline comments', 'createtime': '25 Apr 2013', 'inline': false, 'reply_id': '44444'},
        {'_id': random(10000000, 999999), 'username': 'Adam White', 'comment': 'I like this site', 'createtime': '25 Apr 2013', 'inline': false, 'reply_id': ''}];
});

can.fixture('GET /canyin/shop/{id}/comment', function() {
    alert('dkfdjkfjd');
    return [{'_id': 111111, 'username': 'Adam White', 'comment': 'I like this site, has inline comments', 'createtime': '25 Apr 2013', 'inline': false, 'reply_id': '22222'},
        {'_id': random(10000000, 999999), 'username': 'Guest', 'comment': 'I like this site', 'createtime': '25 Apr 2013', 'inline': false, 'reply_id': ''},
        {'_id': random(10000000, 999999), 'username': 'Tom Sawyer', 'comment': 'I like this site', 'createtime': '25 Apr 2013', 'inline': false, 'reply_id': ''},
        {'_id': 33333, 'username': 'Tom Sawyer', 'comment': 'I like this site, has inline comments', 'createtime': '25 Apr 2013', 'inline': false, 'reply_id': '44444'},
        {'_id': random(10000000, 999999), 'username': 'Adam White', 'comment': 'I like this site', 'createtime': '25 Apr 2013', 'inline': false, 'reply_id': ''}];
});

can.fixture('GET /canyin/shop/{id}/comment/{comment_id}', function() {
    return {'_id': 22222, 'username': 'Guest', 'comment': 'I like this site', 'createtime': '25 Apr 2013', 'inline': true, 'reply_id': ''};
});

can.fixture('PUT /canyin/shop/{id}/comment', function() {
    return 'OK';
});

can.fixture('POST /canyin/shop/{id}/comment', function() {
    return 'OK';
});

can.fixture('DELETE /canyin/shop/{id}/comment', function() {
    return 'OK';
});

can.fixture('GET /canyin/shop/{id}/news', function() {
    return 'OK';
});
