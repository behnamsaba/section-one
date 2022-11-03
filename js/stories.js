"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */


function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        <button>favorite</button>
      </li>
    `);
    
}




/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  
  }
  

  $allStoriesList.show();
  
}


$("#submit-form").on("submit",submitNewStory);

async function submitNewStory(evt){
  evt.preventDefault();
  let title = $("#create-title").val();
  let author = $("#create-author").val();
  let url = $("#create-url").val();
  const username = currentUser.username
  const storyData = {title, url, author, username };
  const story = await storyList.addStory(currentUser, storyData);
  const $story = generateStoryMarkup(story);
  $allStoriesList.prepend($story);
  $("#create-title").val("");
  $("#create-author").val("");
  $("#create-url").val("");
  $("#submit-form").hide();
  // $allStoriesList.show();
  start()
}



///favorite:

// find the story Id in storyList.stories which is in model.js, and add the story to the favorite list to API
// or unmarked, remove the story to the favorite list to API .

// addFavoritList()- when there is no list on favorite section, show msg "No favorites yet" .
//  when there is list, remove msg and let the stories put in the stories list.

// removeSt(evt)-removeBtn evt


async function favelist(){
  const storyId = $(this).closest("li").attr("id");
  console.log(storyList.stories);
  const favStory = storyList.stories.find((fa) => fa.storyId === storyId); //find story object with intended story Id
  console.log(favStory)
  if($(this).attr("data-favorite") === "liked"){
    $(this).css("background-color","lightgray");;
    $(this).text("unlike");
    await currentUser.removeFavorite(favStory);
  }
  else if($(this).text() === "Delete"){
    $(this).closest("li").remove();
    await currentUser.removeFavorite(favStory);
  }
  else{
    $(this).attr("data-favorite","liked");
    $(this).css("background-color","green");
    $(this).text("unlike");
    await currentUser.addFavorite(favStory);
  }

  

}

$("#all-stories-list").on("click","button",favelist);



function putFave() {

  $allStoriesList.empty();

  // change currentuser favorite array to set to avoid duplicate
  let faveSet = new Set(currentUser.favorites);
  for (let story of faveSet) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
    
  }

  $allStoriesList.show();
}

function test(){
  $("#submit-form").hide()
  if(currentUser.favorites.length === 0){
    $allStoriesList.hide();
    $body.append("<h3 id=empty >Sorry there is no fave yet!</h3>");

  }else{
    putFave()
    updateNavOnLogin();
    $("#all-stories-list button").text("Delete")


  }
}
$("#nav-favorites").on("click",test);








