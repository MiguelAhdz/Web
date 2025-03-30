// your problem two code goes here
// remember that you can only use await in an async function

document.getElementById('go').addEventListener('click', async ()=> {
    const response = await fetch('/instructors');
    const data = await response.json();

    console.log(data);

    const list = document.getElementById('thelist');
    for(let dataum )

        dataum.name + dataum.
})