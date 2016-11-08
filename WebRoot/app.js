//The following code structure is mandatory
var home = {};            //default partial page, which will be loaded initially
home.partial = "lib/home.html";
home.init = function(){   //bootstrap method
    //nothing but static content only to render
}

var notfound = {};               //404 page
notfound.partial = "lib/404.html";
notfound.init = function(){
    alert('URL does not exist. please check your code. You may also try manually inputing some other invalid url to get here.');
}

var settings = {};               //global parameters
settings.partialCache = {};      //cache for partial pages
settings.divDemo = document.getElementById("demo");      //div for loading partials







/////////////////////////////////////////////////////////////////////////




//The following is customizable, and consistent to the templates used
var postMD = {};
postMD.partial = "postMD.html";
postMD.init = function(){
    miniSPA.render('postMD');             //render related partial page
}
postMD.submit = function(){
    document.getElementById('spinner').style.visibility = 'visible';
    var mdText = document.getElementById('mdText');
    var md = document.getElementById('md');
    var data = '{"text":"'+mdText.value.replace(/\n/g, '<br>')+'","mode": "gfm","context": "github/gollum"}';
    miniSPA.ajaxRequest('https://api.github.com/markdown', 'POST', data,function(status, page){
        document.getElementById('spinner').style.visibility = 'hidden';
        md.innerHTML = page;     //render markdown partial returned from the server
    });
    mdText.value = '';
}

var getEmoji = {};
getEmoji.partial = "getEmoji.html"
getEmoji.init = function(){
    document.getElementById('spinner').style.visibility = 'visible';
    document.getElementById('content').style.visibility = 'hidden';
    miniSPA.ajaxRequest('https://api.github.com/emojis','GET','',function(status, partial){
        getEmoji.emojis = JSON.parse(partial);
        miniSPA.render('getEmoji');       //render related partial page with data returned from the server
        document.getElementById('content').style.visibility = 'visible';
        document.getElementById('spinner').style.visibility = 'hidden';
    });
}

miniSPA.changeUrl();    //initialize