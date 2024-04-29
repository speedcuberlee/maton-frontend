// Wait for the DOM to finish loading
document.addEventListener("DOMContentLoaded", function () {
  // Define a function to generate the table of contents
  var tableOfContents = function () {
    // Initialize an empty string to build the TOC HTML
    var html = "";

    // Get all H1 headings in the article
    var title = document.querySelectorAll("article.post h1.entry-title");

    // Loop through each H1 heading
    for (var i = 0; i < title.length; i++) {
      // Set an ID for the heading
      title[i].setAttribute("id", "toc-item-" + i);

      // Get all H2 subheadings within the current article
      var subTitle = document.querySelectorAll(
        "article#post-" + (i + 1) + " h2"
      );

      // Initialize an empty string to build the subheading HTML
      var subHtml = "";

      // Loop through each H2 subheading
      for (var j = 0; j < subTitle.length; j++) {
        // Create a unique ID for the subheading
        var value = `${i}${j}`;
        subTitle[j].setAttribute("id", "toc-subitem-" + value);

        // Add the subheading to the HTML
        subHtml += `<li class="list-group-subitem"><a href="#toc-subitem-${value}">${subTitle[j].innerHTML}</a></li>`;
      }

      // Add the heading and subheadings to the TOC HTML
      html += `<li class="list-group-item"><a href="#toc-item-${i}">${title[i].innerHTML}</a></li><ul>${subHtml}</ul>`;
    }

    // Update the TOC element with the generated HTML
    document.getElementById("document-toc-list").innerHTML = html;

    // Create an IntersectionObserver to highlight the current section
    const observer = new IntersectionObserver(
      (entries) => {
        // Loop through each observed element
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Get the ID of the observed element
            const id = entry.target.id;

            // Get the corresponding TOC item
            const tocItem = document.querySelector(`[href="#${id}"]`);

            // Highlight the TOC item and its parent
            if (tocItem) {
              tocItem.classList.add("active");
              const parentItem = tocItem.parentNode.parentNode;
              if (parentItem) {
                parentItem.classList.add("active");
              }

              // Remove active class from other subitems
              const otherSubItems = document.querySelectorAll(
                `[href^="#toc-subitem-"]:not([href="#${id}"])`
              );
              otherSubItems.forEach((item) => {
                item.classList.remove("active");
              });
            }
          } else {
            // Remove highlighting when the element is no longer intersecting
            const id = entry.target.id;
            const tocItem = document.querySelector(`[href="#${id}"]`);
            if (tocItem) {
              tocItem.classList.remove("active");
              const parentItem = tocItem.parentNode.parentNode;
              if (parentItem) {
                parentItem.classList.remove("active");
              }
            }
          }
        });
      },
      {
        // Configure the observer to trigger when the element is half visible
        root: null,
        threshold: 0.5,
      }
    );

    // Observe all headings and subheadings
    title.forEach((heading) => {
      observer.observe(heading);
    });

    var subTitle = document.querySelectorAll("h2");
    subTitle.forEach((subheading) => {
      observer.observe(subheading);
    });
  };

  // Run the table of contents generator
  tableOfContents();
});
