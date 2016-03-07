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
  		* artist
  		* upVote
  		* downVote
  		* enable
  		* songURL
  		* songImage
  * songDiscussion
    * discussionID
      * username
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
  'willy': 
	'userName': 'willy',
	'position': 'c'
	'enable': enable
  'Alex': 
	'userName': 'Alex',
	'position': 'c'	
	'enable': enable
  'betty': 
	'userName': 'betty',
	'position': 'c'	
	'enable': disable
  'tyler':
  	'userName': 'tyler',
	'position': 'c'	
	'enable': enable
}

// when
user_logsin_viaGithub(id = 'betty',password='1234')

// then
rocknroll.Admin.login should be
{
  'willy': 
	'userName': 'willy',
	'position': 'c'
	'enable': enable	
  'Alex': 
	'userName': 'Alex',
	'position': 'c'	
	'enable': enable	
  'Betty': 
	'userName': 'Betty',
	'position': 'c'	
	'enable': enable
  'tyler':
  	'userName': 'tyler',
	'position': 'c'	
	'enable': enable
}
```

### case: Admin logs out

``` javascript
// given
rocknroll.Admin.login is
{
  'willy': 
	'userName': 'willy',
	'position': 'c'
	'enable': 'enable'
  'Alex': 
	'userName': 'Alex',
	'position': 'c'	
	'enable': 'enable'
  'betty': 
	'userName': 'betty',
	'position': 'c'	
	'enable': 'enable'
  'tyler':
  	'userName': 'tyler',
	'position': 'c'	
	'enable': enable
}

// when
user_clicks_logout()

// then
rocknroll.Admin.logs out should be
{
  'willy': 
	'userName': 'willy',
	'position': 'c'
	'enable': 'enable'	
  'Alex': 
	'userName': 'Alex',
	'position': 'c'	
	'enable': 'enable'	
  'Betty': 
	'userName': 'Betty',
	'position': 'c'	
	'enable': 'disable'
  'tyler':
  	'userName': 'tyler',
	'position': 'c'	
	'enable': enable
}
```

### case: User logs in

``` javascript
// given
rocknroll.customer.login is
{
  'willy': 
	'userName': 'willy',
	'enable': 'enable',
	'voteSongID': '001'
  'Alex': 
	'userName': 'Alex',
	'enable': 'enable',
	'voteSongID': '002'
  'betty': 
	'userName': 'betty',
	'enable': 'disable',
	'voteSongID': ''
  'tyler': 
	'userName': 'tyler',
	'enable': 'enable',
	'voteSongID': '004'
}

// when
user_logsin_viaGithub(id = 'betty',password='1234')

// then
rocknroll.customer.login should be
{
  'willy': 
	'userName': 'willy',
	'enable': 'enable',
	'voteSongID': '001'
  'Alex': 
	'userName': 'Alex',
	'enable': 'enable',
	'voteSongID': '002'
  'betty': 
	'userName': 'betty',
	'enable': 'enable',
	'voteSongID': ''
  'tyler': 
	'userName': 'tyler',
	'enable': 'enable',
	'voteSongID': '004'
}
```

### case: User logs out

``` javascript
// given
rocknroll.customer.logout is
{
  'willy': 
	'userName': 'willy',
	'enable': 'enable',
	'voteSongID': '001'
  'Alex': 
	'userName': 'Alex',
	'enable': 'enable',
	'voteSongID': '002'
  'betty': 
	'userName': 'betty',
	'enable': 'enable',
	'voteSongID': '003'
  'tyler': 
	'userName': 'tyler',
	'enable': 'enable',
	'voteSongID': '004'
}

// when
user_clicks_logout()

// then
rocknroll.customer.login should be
{
  'willy': 
	'userName': 'willy',
	'enable': 'enable',
	'voteSongID': '001'
  'Alex': 
	'userName': 'Alex',
	'enable': 'enable',
	'voteSongID': '002'
  'betty': 
	'userName': 'betty',
	'enable': 'disable',
	'voteSongID': '003'
  'tyler': 
	'userName': 'tyler',
	'enable': 'enable',
	'voteSongID': ''
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

### case: user 'a' suggests new song

``` javascript
// given
rocknroll.songList is
{
  '001':
  	'songName': '3005',
  	'artist': 'Childish Gambino',
  	'upVote': '4',
  	'downVote': '1',
  	'enable': 'enable' ,
  	'songURL': 'youtube.com/lkjiwj',
  	'songImage': 'google.com/images/ji9ij2'
  '002':
  	'songName': 'Intro',
  	'artist': 'XX',
  	'upVote': '3',
  	'downVote': '1',
  	'enable': 'disable' ,
  	'songURL': 'youtube.com/lkbaabwj',
  	'songImage': 'google.com/images/ji922fj2'
}

// when
suggest(user = 'a', songName = 'Locked out of Heaven', artist = "Bruno Mars")

// then
rocknroll.songList should be
{
  '001':
  	'songName': '3005',
  	'artist': 'Childish Gambino',
  	'upVote': '4',
  	'downVote': '1',
  	'enable': 'enable' ,
  	'songURL': 'youtube.com/lkjiwj',
  	'songImage': 'google.com/images/ji9ij2'
  '002':
  	'songName': 'Intro',
  	'artist': 'XX',
  	'upVote': '3',
  	'downVote': '1',
  	'enable': 'disable' ,
  	'songURL': 'youtube.com/lkbaabwj',
  	'songImage': 'google.com/images/ji922fj2'
  '003':
  	'songName': 'Locked out of heaven',
  	'artist': 'Bruno Mars',
  	'upVote': '0',
  	'downVote': '0',
  	'enable': 'disable' ,
  	'songURL': 'youtube.com/lkbaabwj',
  	'songImage': 'google.com/images/ji922fj2'
}
```
### case: user 'a' suggests already existing song 'XX'

``` javascript
// given
rocknroll.songList is
{
  '001':
  	'songName': '3005',
  	'artist': 'Childish Gambino',
  	'upVote': '4',
  	'downVote': '1',
  	'enable': 'enable' ,
  	'songURL': 'youtube.com/lkjiwj',
  	'songImage': 'google.com/images/ji9ij2'
  '002':
  	'songName': 'Intro',
  	'artist': 'XX',
  	'upVote': '3',
  	'downVote': '1',
  	'enable': 'disable' ,
  	'songURL': 'youtube.com/lkbaabwj',
  	'songImage': 'google.com/images/ji922fj2'
}

// when
suggest(user = 'a', songName = 'Intro', artist = 'XX')

// then
rocknroll.songList should be
{
  '001':
  	'songName': '3005',
  	'artist': 'Childish Gambino',
  	'upVote': '4',
  	'downVote': '1',
  	'enable': 'enable' ,
  	'songURL': 'youtube.com/lkjiwj',
  	'songImage': 'google.com/images/ji9ij2'
  '002':
  	'songName': 'Intro',
  	'artist': 'XX',
  	'upVote': '3',
  	'downVote': '1',
  	'enable': 'disable' ,
  	'songURL': 'youtube.com/lkbaabwj',
  	'songImage': 'google.com/images/ji922fj2'
}
```
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

### case: Admin 'a' plays highest voted song 'b'

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

### case: Admin 'a' removes downvoted song 'f'

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

### case: Admin 'a' removes duplicate song 'd'

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
