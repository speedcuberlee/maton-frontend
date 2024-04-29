// Get the input box element
var inputBox = document.getElementById("input-box");

// Add a keyup event listener to the input box
inputBox.onkeyup = function () {
  // Get the current input value
  var input = inputBox.value;

  // If the input is not empty, make an API request
  if (input.length != 0) {
    // Construct the API URL with the input value
    const apiUrl = "https://maton.onrender.com/__wb/search/host?q=" + input;

    // Make a GET request to the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // If the API returns hosts, generate a list of display names
        if (data.hosts.length != 0) {
          let row = "";
          for (let i = 0; i < data.hosts.length; i++) {
            const displayName = data.hosts[i].display_name;
            row += `<li>${displayName}</li>`;
          }
          // Update the table with the list of display names
          document.getElementById("tableone").innerHTML = `<ul>${row}</ul>`;
          console.log(data); // Log the API response for debugging
        } else {
          // If no hosts are found, clear the table
          document.getElementById("tableone").innerHTML = "";
        }
      })
      .catch((error) => console.log(error)); // Catch any errors and log them
  } else {
    // If the input is empty, clear the table
    document.getElementById("tableone").innerHTML = "";
  }
};
