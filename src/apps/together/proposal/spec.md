---
layout: layout.hbs
---

# Specification

# Data

Our app uses the following structure for the database backend:

* rocknroll
  * admin
    * userName
		* userName
		* position
		* enable
  * customer
	* userName
		* userName
		* enable
		* voteSongID
  * songList
	  * songID
  		* songName
  		* upVote
  		* downVote
  		* enable
  		* songURL
  		* songImage
  * songDiscussion
		* discussionID
			* userName
			* comment
  * currentSong
    * songName
    * songURL
    * songImage



# Actions

The major actions of our app are:
* Login and Logout
* Voting for songs on a playlist
* Song suggestion
* Post a comment for a song
* Admin edits the song list

## Action: Login and Logout

### case: Admin logs in

``` javascript
// given
rocknroll.Admin.login is
{
  'userName': 
	'userName': 'willy',
	'position': 'c'
	'enable': enable
  'userName': 
	'userName': 'Alex',
	'position': 'c'	
	'enable': enable
  'userName': 
	'userName': 'betty',
	'position': 'c'	
	'enable': disable	
}

// when
user_logsin_viaGithub(id = 'betty',password='1234')

// then
rocknroll.Admin.login should be
{
  'userName': 
	'userName': 'willy',
	'position': 'c'
	'enable': enable	
  'userName': 
	'userName': 'Alex',
	'position': 'c'	
	'enable': enable	
  'userName': 
	'userName': 'Betty',
	'position': 'c'	
	'enable': enable	
}
```

### case: Admin logs out

``` javascript
// given
rocknroll.Admin.login is
{
  'userName': 
	'userName': 'willy',
	'position': 'c'
	'enable': 'enable'
  'userName': 
	'userName': 'Alex',
	'position': 'c'	
	'enable': 'enable'
  'userName': 
	'userName': 'betty',
	'position': 'c'	
	'enable': 'enable'	
}

// when
user_clicks_logout()

// then
rocknroll.Admin.logs out should be
{
  'userName': 
	'userName': 'willy',
	'position': 'c'
	'enable': 'enable'	
  'userName': 
	'userName': 'Alex',
	'position': 'c'	
	'enable': 'enable'	
  'userName': 
	'userName': 'Betty',
	'position': 'c'	
	'enable': 'disable'	
}
```

### case: User logs in

``` javascript
// given
rocknroll.customer.login is
{
  'userName': 
	'userName': 'willy',
	'enable': 'enable',
	'voteSongID': '001'
  'userName': 
	'userName': 'Alex',
	'enable': 'enable',
	'voteSongID': '002'
  'userName': 
	'userName': 'betty',
	'enable': 'disable',
	'voteSongID': ''
}

// when
user_logsin_viaGithub(id = 'betty',password='1234')

// then
rocknroll.customer.login should be
{
  'userName': 
	'userName': 'willy',
	'enable': 'enable',
	'voteSongID': '001'
  'userName': 
	'userName': 'Alex',
	'enable': 'enable',
	'voteSongID': '002'
  'userName': 
	'userName': 'betty',
	'enable': 'enable',
	'voteSongID': ''
}
```

### case: User logs out

``` javascript
// given
rocknroll.customer.logout is
{
  'userName': 
	'userName': 'willy',
	'enable': 'enable',
	'voteSongID': '001'
  'userName': 
	'userName': 'Alex',
	'enable': 'enable',
	'voteSongID': '002'
  'userName': 
	'userName': 'betty',
	'enable': 'enable',
	'voteSongID': '003'
}

// when
user_clicks_logout()

// then
rocknroll.customer.login should be
{
  'userName': 
	'userName': 'willy',
	'enable': 'enable',
	'voteSongID': '001'
  'userName': 
	'userName': 'Alex',
	'enable': 'enable',
	'voteSongID': '002'
  'userName': 
	'userName': 'betty',
	'enable': 'disable',
	'voteSongID': '003'
}
```
## Action: Voting for songs on a playlist

### case: user 'a' up votes a song 'd'

``` javascript
// given
rocknroll.songlist.songid is
{
  'songname': 'd',
  'upvote': 'b',
  'downvote': 'c,e'
}

// when
upvote(user = 'a')

// then
rocknroll.songlist.songid is
{
  'songname': 'd',
  'upvote': 'b,a',
  'downvote': 'c,e'
}
reorder_songs()
```

### case: user 'a' down votes a song 'd'

``` javascript
// given
rocknroll.songlist.songid is
{
  'songname': 'd',
  'upvote': 'b',
  'downvote': 'c,e'
}

// when
downvote(user = 'a')

// then
rocknroll.songlist.songid is
{
  'songname': 'd',
  'upvote': 'b',
  'downvote': 'c,e,a'
}
reorder_songs()
```

### case: user 'a' changes from up vote to down vote for song 'd'

