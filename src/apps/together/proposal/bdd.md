---
layout: layout.hbs
---

# Features

## Feature: Login and Logout

``` gherkin
Feature: Login and Logout
  Users must be logged in either as a user or admin to play with the application

  Scenario: Admin logs in
    Given the user is on the admin login page 
    And the user has not logged in yet
    When the user logs in via their github account and password
    Then the admin accesses the admin-specific page

  Scenario: Admin logs out
    Given the admin is currently logged in to the application
    When the admin presses the logout button
    Then the admin is logged out and can no longer access the admin page

  Scenario: User logs in
    Given the user is on playlist 
    And the user has not logged in yet 
    When user logs in via their github account and password
    Then the user access the application
  
  Scenario: User logs out
    Given the user is currently logged in to the application
    When the user presses the logout button
    Then the user is logged out and can no longer access the application  

```

## Feature: Voting for songs on a playlist

``` gherkin
Feature: Voting for songs on a playlist
  Users can react to proposed songs by voting for them and therefore collaboratively changing the ranking of each song

  Scenario: User upvotes a song
    Given there is a song in the playlist
    and the user has not voted for the song
    when the user upvotes
    then the vote count increments by one
    and the order of the song list may be updated based on the new vote count
    and there is feedback that tells the user they have up voted that song.

  Scenario: User downvotes a song
    Given there is a song in the playlist
    and the user has not voted for the song
    when the user downvotes
    then the vote count decrements by one
    and the order of the song list may be updated based on the new vote count
    and there is feedback that tells the user they have downvoted that song.

  Scenario: User changes their vote from an upvote to a downvote
    Given there is a song in the playlist
    And the user has already upvoted for the song
    When the user changes their vote to a downvote
    Then the vote count decrements by two
    And the order of the song list may be updated based on the new vote count
    And there is feedback that tells the user they have downvoted that song.

  Scenario: User changes their vote from a downvote to an upvote
    Given there is a song in the playlist
    And the user has already downvoted for the song
    When the user changes their vote to an upvote
    Then the vote count increments by two
    And the order of the song list may be updated based on the new vote count
    And there is feedback that tells the user they have upvoted that song.

```

## Feature: Song suggestion

``` gherkin
Feature: Song suggestion
  All users may suggest songs they want to hear and add them to the list to be voted on.

  Scenario: User suggests a song to add to the song queue
    Given the user is logged in 
    When the user adds a song to the queue
    The queue is updated with the suggested song
    And the vote count for the song starts at zero
    And other users are notified via toast of the addition of the new song

  Scenario: User attempts to add a song that is already on the queue
    Given the song is already on the queue
    When the user submits a song to the queue
    The user is notified that the song already exists
    And no song is added
    And the user is redirected to the existing queue

  Scenario: User suggests song via discussion forum
    Given the user is logged in
    When the user posts a suggestion to the discussion forum
    The discussion forum updates to display the comment
    And users as well as admin are notified of the new comment
    And the admin has the option to add suggestion to the queue or play song

```

## Feature: Post a comment for a song

``` gherkin
Feature: Post a comment for a song
  Users can communicate and interact to make playlist by posting comments

  Scenario: User posts a comment for a song
    Given the user is logged in 
    When the user types a message in the comments section
    And presses the submit button
    Then the message is posted to the end of the comment section

  Scenario: Admin deletes a comment
    Given the user is logged in
    And the user is an admin
    When they click the delete button of a comment
    Then the comment disappears
  
  Scenario: User posts a link as a comment
    Given the user is logged in
    When the user types a URL into their comment
    And posts their comment
    Then the text which is a URL is highlighted in blue
    And clicking the text opens a new webpage that connects to the URL
  

```

## Feature: Admin edits the song list

``` gherkin
Feature: Admin edits the song list
  Only the admin has control over removing songs from the list. 

  Scenario: Play next song
    Given the user has logged in
    And the user is an admin
    And the current song has ended
    And users of the application have rated a top song
    When the admin select the top song to play
    Then the song begins playing
    And users receive visual feedback that the song is playing
    And the song is removed from the voting list

  Scenario: Remove downvoted song
    Given the user has logged in
    And the user is an admin
    And users have significantly downvoted a song
    When the admin selects the low-ranked song
    Then the song is removed from the voting list

  Scenario: Remove invalid song
    Given the user has logged in
    And the user is an admin
    And users have added an invalid or duplicate song
    When the admin selects the low-ranked song
    Then the song is removed from the voting list
```


# Examples

## Feature: Usage

``` gherkin
Feature: Usage
  As a user of Cucumber.js
  I want to have documentation on Cucumber
  So that I can concentrate on building awesome applications

  Scenario: Reading documentation
    Given I am on the Cucumber.js GitHub repository
    When I go to the README file
    Then I should see "Usage" as the page title
```

## Feature: Serve Coffee

``` gherkin
Feature: Serve coffee
  Coffee should not be served until paid for
  Coffee should not be served until the button has been pressed
  If there is no coffee left then money should be refunded

  Scenario: Buy last coffee
    Given there are 1 coffees left in the machine
    And I have deposited 1$
    When I press the coffee button
    Then I should be served a coffee

  Scenario: No more coffees
    Given there is no coffee left in the machine
    And I have deposited $1
    When I press the coffee button
    Then I should be refunded $1
```
