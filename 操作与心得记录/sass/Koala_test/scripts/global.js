function addLoadEvent(func) {
	var oldLoad = window.onload;
	if (typeof oldLoad !='function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldLoad();
			func();
		}
	}
}
function insertAfter(newElement,targetElement) {
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	};
}
function addClass(element,value) {
    if (!element.className) {
        element.className = value;
    } else {
        newClassName = element.className;
        newClassName += " "; 
        newClassName += value;
        element.className = newClassName;
    }
}
function highlightPage() {
	var headers = document.getElementsByTagName("header");
	var navs = headers[0].getElementsByTagName("nav");
	var links = navs[0].getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		var linkurl = links[i].getAttribute("href");
		if (window.location.href.indexOf(linkurl)!=-1) {
			links[i].className = "here";
			var linktext = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id",linktext);
		};
	}
}

addLoadEvent(highlightPage);

//index.html
function moveElement(elementID, final_x, final_y, interval) {
    if (!document.getElementById) return false;
    if (!document.getElementById(elementID)) return false;
    var elem = document.getElementById(elementID);
    if (elem.movement) clearTimeout(elem.movement);
    if (!elem.style.left) {
        elem.style.left = "0px";
    }
    if (!elem.style.top) {
        elem.style.top = "0px";
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    var dist = 0;
    if (xpos == final_x && ypos == final_y) return true;
    if (xpos < final_x) {
        dist = Math.ceil((final_x - xpos)/10) ;
        xpos += dist;
    }
    if (xpos > final_x) {
        dist = Math.ceil((xpos - final_x)/10) ;
        xpos -= dist;
    }
    if (ypos < final_y) {
        dist = Math.ceil((final_y - xpos)/10) ;
        ypos += dist;
    }
    if (ypos > final_y) {
        dist = Math.ceil((ypos - final_y)/10) ;
        ypos -= dist;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('"+elementID+"', "+final_x+", "+final_y+", "+interval+")"
    elem.movement = setTimeout(repeat, interval);
}

function prepareSlideshow() {
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id","slideshow");
	var preview = document.createElement("img");
	preview.setAttribute("src","images/slideshow.gif");
	preview.setAttribute("alt","a glimpse of what awaits you");
	preview.setAttribute("id","preview");
	slideshow.appendChild(preview);

	var frame = document.createElement("img");
	frame.setAttribute("src","images/frame.gif");
	frame.setAttribute("alt","");
	frame.setAttribute("id","frame");
	slideshow.appendChild(frame);
	
	if (!document.getElementById("intro")) return false;
	var intro = document.getElementById("intro");
	insertAfter(slideshow,intro);

	var links = intro.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		links[i].onmouseover = function () {
			var destination = this.getAttribute("href");
			if ( destination.indexOf("index.html") != -1)  moveElement("preview",0,0,5);
			if ( destination.indexOf("about.html") != -1)  moveElement("preview",-150,0,5);
			if ( destination.indexOf("photos.html") != -1)  moveElement("preview",-300,0,5);
			if ( destination.indexOf("live.html") != -1)  moveElement("preview",-450,0,5);
			if ( destination.indexOf("contact.html") != -1)  moveElement("preview",-600,0,5);
		}
		
	}
}
addLoadEvent(prepareSlideshow);

//about.html
function showSection(id) {
	var sections = document.getElementsByTagName("section");
	for (var i = 0; i < sections.length; i++) {
		 if(id != sections[i].getAttribute("id")) {
			sections[i].style.display = "none";
		 } else {
			sections[i].style.display = "block";
		 }
	}
}

function prepareInternalnav() {
	if (!document.getElementsByTagName || !document.getElementsByTagName("article")) return false; 
	var articles = document.getElementsByTagName("article");
	if (articles.length == 0 ) return false;
	var navs = articles[0].getElementsByTagName("nav");
	if (navs.length == 0 ) return false;
	var links = navs[0].getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		var sectionId = links[i].getAttribute("href").split("#")[1];
		if (!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display = "none";
		links[i].destination = sectionId;
		links[i].onclick = function () {
			showSection(this.destination);
			return false;
		}
	}
}
addLoadEvent(prepareInternalnav);

//photo.html
function showPic(whichPic){
    if (!document.getElementById("placeholder")){
        return true;
    }
    var source = whichPic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src", source);

    if (!document.getElementById("description")) return false;
    if (whichPic.getAttribute("title")) {
        var text = whichPic.getAttribute("title");
    } else {
        var text = "";
    }
    var description = document.getElementById("description");
    if (description.firstChild.nodeType == 3){
        description.firstChild.nodeValue = text;
    }
    return false;
}

function preparePlaceholder(){
    if (!document.createElement ||
        !document.createTextNode ||
        !document.getElementById ||
        !document.getElementById("imagegallery")
        ){
        return false;
    }
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "images/placeholder.gif");
    placeholder.setAttribute("alt", "my image gallery");
    var description = document.createElement("p");
    description.setAttribute("id", "description");
    description.appendChild(document.createTextNode("Choose an image."));

    var gallery = document.getElementById("imagegallery");
    insertAfter(description, gallery);
    insertAfter(placeholder, description);
}

