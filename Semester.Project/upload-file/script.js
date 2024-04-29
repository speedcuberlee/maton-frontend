// Get references to HTML elements
let fileInput = document.getElementById("file-input");
let fileList = document.getElementById("files-list");
let numOfFiles = document.getElementById("num-of-files");

// Add event listener to file input element
fileInput.addEventListener("change", () => {
  // Clear file list and update number of files selected
  fileList.innerHTML = "";
  numOfFiles.textContent = `${fileInput.files.length} Files Selected`;

  // Loop through selected files
  for (let file of fileInput.files) {
    // Create a new list item for each file
    let listItem = document.createElement("li");

    // Get file name and size
    let fileName = file.name;
    let fileSize = (file.size / 1024).toFixed(1);

    // Format file size in KB or MB
    if (fileSize >= 1024) {
      fileSize = (fileSize / 1024).toFixed(1);
      listItem.innerHTML = `<p>${fileName}</p><p>${fileSize}MB</p>`;
    } else {
      listItem.innerHTML = `<p>${fileName}</p><p>${fileSize}KB</p>`;
    }

    // Add list item to file list
    fileList.appendChild(listItem);
  }
});
