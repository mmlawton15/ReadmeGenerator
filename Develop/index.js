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