"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();////submit-favorite and mystory appears
  addFavButton();


  $navLogin.hide();//login hides
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}


$body.on("click","#nav-submit-story",function(){
  //when click on submit to create story!
  $allStoriesList.hide();
  $("#submit-form").show();
  



})


//add event listner on hack or snooze:
$("#nav-all").on("click",start);