function submitEntry() {
	var x = document.getElementById("entry").value;
	firebase.database().ref().push(x);
}

window.onload = function() {
	//cument.getElementById("new-entry").addEventListener("saveInput", submitEntry());
	//document.getElementById("sign-in").onclick = signIn;
	document.getElementById("submit").onclick = submitEntry;
}

//issue getting html 