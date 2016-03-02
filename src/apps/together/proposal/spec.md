---
layout: layout.hbs
---

# Specification

# Data

Our app uses the following structure for the database backend:

* playlist
  * song
    * votes
      * total
      * user
    * comment
      * message
  * users


# Actions

The major actions of our app are:
* Login and Logout
* Voting for songs on a playlist
* Song suggestion
* Post a comment for a song
* Admin edits the song list

## Action: Login and Logout

(TODO: cases)

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