function prepareGallery(){
    if (!document.getElementsByTagName ||
        !document.getElementById ||
        !document.getElementById("imagegallery")){
        return false;
    }
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++){
        links[i].onclick = function(){
            return showPic(this);
        }
    }
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

//live.html
function displayAbbreviations(argument) { 
    //取得所有缩略词
    var abbrs = document.getElementsByTagName("abbr");
    if (abbrs.length < 1) return false;
    var defs = new Array();

    //遍历这些缩略词
    for (var i = 0; i < abbrs.length; i++){
        if (abbrs[i].childNodes.length < 1) continue;
        var key = abbrs[i].lastChild.nodeValue;
        var definition = abbrs[i].getAttribute("title");
        defs[key] = definition;
    }

    //创建定义列表
    var dList = document.createElement("dl");
    //遍历定义
    for (key in defs){
        //创建定义标题
        var dtitle = document.createElement("dt");
        dtitle.appendChild(document.createTextNode(key));
        //创建定义描述
        var ddesc = document.createElement("dd");
        ddesc.appendChild(document.createTextNode(defs[key]));
        //把他们添加到定义列表
        dList.appendChild(dtitle);
        dList.appendChild(ddesc);
    }

    if (dList.childNodes.length < 1) return false;

    //创建标题
    var header = document.createElement("h3");
    header.appendChild(document.createTextNode("Abbreviations"));
    //把标题、定义列表添加到页面
    var articles = document.getElementsByTagName("article");
    if (articles.length == 0) return false;
    var container = articles[0];
    container.appendChild(header);
    container.appendChild(dList);
}
addLoadEvent(displayAbbreviations);


function stripeTables(){
    if (!document.getElementsByTagName) return false;
    if (!document.getElementsByTagName('table')) return false;
    var tables = document.getElementsByTagName('table');
    for (var i=0 ; i < tables.length; i++){
        var odd = true;
        var rows = tables[i].getElementsByTagName('tr');
        for (var j=0; j < rows.length; j++){
            if (odd ==true){
                addClass(rows[j], "odd");
                odd = false;
            }else {
                odd = true;
            }
        }
    }
}
addLoadEvent(stripeTables);

function highlightRows() {
    var rows = document.getElementsByTagName('tr');
    for (var i=0; i < rows.length; i++){
        rows[i].oldClassName = rows[i].className;
        rows[i].onmouseover = function(){
            addClass(this, "highlight");
        }
        rows[i].onmouseout = function() {
            this.className = this.oldClassName;
        }
    }
}
addLoadEvent(highlightRows);

