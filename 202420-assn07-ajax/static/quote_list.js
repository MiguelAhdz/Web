
// retrieve immediately on document load
document.addEventListener('DOMContentLoaded',async () => {
    console.log("Document loaded, JavaScript running!")


    const error = document.getElementById("error_msg");
    const showError = (msg) => {
        error.classList.remove('d-none');
        error.innerText = msg;
    }
    const hideError = () =>{
        error.classList.add('d-none');
    }
    const display = (data) =>{
        const list = document.getElementById("thelist");
        list.innerHTML = "";

        data.forEach((quote) => {
                const listItem = document.createElement("li");
                listItem.classList.add("list-group-item");
                listItem.textContent = quote.text();
                list.appendChild(listItem);
            }

        );
    };

    try {
        hideError();
        const response = await fetch('/quotes');
        const data = await response.json();
        if (!response.ok) {
            showError(response.statusText);
        } else {
            display(data);
        }
    } catch (e){
        showError(0);
    }
});