var inputBox = document.getElementById("input-box");
inputBox.onkeyup = function () {
    var input = inputBox.value;
    if (input.length != 0) {
        fetch('/__wb/search/host?q=' + input)
            .then(result => result.json())
            .then(data => {
                if (data.hosts.length != 0) {
                    let row = '';
                    for (i = 0; i < data.hosts.length; i++) {
                        displayName = data.hosts[i].display_name;
                        row += `<li>${displayName}</li>`;
                        document.getElementById('tableone').innerHTML = row;
                    }
                    document.getElementById('tableone').innerHTML = `<ul>${row}</ul>`;
                    console.log(data)
                }
                else {
                    // document.getElementById('tableone').innerHTML = `<ul><li>${input}</li></ul>`;
                    document.getElementById('tableone').innerHTML = ``;
                }
            })
            .catch(error => console.log(error))
    } else {
        document.getElementById('tableone').innerHTML = '';
    }
}