//contact.com
function focusLabels() {
	var labels = document.getElementsByTagName("label");
	if (labels.length == 0) return false;
	for (var i = 0; i < labels.length; i++) {
		if (!labels[i].getAttribute("for")) continue;
		labels[i].onclick = function () {
			var id = this.getAttribute("for");
			var element = document.getElementById(id);
			element.focus();
		}
	}
}
addLoadEvent(focusLabels);

function resetFields(whichform) {
	if (Modernizr.input.placeholder) return;
	for (var i = 0; i < whichform.elements.length; i++) {
		var element = whichform.elements[i];
		if (element.type=="submit") continue;
		var check = element.placeholder || element.getAttribute('placeholder');
		if (!check) continue;
		element.onfocus = function () {
			var text = this.placeholder || this.getAttribute('placeholder');
			if (this.value==text) {
				this.className = "";
				this.value = "";
			}
		};
		element.onblur = function () {
			if (this.value=="") {
				this.className = "placeholder";
				this.value = this.placeholder || this.getAttribute('placeholder');
			}
		}
		element.onblur();
	}
}
function isFilled(field){
    if (field.value.replace(' ','').length == 0) return false;
    var placeholder = field.placeholder || field.getAttribute('placeholder');
    return (field.value != placeholder);
}

function isEmail(field){
    return (field.value.indexOf('@') != -1 && field.value.indexOf('.') != -1);
}
function validateForm(whichform) {
	for (var i = 0; i < whichform.elements.length; i++) {
		var element = whichform.elements[i];
		if (element.required=='required') {
			if (!isFilled(element)) {
				alert("The "+element.name+" field must be avalid email address.");
				return false;
			}
		}
		if (element.type=='email') {
			if (!isEmail(element)) {
				alert("The "+element.name+" field must be a valid email address.");
				return false;
			}
		}
	}
	return true;
}

//submit.html
function getHTTPObject() {
	if (typeof XMLHttpRequest == "undefined")
	XMLHttpRequest = function () {
		try { return new ActiveXObject("Msxml2.XMLHTTP.6.0")} catch(e){}
		try { return new ActiveXObject("Msxml2.XMLHTTP.3.0")} catch(e){}
		try { return new ActiveXObject("Msxml2.XMLHTTP")} catch(e){}
		return false;
	}
	return new XMLHttpRequest();
}

function displayAjaxLoading(element) {
	while (element.hasChildNodes()) {
		element.removeChild(element.lastChild);
	}
	var content = document.createElement("img");
	content.setAttribute("src","images/loading.gif");	
	content.setAttribute("alt","Loading...");	
	element.appendChild(content);
}

function submitFormWithAjax(whichform,thetarget) {
	
	var request = getHTTPObject();
	if (!request) return false;
	displayAjaxLoading(thetarget);
	
	var dataParts = [];
	var element;  
	for (var i = 0; i < whichform.elements.length; i++) {
		element = whichform.elements[i];
		dataParts[i] = element.name + "=" + encodeURIComponent(element.value);
	}
	var data = dataParts.join("&");
	
	request.open('POST',whichform.getAttribute("action"),true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	
	request.onreadystatechange = function () {
		if (request.readyState ==4) {
			if(request.status == 200 || request.status == 0) {
				var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
				if (matches.length>0) {
					thetarget.innerHTML = matches[1];
				} else {
					thetarget.innerHTML = "<p>Oops, there was an error </p>";
				}
			}
		} else {
			thetarget.innerHTML = "<p>"+ request.statusText +"</p>";
		}
	}
	
	request.send(data);
	return true;
}
function prepareForms() {
	for (var i = 0; i < document.forms.length; i++) {
		var thisform = document.forms[i];
		resetFields(thisform);
		thisform.onsubmit = function () {
			if (!validateForm(this)) return false;
			var article = document.getElementsByTagName("article")[0];
			if (submitFormWithAjax(this,article)) return false;
			return true;
		}
	}
}
addLoadEvent(prepareForms);