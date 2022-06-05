// Initial page load - If someone visits a URL directly instead of clicking our links/buttons
const startingLocation = window.location.pathname

if (startingLocation == "/"){
    renderPage("home")
}else {
    renderPage(startingLocation)
}
function renderPage(mypage) {
    if (mypage == "home"){
    history.pushState({ page: "home" }, null, "/")
   }else {
    history.pushState({ page: mypage }, null, mypage)
   }
   console.clear();
   $.get(mypage+'.ejs', function(contsy) {
    $("#content").html(contsy)
  })
}
// When someone uses the browser back/forward buttons
window.onpopstate = function (event) {
    renderPage(event.state.page)
}

