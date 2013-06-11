Hashtagagram
============

Embeds Instagram pics that have a specified #tag

You will need to grab a client ID: http://instagram.com/developer/clients/manage/

```javascript
$(function(){
	$('div#instagram-pics').hashtagagram({
    	client_id: 'abc123',
    	tag_name: 'babes', // the tag name
    	count: 6, // number of photos
    	thumb_dimension: 150, // instagram provides images at 150, 306 & 612px
    	enable_cache: false, // enable or disable cache
    	cache_duration: 1, // number of days (be nice to Instagrammy if you have hordes of visitors)
    	show_likes: true, // show the like count of the associated image
    	show_comments: true, // show the comment count of the associated image
    	meta_class: 'insta-meta' // rename the class of the comment/like count wrapper
  });
});
```

### History ###
**1.0.1 - 11/06/2013**
* Added: Show likes and show comments options
* Added: Ability to name comment/like count wrapper
* Updated: Thumbnail dimension to match instagram default