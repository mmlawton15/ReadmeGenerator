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

// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js'); //i think my badges will show up after i call this. error licenses is not defined shows up
const fs = require("fs");
const path = require("path")

var title;
var description;
var installation;
var useOfProject;
var licenses;
var contributors;
var testing;
var githubRepo;
var email;


// TODO: Create a function to write README file
const promptUserForReadMeInfo = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your project? (Required)',
            validate: titleInput => {
                if (titleInput) {
                    title = titleInput;
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
                    description = descriptionInput;
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
                    installation = installationInput;
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
                    useOfProject = useOfProjectInput;
                    return true;
                } else {
                    console.log('Please enter how to use the project!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'licenses',
            message: 'What licenses are needed to use this project? Check all that apply (Required)',
            choices: ['None', 'Apache', 'MIT','Mozilla'],
            validate: licensesChosen => {
                if (licensesChosen) {
                    licenses = licensesChosen;
                    return true;
                } else {
                    licenses = licensesChosen;
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'constributors',
            message: 'Did anyone contribute to this project? (Required)',
            validate: contributorsInput => {
                if (contributorsInput) {
                    contributors = contributorsInput;
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
                    testing = testingInput;
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
                    githubRepo = githubRepoInput
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
                    email = emailInput;
                    return true;
                } else {
                    console.log('Please enter the Github username!');
                    return false;
                }
            }
        },
    ])
    .then((data) => writeToFile(data))
    
}

//MARKDOWN SECTION
const printProfileData = profileDataArr => {
    console.log("=========");
    return `
# ${title}
## Table of Contents 
1. [Project Description](#project-description)
2. [Installation Instructions](#installation-instructions)
3. [Project Use](#project-use)
4. [Necessary Licenses](#necessary-licenses)
5. [Contributors](#contributors)
6. [Testing](#testing)
7. [Questions](Questions)
## Project Description 
- ${description}
## Installation Instructions 
-  ${installation}
## How to Use Project 
- ${useOfProject}
## Licenses Needed 
- ${licenses}
## Contributions 
- ${contributors}
## Testing 
 - ${testing}
## Questions
 - If you have questions, please check out [MM's Github](www.github.com/${githubRepo}), or reach out to me at ${email}.
`
};

//WRITE THE README FILE
function writeToFile(data) {
    var printToStrng = printProfileData(data);
    fs.writeFileSync(path.join(process.cwd(), "README.md"), printToStrng);   
}

//CALL TO README FUNCTIONS
promptUserForReadMeInfo()
.then(printProfileData())
