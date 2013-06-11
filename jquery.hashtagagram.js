// Version 1.0.1

(function($){
$.fn.hashtagagram = function(options){
	var defaults = {
		client_id:'000000000000000000000000',
		thumb_dimension:150,
		success:ProcessData,
		load_cookie_result:LoadResultsFromCookie,
		tag_name: 'babes',
		count: 6,
		enable_cache: false,
		cache_duration: 1,
		cookie_name: 'CachedInstagramPhotos',
		show_likes: true,
		show_comments: true,
		show_labels: true,
		meta_class: 'insta-meta'
	};
	
	var self = $(this);
	var options = $.extend(defaults,options);
	defaults.cookie_name = defaults.cookie_name+'_'+defaults.tag_name;
	var url = 'https://api.instagram.com/v1/tags/'+defaults.tag_name+'/media/recent?client_id='+defaults.client_id;
	
	var init = function(){
		if(defaults.enable_cache){
			var savedResponse = readCookie(defaults.cookie_name);
			if(savedResponse != null && savedResponse != ''){
				defaults.load_cookie_result(savedResponse);
				return false;
			}
		}
		
		LoadResults();
	};
	
	var LoadResults = function(){
		$.ajax({
			dataType:'jsonp',
			url:url,
			success:function(response){
				defaults.success(response);
			}
		});
	
	};
	function LoadResultsFromCookie(savedResponse){
		self.append(savedResponse);
	};
	function ProcessData(response){
		if(response != null){
			var ul = $('<ul/>');
			console.log(response.data);
			$(response.data).each(function(index,obj){
				if(index == defaults.count)
					return false;
					
				var link = $('<a/>'), image = $('<img/>'), li = $('<li/>');
				
				if(defaults.show_likes || defaults.show_comments)
					var meta = $('<div class="'+defaults.meta_class+'">');
					
				if(defaults.show_likes)
					var likes = $('<div class="like-count">');
					if(defaults.show_labels){
						likes.html(obj.likes.count+' likes');
					}else{
						likes.html(obj.likes.count);
					}
					likes.appendTo(meta);
					
				if(defaults.show_comments)	
					var comments = $('<div class="comment-count">');
					if(defaults.show_labels){
						comments.html(obj.comments.count+' comments');
					}else{
						comments.html(obj.comments.count);
					}
					comments.appendTo(meta);
					
				image.attr({'src': obj.images.low_resolution.url,'width':defaults.thumb_dimension,'height': defaults.thumb_dimension});
				link.attr('href',obj.link);
				image.appendTo(link);
				if(defaults.show_likes || defaults.show_comments)
					meta.appendTo(link);
				link.appendTo(li);
				ul.append(li);
			});
			
			self.append(ul);
			
			if(defaults.enable_cache){
				createCookie(defaults.cookie_name,self.html(),defaults.cache_duration);
			}
		}
	};
	function createCookie(name,value,days) {
		if (days > 0) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	};
	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	};
	function eraseCookie(name) {
		createCookie(name,"",-1);
	};
	init();
	
}})(jQuery);