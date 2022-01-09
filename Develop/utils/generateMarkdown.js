// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(Apache) {
  if (licenses === Apache) {
    return `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`
  } else if (licenses === MIT) {
    return `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`
  } else if (licenses === Mozilla) {
    return `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`
  }
};

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
//   return `# ${data.title}

// `;
renderLicenseBadge();
}

module.exports = generateMarkdown;
