//console.clear();
//window.userToken = null
const { createClient } = supabase
const _supabase = createClient('https://zcvcfteklhchxzkllsiu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MjA4NzMyMCwiZXhwIjoxOTU3NjYzMzIwfQ.t-Na3Gxmi3QXBTggnbEB9FV283NfhuvAvoF_UcdArkc')

var session = _supabase.auth.session()
//console.log(session)
var  myuser = _supabase.auth.user()
//console.log(myuser)
var myurl = window.location.href;
apage = myurl.split('#');
if ( typeof apage[1] !== 'undefined'){
  bpage = apage[1].split('&')
    }


    async  function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
  //console.log(myuser) 
          accessToken1 = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
        const { user, error } = await _supabase.auth.signIn({accessToken:accessToken1})

     console.log(accessToken1);
   session = session
   myuser = session.user
  //console.log("event")
$(".avatar,.avatar-xxl").attr("src",myuser['user_metadata']['avatar_url']);
$(".user-name").text(myuser['user_metadata']["name"])
 renderPage(mypage)  
        } else {
         renderPage(startingLocation)
        }
      }

//var { myuser, error } = await supabase.auth.api.getUser(bpage[0],)
murl = window.location.href.split('/');
var startingLocation = window.location.pathname+window.location.search
//console.log(window.location.href)
var mypage = startingLocation
//document.addEventListener('DOMContentLoaded', function (event) {
if(myuser == null && typeof bpage === 'undefined')gapi.auth2.getAuthInstance().signIn();
//})


function renderPage(mypage) {
 // if(typeof session === 'undefined' || session == null){
// console.log(myuser)
 arpage = mypage.split('?');
 ipage = arpage[0];
  //console.log(mypage);
  //console.log(ipage);
  
  if (ipage == "home" || ipage == "#" || ipage == "/") {
    history.pushState({ page: "home" }, null, "/")
    ipage = "home";
  } else {
    history.pushState({ page: mypage }, null, mypage)
  }
  //console.clear();
  $.get(ipage + '.ejs', function(contsy) {
    $("#mycontent").html(contsy)
  })
if(myuser){    
$(".avatar,.avatar-xxl").attr("src",myuser['user_metadata']['avatar_url']);
$(".user-name").text(myuser['user_metadata']["name"])
  }
}

function viewPage(ipage) {
mypage = ipage.split('?')
console.clear();  
  console.log(mypage[0]);
console.log(mypage[1]);
}
//console.log(localStorage.getItem("access_token"));
//console.log(myuser);

// When someone uses the browser back/forward buttons
window.onpopstate = function(event) {
  renderPage(event.state.page)
}

function signout(){
gapi.auth2.getAuthInstance().signOut();
}
jQuery.cachedScript = function( url, options ) {
 
  // Allow user to set any option except for dataType, cache, and url
  options = $.extend( options || {}, {
    dataType: "script",
    cache: true,
    url: url
  });
 
  // Use $.ajax() since it is more flexible than $.getScript
  // Return the jqXHR object so we can chain callbacks
  return jQuery.ajax( options );
};

 // _supabase.rpc('get_empsdata')
 //   .then(({ data }) => {
 //     console.log(data)
 //   })
 //   .catch((err) => {
 //     console.log(err.response.text)
 //   })