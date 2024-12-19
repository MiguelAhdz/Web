console.log("hi");

// solution 1
document.getElementById("wishes").innerText = "I hate you bob";

// solution 2
document.getElementById("duck").src ='https://pbs.twimg.com/media/DnH2kP2XcAAv7et?format=jpg&name=small'

//solution 3
const thumbnails = document.getElementsByClassName("thumbnail");
for (let thumb of thumbnails) {
    thumb.style.width = "300px";
}

//solution 4
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.btn-primary').onclick = () => {
        let p = document.querySelector('.btn-primary').parentNode;
        p.style.cssText = 'color: red; font-size: 24px;';
    };
});

//solution 5
document.addEventListener('DOMContentLoaded', () => {
    const circle = document.querySelector('img[src*="Ski_trail_rating_symbol-green_circle.svg"]');
    const message = circle.nextElementSibling;

    circle.addEventListener('mouseenter', () => {
        message.classList.remove('hidden');
    });

    circle.addEventListener('mouseleave', () => {
        message.classList.add('hidden');
    });
});

//solution 6
document.addEventListener('DOMContentLoaded', () => {
    const [firstTextbox, secondTextbox] = document.querySelectorAll('input[type="textbox"]');

    firstTextbox.addEventListener('input', () => {
        secondTextbox.value = firstTextbox.value;
    });
});

//solution 7
document.addEventListener('DOMContentLoaded', function() {
    var textbox = document.getElementById('haha-textbox');

    textbox.addEventListener('blur', function() {
        this.value = "HAHA";
    });
});



//solution 8
document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.querySelector('input[type="checkbox"]');
    const selectBox = document.querySelector('select');

    function toggleSelectBox() {
        selectBox.disabled = !checkbox.checked;
    }

    toggleSelectBox();

    checkbox.addEventListener('change', toggleSelectBox);
});

//solution 9
document.addEventListener('DOMContentLoaded', () => {
    const numberElement = document.querySelector('.panel-body h1');

    function countdown(value) {
        numberElement.textContent = value;
        if (value > 0) {
            setTimeout(() => countdown(value - 1), 1000);
        }
    }

    numberElement.addEventListener('click', () => {
        if (numberElement.textContent === '5') {
            countdown(5);
        }
    });
});



