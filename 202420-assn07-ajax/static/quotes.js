
const search = document.getElementById('search');
const error = document.getElementById('error_msg');
const list = document.getElementById('thelist');

search.addEventListener('input', function() {
    const searchTerm = search.value.trim();
    if (searchTerm === '') {
        list.innerHTML = '';
        error.innerText = '';
        return;
    }

    fetch('/quotes_search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({searchTerm: searchTerm}),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            updateList(data);
        })
        .catch(errors => {
            error.innerText = 'An error happened while fetching data.';
        });
});

function updateList(results) {
    list.innerHTML = '';
    if (results.length > 0) {
        results.forEach(result => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.innerText = result.text;
            list.appendChild(listItem);
        });
        error.innerText = '';
    } else {
        error.innerText = 'No results found.';
    }
}