``` javascript
// given
rocknroll.songlist.songid is
{
  'songname': 'd',
  'upvote': 'b,a',
  'downvote': 'c,e'
}

// when
downvote(user = 'a')

// then
rocknroll.songlist.songid is
{
  'songname': 'd',
  'upvote': 'b',
  'downvote': 'c,e,a'
}
reorder_songs()
```

### case: user 'a' changes from down vote to up vote for song 'd'

``` javascript
// given
rocknroll.songlist.songid is
{
  'songname': 'd',
  'upvote': 'b',
  'downvote': 'c,e,a'
}

// when
upvote(user = 'a')

// then
rocknroll.songlist.songid is
{
  'songname': 'd',
  'upvote': 'b,a',
  'downvote': 'c,e'
}
reorder_songs()
```

## Action: Song suggestion

(TODO: cases)

## Action: Post a comment for a song

### case: user 'a' posts comment 'c' for song 'd'

``` javascript
// given
rocknroll.songDiscussion.d is
{
  'abcde':
  	'user': 'e',
  	'comment': 'hi',
  'abcdf': 
  	'user': 'f',
  	'comment': 'hello'
}

// when
comment(user = 'a', comment = 'c')

// then
rocknroll.songDiscussion.d should be
{
  'abcde':
  	'user': 'e',
  	'comment': 'hi',
  'abcdf': 
  	'user': 'f',
  	'comment': 'hello'
  'abcdg':
  	'user': 'a',
  	'comment': 'c'
}
```

### case: admin 'a' deletes comment 'hi' from user 'd' for song 'd'

``` javascript
// given
rocknroll.admin.a is
{
  'username': 'a',
  'position': 'c',
  'enable': enable
}
rocknroll.songDiscussion.d is
{
  'abcde':
  	'user': 'e',
  	'comment': 'hi',
  'abcdf': 
  	'user': 'f',
  	'comment': 'hello'
}

// when
comment(user = 'e', comment = 'hi')

// then
rocknroll.songDiscussion.d should be
{
  'abcdf': 
  	'user': 'f',
  	'comment': 'hello'
}
```

### case: user 'a' posts link 'c' for song 'd'

``` javascript
// given
rocknroll.songDiscussion.d is
{
  'abcde':
  	'user': 'e',
  	'comment': 'hi',
  'abcdf': 
  	'user': 'f',
  	'comment': 'hello'
}

// when
comment(user = 'a', comment = 'c')

// then
rocknroll.songDiscussion.d should be
{
  'abcde':
  	'user': 'e',
  	'comment': 'hi',
  'abcdf': 
  	'user': 'f',
  	'comment': 'hello',
  'abcdg':
  	'user': 'a',
  	'comment': 'c',
  	'link': yes
}
```

## Action: Admin edits the song list

### case: Admin a plays highest voted song b

``` javascript
// given
rocknroll.admin.a is
{
  'username': 'a',
  'position': 'c',
  'enable': enable
}
rocknroll.songlist is
{
  'songID': 'b, c, d, e, f',
}
rocknroll.songlist.songid is
{
  'songname': 'b',
  'upvote': 'b,a,ab,ba',
  'downvote': ''
}
rocknroll.songlist.currentSong is
{
  'songname': 'a',
}

// when
playNewSong(text = 'b')

// then
rocknroll.songlist is
{
  'songID': 'c, d, e, f',
}
rocknroll.songlist.currentSong is
{
  'songname': 'b',
}
```

### case: Admin a removes downvoted song f

``` javascript
// given
rocknroll.admin.a is
{
  'username': 'a',
  'position': 'c',
  'enable': enable
}
rocknroll.songlist is
{
  'songID': 'b, c, d, e, f',
}
rocknroll.songlist.songid is
{
  'songname': 'f',
  'upvote': '',
  'downvote': 'b,a,ab,ba'
}

// when
removeSong(text = 'f')

// then
rocknroll.songlist is
{
  'songID': 'b, c, d, e',
}
```

### case: Admin a removes duplicate song d

``` javascript
// given
rocknroll.admin.a is
{
  'username': 'a',
  'position': 'c',
  'enable': enable
}
rocknroll.songlist is
{
  'songID': 'b, c, d, d, e, f',
}

// when
removeSong(text = 'd')

// then
rocknroll.songlist is
{
  'songID': 'b, c, d, e, f',
}
```

(remove the example below before submission)

## Action: Post A Message (Example)

### case: post a message 'd'

``` javascript
// given
foo.bar.messages is
{
  '-cadsace': 'a',
  '-cadsacf': 'b',
  '-cadsacg': 'c'
}

// when
post_a_message(text = 'd')

// then
foo.bar.messages should be
{
  '-cadsace': 'a',
  '-cadsacf': 'b',
  '-cadsacg': 'c',
  '-cadsach': 'd',
}
```

### case: delete a message

``` javascript
// given
foo.bar.messages is
{
  '-cadsace': 'a',
  '-cadsacf': 'b',
  '-cadsacg': 'c'
}

// when
delete_a_message(id = '-cadsacg')

// then
foo.bar.messages should be
{
  '-cadsace': 'a',
  '-cadsacf': 'b'
}
```