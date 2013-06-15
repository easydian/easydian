(function(easyUtils, $, undefined) {
    easyUtils.sort_object = function(arr, prop, flag) {
        return arr.sort(function(item1, item2) {
            var first, second;
            if(flag === true) {
                first = item1[prop].toLowerCase();
                second = item2[prop].toLowerCase();
            } else {
                first = item1[prop];
                second = item2[prop];
            }
            if(first < second) return -1;
            if(first > second) return 1;
            return 0;
        });
    }

    easyUtils.clean_element = function(selector) {
        var parent = $("#" + selector).parent();
        $("#" + selector).remove();
        parent.append('<div id="' + selector + '"></div>');
    };

    easyUtils.recover_element = function(selector, id) {
        selector.append('<div id="' + id + '"></div>');
    };    

    easyUtils.empty_body = function(selector) {
        $(document.body).empty();
        $(document.body).removeClass(selector);
    };

    easyUtils.reset_layout = function(element) {
        var layout_ejs_dir = '/apps/layout/ejs/';
        element.html(can.view(layout_ejs_dir + 'template.ejs'));
        $('#header').html(can.view(layout_ejs_dir  + 'header.ejs'));
        $('#footer').html(can.view(layout_ejs_dir  + 'footer.ejs')); 
    }

    easyUtils.set_current_menu = function(selector, sub) {
        $('.menu_wrap li').removeClass('current');
        $('#' + selector).addClass('current');

        if(sub)
            $('#' + sub).addClass('current');
    }

    easyUtils.set_account_hover = function() {
        $('#account_menu').hover(function() {
            $(this).animate({
                'height' : '78px'
            }, 200);
            $(this).find('#account_title').animate({
                backgroundColor: '#6ea9c8'
            }, 200);
        }, function() {
            $(this).animate({
                'height' : '20px'
            }, 200);
            $(this).find('#account_title').animate({
                backgroundColor: '#006599'
            }, 200);
        });
    };

    easyUtils.distributeVertical = function(container, items){
        var containerSpace = container.height();
        var items = items || container.children();
        var childAggregateHeight = easyUtils.aggregateHeight(items);
        var freeSpace = containerSpace - childAggregateHeight;
        
        if(freeSpace < 0){
            return false;
        }
        
        var spacerCount = items.length - 1;
        
        if(spacerCount > 0){
            var spaceHeight = freeSpace / spacerCount;
            items.css({
                "margin-bottom" : spacerHeight + "px",
                "margin-top" : 0
            });
        }else{
            var spacerHeight = (freeSpace / 2);
            items.css({ 
                "margin-bottom" : spacerHeight + "px", 
                "margin-top" : spacerHeight + "px" 
            });
        }
        return true;
    };

    easyUtils.aggregateHeight = function aggregateHeight(items){
        var height = 0;
        items.each(function(){
            var el = $(this);
            height += el.height();
        });
        
        return height;
    };

    easyUtils.parsePx = function parsePx(value) {
        if(value === null || value === undefined){
            return 0;
        }
        return parseInt(value.replace("px", ""));
    }

    easyUtils.date_helper = function(data) {
        if(data !== "undefined") {
            var date = new Date(data);
            return ((date.getMonth() + 1) + '/' + 
                     date.getDate() + '/' + 
                     (date.getFullYear() + '').substring(2, 4));
        } else {
            return " ";
        }    
    };

    easyUtils.validate_field = function(ui, field, value) {
        var result = true;
        var regex  = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i;
        ui.find('#' + field).removeClass('f-label');
        if(typeof(value) !== 'undefined') {
            if(field === 'email' || field === 'password') {
                if(value === "") {
                    ui.find('.' + field + '_err').text('cannot be blank');
                    ui.find('#' + field).addClass('f-label');
                    result = false;
                }
                if(field === 'email') {
                    if(!regex.test(value)) {
                        ui.find('.' + field + '_err').text('invalid email');
                        ui.find('#' + field).addClass('f-label');
                        result = false;
                    }
                }
                if(field == 'password') {
                    if(value.length < 7) {
                        ui.find('.' + field + '_err').text('minimum is 7 characters');
                        ui.find('#' + field).addClass('f-label');
                        result = false;
                    } else {
                        ui.find('.' + field + '_err').text('');
                    }
                }
            } else if(field === 'role') {
                if(value === "") {
                    ui.find('.' + field + '_err').text('please select one');
                    ui.find('#select_' + field).addClass('f-label');
                    result = false;
                }
            }
        }
        return result;
    };

	// Array Remove - By John Resig (MIT Licensed)
	Array.prototype.remove = function(from, to) {
		var rest = this.slice((to || from) + 1 || this.length);
		this.length = from < 0 ? this.length + from : from;
		return this.push.apply(this, rest);
	};

    $.extend(can.Observe.prototype, {'toJSON': function(){
        var data = this['_data'];
        var result = {};
        for(var property in data) {
            if(this.hasOwnProperty(property)) {
                if(data[property] instanceof can.Observe) { 
                    result[property] = data[property].toJSON();
                } else if(data[property] instanceof can.Observe.List) { 
                    result[property] = data[property].toJSON();
                } else { 
                    result[property] = data[property];
                }
            } 
        }
        return result;
    }});

    $.extend(can.Observe.List.prototype, {'toJSON': function(){
        var result = [];
        for(var i = 0; i < this.length; i++) {
            if(this[i].toJSON) {
                result.push(this[i].toJSON());
            } else {
                result.push(this[i]);
            }
        }
        return result;
    }});
}(window.easyUtils = window.easyUtils || {}, jQuery));
