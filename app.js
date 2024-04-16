const express = require("express");
const app = express();
const path = require('path')
const port = process.env.PORT || 3001;
const options = {
  index: "home.html"
};

app.use(express.static(path.join(__dirname, 'Semester.Project'), options));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
