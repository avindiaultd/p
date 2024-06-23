 var firebaseConfig = {
  apiKey: "AIzaSyDHL4CSEjJBdNUI4IozRI-7Suqd4UqUoDI",
  authDomain: "avindia-db2bd.firebaseapp.com",
  databaseURL: "https://avindia-db2bd-default-rtdb.firebaseio.com/",
  projectId: "avindia-db2bd",
  storageBucket: "avindia-db2bd.appspot.com",
  messagingSenderId: "970872368951"
};

  firebase.initializeApp(firebaseConfig);               
     
    var db = firebase.database();            
db.ref('avindia/website/rank/').once('value', function(snapshot) {
  var data = snapshot.val();
  var position = (data.position);
  position = position.replace(/'/ , "");
  position = position.replace(/"/ , "");
  position = position.replace(/'/ , "");
  position = position.replace(/"/ , "");
  position = position.split(',');
position.forEach(Call_Data)

});
  
function Call_Data(item,index) {
db.ref('avindia/website/rank/' + item).once('value', function(snapshot) {
  var call = snapshot.val();
  var current_post = decodeURI((call.current_post));
  var data = decodeURI((call.data));
  var name = decodeURI((call.name));
  var pic = decodeURIComponent((call.pic));
  var post = decodeURI((call.post));
  var star = decodeURI((call.star));
  var change = decodeURI((call.change));
  current_post = current_post.replace(/'/ , "");
  current_post = current_post.replace(/"/ , "");
  name = name.replace(/'/ , "");
  name = name.replace(/"/ , "");
  data = data.replace(/'/ , "");
  data = data.replace(/"/ , "");
  pic = pic.replace(/'/ , "");
  pic = pic.replace(/"/ , "");
  post = post.replace(/'/ , "");
  post = post.replace(/"/ , "");
  star = star.replace(/'/ , "");
  star = star.replace(/"/ , "");
  change = change.replace(/'/ , "");
  change = change.replace(/"/ , "");
  current_post = current_post.replace(/'/ , "");
  current_post = current_post.replace(/"/ , "");
  name = name.replace(/'/ , "");
  name = name.replace(/"/ , "");
  data = data.replace(/'/ , "");
  data = data.replace(/"/ , "");
  pic = pic.replace(/'/ , "");
  pic = pic.replace(/"/ , "");
  post = post.replace(/'/ , "");
  post = post.replace(/"/ , "");
  star = star.replace(/'/ , "");
  star = star.replace(/"/ , "");
  change = change.replace(/'/ , "");
  change = change.replace(/"/ , "");
  console.log(current_post);
  console.log(data);
  console.log(name);
  console.log(decodeURI(pic));
  console.log(post);
  console.log(current_post);
  var color_ = "gray";
  if(change.includes("0") == true) {
  color_ = "gray";
  }
  else{
  if(change.includes("+") == true) {
  color_ = "green";
  }
  else{
  if(change.includes("-") == true) {
  color_ = "red";
  }
  }
  }
  document.getElementById("a").innerHTML +='<div class="chat"><ul><li><div class="usericon"><img src="'+pic+'"></div><div class="userinfo"><h5>'+name+'<i class="material-icons md-25" style="color: #01B24E;font-size: 25px;margin-top: -20px;">verified</i></h5><div class="rank"><b style="margin-left: -16px;">'+post+'</b><p class="material-icons md-25">'+star+'<b style="color: '+color_+';font-size: 10px;margin-top: 0px;">&nbsp;( '+change+' )</b></p><p class="info" style="color: #9c9c9c;font-size: 10px;margin-top: -10px;">'+data+'<br><b style="color: #818181;">Current : </b>'+current_post+'</p></b></div></div></div></li></ul></div></div>';
});
}
