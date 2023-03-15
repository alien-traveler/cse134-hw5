const postBtn = document.getElementById("postBtn");
const getBtn = document.getElementById("getBtn");
const putBtn = document.getElementById("putBtn");
const deleteBtn = document.getElementById("deleteBtn");

const output = document.getElementById("response");

// post
postBtn.addEventListener("click", ()=>{
    // clear output
    clearOutput();

    const xhttp = new XMLHttpRequest();
    let params = getFormValues();
    // console.log(params);
    let url = "https://httpbin.org/post";
    xhttp.open('POST', url, true);

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let response_obj = JSON.parse(this.responseText);
            // console.log(this.responseText);
            formatResponse(response_obj);
        }
    };
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    xhttp.send(params);
});

// get
getBtn.addEventListener("click", ()=> {
    // clear output
    clearOutput();
    
    const xhttp = new XMLHttpRequest();
    let params = getFormValues();
    let url = "https://httpbin.org/get?" + params;
    xhttp.open('GET', url, true);

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            let response_obj = JSON.parse(xhttp.responseText);
            // console.log(this.responseText);
            formatResponse(response_obj);
        }
    };
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded', true);
    
    xhttp.send();
});

// put
putBtn.addEventListener("click", ()=> {
    // clear output
    clearOutput();
    
    const xhttp = new XMLHttpRequest();
    let params = getFormValues();
    let url = "https://httpbin.org/put?" + params;
    xhttp.open('PUT', url, true);

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            let response_obj = JSON.parse(xhttp.responseText);
            // console.log(this.responseText);
            formatResponse(response_obj);
        }
    };
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded', true);
    
    xhttp.send();
});

// delete
deleteBtn.addEventListener("click", ()=> {
    // clear output
    clearOutput();
    
    const xhttp = new XMLHttpRequest();
    let params = getFormValues();
    let url = "https://httpbin.org/delete?" + params;
    xhttp.open('DELETE', url, true);

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            let response_obj = JSON.parse(xhttp.responseText);
            // console.log(this.responseText);
            formatResponse(response_obj);
        }
    };
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded', true);
    
    xhttp.send();
});

function clearOutput() {
    output.innerHTML = "";
}

function getFormValues() {
    let output = "";
    const form = document.getElementById("form_");
    const id = document.getElementById("record_id");
    const name = document.getElementById("article_name");
    const body = document.getElementById("article_body");
    const date = document.getElementById("date");
    const cur_date = new Date();
    output = `${id.name}=${id.value}&${name.name}=${name.value}&${body.name}=${body.value}&${date.name}=${cur_date}`;
    return output;
}

function formatResponse(response_obj) {
    // let output = JSON.stringify(response_obj);
    // let output = JSON.parse(response_obj);
    
    let div = document.createElement("div");
    // console.log(response_obj["args"]);

    obj_entries = Object.entries(response_obj);
    // console.log(obj_entries);
    obj_entries.forEach(entry => {
        // console.log(entry);
        let obj_name = entry[0];
        let obj_value = entry[1];
        // h2
        let entry_h2 = document.createElement("h2");
        entry_h2.innerText = obj_name;
        div.appendChild(entry_h2);
        // obj_table
        let obj_table = document.createElement("table");
        // if obj is object
        if (isObj(obj_value)) {
            let obj = Object.entries(obj_value);
            obj.forEach((arg) => {
                let tr = document.createElement("tr");
                // key
                let key = arg[0];
                let th_key = document.createElement("th");
                th_key.innerText = key;
                tr.appendChild(th_key);
                // value
                let value = arg[1];
                let th_value = document.createElement("th");
                th_value.innerText = value;
                tr.appendChild(th_value);

                obj_table.appendChild(tr);
            });
        } 
        // if obj is not object
        else {
            let tr = document.createElement("tr");
            // key
            let key = obj_name;
            let th_key = document.createElement("th");
            th_key.innerText = key;
            tr.appendChild(th_key);
            // value
            let value = obj_value;
            let th_value = document.createElement("th");
            th_value.innerText = value;
            tr.appendChild(th_value);

            obj_table.appendChild(tr);
        }
        div.appendChild(obj_table);
    });
    output.appendChild(div);
}

function isObj(A) {
    if( (typeof A === "object" || typeof A === 'function') && (A !== null) ) {
        return true;
    } else {
        return false;
    }
}