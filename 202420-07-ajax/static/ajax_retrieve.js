console.log("right file");

const disp_text = document.getElementById('display_text');
const disp_html = document.getElementById('display_html');
const display = (data) => {
    disp_text.innerText = data;
    disp_html.innerHTML = data;
};

const err = document.getElementById('error_msg');
const showError = (msg) => {
    err.classList.remove('d-none');
    err.innerText = msg;
};
const hideError = () =>
{
    err.classList.add('d-none');
    display("pending...");
}
// retrieve
document.getElementById('retrieve').addEventListener('click', async () => {

    try{
        hideError();
        const response = await fetch('/stuff.txt');
        if (!response.ok) {
            showError(response.statusText);
        }else {
            const data = await response.text();
            display(data);
        }
    }catch (e){
        showError(e);
    }

});
// bad retrieve
document.getElementById('bad_retrieve').addEventListener('click', async () => {
    try{
        hideError();
        const response = await fetch('/bogus.txt');
        if (!response.ok) {
            showError(response.statusText);
        }else {
            const data = await response.text();
            display(data);
        }
    }catch (e){
        showError(e);
    }

});


// retrieve json
document.getElementById('retrieve_json').addEventListener('click', async () => {
    document.getElementById('error_msg').innerText = "Retrieving"
    try {
        const response = await fetch('quotes');
        console.log(response);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            document.getElementById('display_text').innerText = data;
            document.getElementById('display_html').innerHTML = data;
        } else {
            document.getElementById('error_msg').innerText = "Sorry, please try again later"
        }
    } catch {
        document.getElementById('error_msg').innerText = "SERVER IS DEAD"
    }

});
