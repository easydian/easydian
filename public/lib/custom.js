/* =========================================================
Social icons hover
============================================================ */
jQuery(document).ready(function(){
   
    jQuery(".social-links a").mouseenter(function(){
        jQuery(this).find('img').fadeTo(300, 0);
    }).mouseleave(function(){
        jQuery(this).find('img').fadeTo(300, 1);
    });	
});		
/* =========================================================
Create mobile menu
============================================================ */
function createMobileMenu(menu_id, mobile_menu_id){
    // Create the dropdown base
    jQuery("<select />").appendTo(menu_id);
    jQuery(menu_id).find('select').first().attr("id",mobile_menu_id);
    
    // Populate dropdown with menu items
    jQuery(menu_id).find('a').each(function() {        
        var el = jQuery(this);       
        
        var selected = '';
        if (el.parent().hasClass('current-menu-item') == true){
            selected = "selected='selected'";
        }        
        
        var depth = el.parents("ul").size();
        var space = '';
        if(depth > 1){
            for(i=1; i<depth; i++){
                space += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
            }
        }        
        
        jQuery("<option "+selected+" value='"+el.attr("href")+"'>"+space+el.text()+"</option>").appendTo(jQuery(menu_id).find('select').first());
    });
    jQuery(menu_id).find('select').first().change(function() {
        window.location = jQuery(this).find("option:selected").val();
    });    
}

jQuery(document).ready(function(){
    if(jQuery('#main-menu').length > 0){
        createMobileMenu('#main-menu','responsive-menu');	
    }
});
/* =========================================================
Fix css
============================================================ */
jQuery(document).ready(function(){
	jQuery("#footer-sidebar ul li:last-child").css("margin-bottom",0);
	jQuery("#contact-info li:last-child").css({'border-bottom':'none', 'padding-bottom':0});
	jQuery(".table-4col .features li:last-child").css("border-bottom","none");
	//jQuery("#sidebar-b .widget .categories li:last-child").css("border-bottom","none");
	jQuery("#right-sidebar .widget ul li:last-child").css({'border-bottom':'none', 'padding-bottom':0});
	
 });
/* =========================================================
Image Hover
============================================================ */
 $(document).ready(function(){
    $(".image-hover img").mouseenter(function(){
		$(this).fadeTo(500, 0.4);
	}).mouseleave(function(){
		$(this).fadeTo(400, 1);
	});
  });
/* =========================================================
Home page slider
============================================================ */
jQuery(function() {
			
	$('#da-slider').cslider({
		autoplay: true,
		bgincrement : 0
	});
});
/* =========================================================
CMS icons hover
============================================================ */
jQuery(document).ready(function(){
    jQuery(".feature-services .one-forth").mouseenter(function(){
		jQuery(this).find('img').fadeTo(300, 0);
	}).mouseleave(function(){
		jQuery(this).find('img').fadeTo(300, 1);
	});	
});
 /* =========================================================
Testimonials
============================================================ */		
jQuery(function() {
	jQuery('.flexslider').flexslider({
	  slideshowSpeed: 5000,
	  slideDirection: "vertical",
	  prevText: "Up",
	  nextText: "Down",
	  animation: "slide",
	  slideshow: true, 
	  controlsContainer: ".flexslider"
  });
});

/* =========================================================
Scroll to top
============================================================ */
jQuery(document).ready(function(){	
		// scroll body to 0px on click
		jQuery('#scroll-to-top').click(function () {
			jQuery('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	
});
/* =========================================================
prettyPhoto
============================================================ */
jQuery(document).ready(function(){
    jQuery("a[rel^='prettyPhoto']").mouseenter(function(){
        jQuery(this).find('img').fadeTo(500, 0.6);
    }).mouseleave(function(){
        jQuery(this).find('img').fadeTo(400, 1);
    });
});
/* =========================================================
Tabs
============================================================ */

jQuery(document).ready(function() {
//Default Action Product Tab
	jQuery(".tab-content").hide(); //Hide all content
	jQuery("ul.tabs li:first").addClass("active").show(); //Activate first tab
	jQuery(".tab-content:first").show(); //Show first tab content
	//On Click Event Product Tab
	jQuery("ul.tabs li").click(function() {
		jQuery("ul.tabs li").removeClass("active"); //Remove any "active" class
		jQuery(this).addClass("active"); //Add "active" class to selected tab
		jQuery(".tab-content").hide(); //Hide all tab content
		var activeTab = jQuery(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
		jQuery(activeTab).fadeIn(); //Fade in the active content

		return false;		
	});
});

