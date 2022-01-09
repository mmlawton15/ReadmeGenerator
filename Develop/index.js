// DONE - GIVEN a command-line application that accepts user input
// DONE - WHEN I am prompted for information about my application repository
// DONE - THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
// DONE - WHEN I enter my project title
// DONE - THEN this is displayed as the title of the README
// DONE - WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
// DONE - THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
// DONE - WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README
// RECORD A VIDEO OF THIS APPS FUNCTIONALITY AND ADD SCREENSHOTS


// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');
const fs = require("fs");
const path = require("path")

var title;
var description;
var tOC;
var installation;
var useOfProject;
var licenses;
var contributors;
var testing;
var githubRepo;



// TODO: Create an array of questions for user input
const questions = [
    {
        message: "What is the title of your project?",
        name: "title"
    },
    {
        message: "What is the description of the project?",
        name: "description"
    },
    {
        message: "What do you want in your Table of Contents",
        name: "tableOfContents"
    },
    {
        message: "How do I install this project?",
        name: "installation"
    },
    {
        message: "How do you use this project?",
        name: "useOfProject"
    },
    {
        message: "What licenses do I need to use this project?",
        name: "licenses"
    },
    {
        message: "Did anyone contribute to this project?",
        name: "constributors"
    },
    {
        message: "How can I test this project?",
        name: "testing"
    },
    {
        message: "What if the use has questions?",
        name: "special"
    },
];


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
            name: 'tOC',
            message: 'Please list out your Table of Contents, each step separated by a comma starting from the first step (Required).',
            validate: tOCInput => {
                if (tOCInput) {
                    //var tOCArray = tOCInput.split(", ", <br></br>);
                    tOC = tOCInput;
                    return true;
                } else {
                    console.log('Please enter your table of contents chapters!');
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
            choices: ['None', 'Apache', 'Boost', 'ISC', 'BSD', 'Mozilla'],
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
            name: 'githubRepo',
            message: 'What is the github link? (Required)',
            validate: githubRepoInput => {
                if (githubRepoInput) {
                    githubRepo = githubRepoInput
                    return true;
                } else {
                    console.log('Please enter a URL to the github repo!');
                    return false;
                }
            }
        },
    ])
    .then((data) => writeToFile(data))
    
}

//trying to send the licenses chosen to generateMarkdown.js
export { licenses }

//MARKDOWN SECTION
const printProfileData = profileDataArr => {
    console.log("=========");
    return `
# ${title}
## Table of Contents 
1. ${tOC}
## Project Description 
- ${description}
## Installation Instructions 
1. ${installation}
## How to Use Project 
- ${useOfProject}
## Licenses Needed 
- ${licenses}
## Contributions 
- ${contributors}
## Testing 
 - ${testing}
## GitHub Repo Link 
[title] (${githubRepo})
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
