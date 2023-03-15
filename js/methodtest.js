const postBtn = document.getElementById("postBtn");

const output = document.getElementById("output");


postBtn.addEventListener("click", ()=>{
    const xhttp = new XMLHttpRequest();
    let params = "record_id=987&article_name=will&article_body=&date=";
    let url = "https://httpbin.org/post";
    xhttp.open('POST', url, true);

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            let respText = JSON.parse(xhttp.responseText);
            alert(respText);
            output.innerHTML = respText;
        } else {
            console.log("Error: ", xhttp.statusText);
            alert("error");
        }
    };
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    xhttp.send(params);
});

// function postFunc() {
//     let xhttp = new XMLHttpRequest();
//     let params = "orem=ipsum&name=binny";
//     let url = "https://httpbin.org/post";
//     xhttp.open("POST", `${url}post`, true);

//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             respText = JSON.parse(this.responseText);
//             console.log(respText);
//             // alert(document.getElementById("record_id").value);
//         } else {
//             console.log("Error: ", this.statusText);
//         }
//     };
//     xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
//     xhttp.send(params);
// }