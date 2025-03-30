// retrieve immediately on document load
(async () => {
    console.log("Document loaded, JavaScript running!")

    //error handling
    const err = document.getElementById('error_msg');
    const showError = (msg) => {
        err.classList.remove('d-none');
        err.innerText = msg;
    }
    const hideError = () => {
        err.classList.add('d-none');
    }

//display
    const display = (data) => {
        const list = document.getElementById("thelist");
        const template = document.getElementById("template");

        const showDeleteButton = (e) => {
            const deleteButton = e.currentTarget.querySelector('.col-min');
            if (deleteButton) {
                deleteButton.classList.remove('d-none');
            }
        };

        const hideDeleteButton = (e) => {
            const deleteButton = e.currentTarget.querySelector('.col-min');
            if (deleteButton) {
                deleteButton.classList.add('d-none');
            }
        };

        const deleteQuote = async (e) => {
            const listItem = e.currentTarget.closest('li');
            const quoteId = listItem.dataset.id;
            try {
                const response = await fetch(`/delete/${quoteId}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                listItem.remove();
            } catch (error) {
                showError(error.message);
            }
        };

        data.forEach((quote) => {
            const item = template.cloneNode(true);
            item.id = "";
            const quoteText = item.querySelector('.col.align-self-center');
            if (quoteText) {
                quoteText.innerText = quote.text;
            }
            const attribute = item.querySelector('.d-flex.flex-row.justify-content-center.mt-2');
            const quoteSpeaker = attribute && attribute.querySelector('.font-size');
            const quoteSource = attribute && attribute.querySelector('.font-italic');

            if (quoteSpeaker) {
                quoteSpeaker.innerText = quote.speaker || "";
            }

            if (quoteSource) {
                quoteSource.innerText = quote.source || "";
            }
            item.dataset.id = quote.id;
            item.classList.add('list-item');
            item.addEventListener('mouseenter', showDeleteButton);
            item.addEventListener('mouseleave', hideDeleteButton);
            const deleteButton = item.querySelector('.col-min');
            if (deleteButton) {
                deleteButton.addEventListener('click', deleteQuote);
            }
            item.classList.remove('d-none');
            list.appendChild(item);
        });
    };

    try{
        hideError();
        const response = await fetch('/quotes');
        const data = await response.json();
        if (!response.ok) {
            showError(response.statusText);
        } else {
            display(data);
        }
    } catch(e) {
        showError(e);
    }
})();