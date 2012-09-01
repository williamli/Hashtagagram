Hashtagagram
============

Embeds Instagram pics that have a specified #tag

You will need to grab a client ID: http://instagram.com/developer/clients/manage/

```javascript
$(function(){
	$('div#instagram-pics').hashtagagram({
    client_id: 'abc123',
    tag_name: 'babes', //the tag name
    count: 6, // number of photos
    thumb_dimension: 110,
    enable_cache: false, //Enable or Disable cache
    cache_duration: 1/12, //Number of days
  });
});
```