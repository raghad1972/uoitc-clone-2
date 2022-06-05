//console.clear();
//window.userToken = null
const { createClient } = supabase
const _supabase = createClient('https://zcvcfteklhchxzkllsiu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MjA4NzMyMCwiZXhwIjoxOTU3NjYzMzIwfQ.t-Na3Gxmi3QXBTggnbEB9FV283NfhuvAvoF_UcdArkc')
      var discoveryDocs = ["https://people.googleapis.com/$discovery/rest?version=v1", 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

      // Enter a client ID for a web application from the Google API Console:
      //   https://console.developers.google.com/apis/credentials?project=_
      // In your API Console project, add a JavaScript origin that corresponds
      //   to the domain where you will be running the script.
      var clientId = '961417719029-826uc3hvjl6efb30cdfoa4tiuv8niki7.apps.googleusercontent.com';

      // Enter one or more authorization scopes. Refer to the documentation for
      // the API or https://developers.google.com/people/v1/how-tos/authorizing
      // for details.
      var scopes = 'https://www.googleapis.com/auth/drive.metadata.readonly';

var mysession = _supabase.auth.session()
if(mysession){
var mysessionProvider = mysession.provider_token
}
//console.log(session)
var  myuser = _supabase.auth.user()
//console.log(myuser)
var myurl = window.location.href;
apage = myurl.split('#');
if ( typeof apage[1] !== 'undefined'){
  bpage = apage[1].split('&')
    }

//var { myuser, error } = await supabase.auth.api.getUser(bpage[0],)
murl = window.location.href.split('/');
var startingLocation = window.location.pathname+window.location.search
//console.log(window.location.href)
var mypage = startingLocation
//document.addEventListener('DOMContentLoaded', function (event) {
if(myuser == null && typeof bpage === 'undefined')signme();
//})

async function signme(){
const { user, session, error } = await _supabase.auth.signIn({
  provider: 'google'
},{
  scopes:'https://www.googleapis.com/auth/drive.metadata.readonly'
})
   
}

if(mysession == null){
_supabase.auth.onAuthStateChange((event, session) => {
  //console.log(event)
//  console.log(session.provider_token)
  if(event == 'SIGNED_IN' && myuser == null){
  //console.log(myuser) 
   mysession = session
   mysessionProvider = session.provider_token 
   myuser = session.user
  //console.log("event")
$(".avatar,.avatar-xxl").attr("src",myuser['user_metadata']['avatar_url']);
$(".user-name").text(myuser['user_metadata']["name"])
 renderPage(mypage)   
  }
})  
}else{
//console.log("3")  
 renderPage(startingLocation) 
}


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
//console.log(mypage[0]);
//console.log(mypage[1]);
}
//console.log(localStorage.getItem("access_token"));
//console.log(myuser);

// When someone uses the browser back/forward buttons
window.onpopstate = function(event) {
  renderPage(event.state.page)
}

function signout(){
    history.pushState({ page: "signout" }, null, '')
    mypage = "signout"; 
  _supabase.auth.signOut().then(() => {
  //console.log(error)       
  mysession = null;
  myuser = null; 
  console.clear();
  $.get('ignout.ejs', function(contsy) {
    $("#htmlpage").html(contsy)        
});
});    
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