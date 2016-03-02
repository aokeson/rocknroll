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
	* songName
		* userName
		* comment



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
user_clicks_login()

// then
rocknroll.Admin.login should be
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
rocknroll.Admin.login should be
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
playlist.d.votes is
{
  'total': '0',
  'b': 'up',
  'c': 'down'
}

// when
upvote(user = 'a')

// then
playlist.d.votes is
{
  'total': '1',
  'b': 'up',
  'c': 'down',
  'a': 'up'
}
reorder()
```

### case: user 'a' down votes a song 'd'

``` javascript
// given
playlist.d.votes is
{
  'total': '0',
  'b': 'up',
  'c': 'down'
}

// when
downvote(user = 'a')

// then
playlist.d.votes is
{
  'total': '-1',
  'b': 'up',
  'c': 'down',
  'a': 'down'
}
reorder()
```

### case: user 'a' changes from up vote to down vote for song 'd'

``` javascript
// given
playlist.d.votes is
{
  'total': '1',
  'a': 'up',
  'b': 'up',
  'c': 'down'
}

// when
downvote(user = 'a')

// then
playlist.d.votes is
{
  'total': '-1',
  'a': 'down',
  'b': 'up',
  'c': 'down'
}
reorder()
```

### case: user 'a' changes from down vote to up vote for song 'd'

``` javascript
// given
playlist.d.votes is
{
  'total': '-1',
  'a': 'down',
  'b': 'up',
  'c': 'down'
}

// when
upvote(user = 'a')

// then
playlist.d.votes is
{
  'total': '1',
  'a': 'up',
  'b': 'up',
  'c': 'down'
}
reorder()
```

## Action: Song suggestion

(TODO: cases)

## Action: Post a comment for a song

### case: user 'a' posts comment 'c' for song 'd'

``` javascript
// given
playlist.d.comment is
{
  'e': 'hi',
  'f': 'hello'
}

// when
comment(user = 'a', comment = 'c')

// then
playlist.d.comment is
{
  'e': 'hi',
  'f': 'hello',
  'a': 'c'
}
```

### case: admin 'a' deletes comment 'b' from user 'c' for song 'd'

``` javascript
// given
playlist.users is
{
  'a': 'admin',
  'c': 'user'
}
playlist.d.comment is
{
  'c': 'b',
  'f': 'hello'
}

// when
delcomment(user = 'c', comment = 'b')

// then
playlist.d.comment is
{
  'f': 'hello'
}
```

### case: user 'a' posts link 'c' for song 'd'

``` javascript
// given
playlist.d.comment is
{
  'e': 'hi',
  'f': 'hello'
}

// when
comment(user = 'a', comment = 'c')

// then
playlist.d.comment is
{
  'e': 'hi',
  'f': 'hello',
  'a': 'c'
}
```

## Action: Admin edits the song list

(TODO: cases)




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