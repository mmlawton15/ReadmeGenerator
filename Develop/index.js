// DONE - GIVEN a command-line application that accepts user input
// DONE - WHEN I am prompted for information about my application repository
// DONE - THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
// DONE - WHEN I enter my project title
// DONE - THEN this is displayed as the title of the README
// DONE - WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
// DONE - THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
// DONE - WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
// DONE - WHEN I enter my GitHub username
// DONE - THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// DONE - WHEN I enter my email address
// DONE - THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
// DONE - WHEN I click on the links in the Table of Contents
// DONE - THEN I am taken to the corresponding section of the README
// RECORD A VIDEO OF THIS APPS FUNCTIONALITY AND ADD SCREENSHOTS

// PACKAGES NEEDED FOR THIS TO WORK
const inquirer = require('inquirer');
const fs = require("fs");
const path = require("path")

// FUNCTION TO WRITE README
const promptUserForReadMeInfo = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your project? (Required)',
            validate: titleInput => {
                if (titleInput) {
                    return true;
                }else {
                    console.log('Please enter a title!');
                    return false;
                }
            },
        },
        {
            type: 'input',
            name: 'description',
            message: 'Please provide a description for your project. (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('Please enter a description!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'installation',
            message: 'How would someone install your project? (Required)',
            validate: installationInput => {
                if (installationInput) {
                    return true;
                } else {
                    console.log('Please enter installation instructions!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'useOfProject',
            message: 'How do you use this project? (Required)',
            validate: useOfProjectInput => {
                if (useOfProjectInput) {
                    return true;
                } else {
                    console.log('Please enter how to use the project!');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'licenses',
            message: 'What licenses are needed to use this project? Check all that apply (Required)',
            choices: ['None', 'Apache', 'MIT','Mozilla'],
        },
        {
            type: 'input',
            name: 'contributors',
            message: 'Did anyone contribute to this project? (Required)',
            validate: contributorsInput => {
                if (contributorsInput) {
                    return true;
                } else {
                    console.log('Please add any contributors, if none specify!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'testing',
            message: 'How do we test this project? (Required)',
            validate: testingInput => {
                if (testingInput) {
                    return true;
                } else {
                    console.log('Please enter how to test this project! (Required)');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'githubLink',
            message: 'What is the GitHub username? (Required)',
            validate: githubRepoInput => {
                if (githubRepoInput) {
                    return true;
                } else {
                    console.log('Please enter the Github username!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'emailInput',
            message: 'What the best email for people to reach you? (Required)',
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log('Please enter the Github username!');
                    return false;
                }
            }
        },
    ])
    .then((answers) => {
        writeToFile(answers)
    })
    
}

function renderLicenseBadge(licenseType) {
    if (licenseType === 'Apache') {
      return `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`
    } else if (licenseType === 'MIT') {
      return `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`
    } else if (licenseType === 'Mozilla') {
      return `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`
    }
  };

//MARKDOWN SECTION
const printProfileData = profileDataArr => {
    console.log("=========");
    return `
# ${profileDataArr.title}
## Table of Contents 
1. [Project Description](#project-description)
2. [Installation Instructions](#installation-instructions)
3. [Project Use](#project-use)
4. [Licenses](#licenses)
5. [Contributors](#contributors)
6. [Testing](#testing)
7. [Questions](#questions)
## Project Description
- ${profileDataArr.description}
## Installation Instructions
-  ${profileDataArr.installation}
## Project Use
- ${profileDataArr.useOfProject}
## Licenses
- ${profileDataArr.licenses} ${renderLicenseBadge(profileDataArr.licenses)}
## Contributors
- ${profileDataArr.contributors}
## Testing
 - ${profileDataArr.testing}
## Questions
 - If you have questions, please check out [MM's Github](www.github.com/${profileDataArr.githubRepo}), or reach out to me at ${profileDataArr.email}.
`
};

//WRITE THE README FILE
function writeToFile(dataFromInq) {
    var printToStrng = printProfileData(dataFromInq);
    fs.writeFileSync(path.join(process.cwd(), "README.md"), printToStrng);   
}

//CALL TO README FUNCTIONS
promptUserForReadMeInfo()