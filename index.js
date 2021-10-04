const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

let createMD = (answers) => {
    let license;
    switch (answers.license) {
        case 'MIT License':
            license = 'MIT License: Users can use, copy, modify, merge, publish, and distribute this programming as long as they include this license within their project.';
            break;
        case 'Apache License 2.0':
            license = 'Apache License 2.0: Users can use, copy, modify, etc this programming so as long as they include the original license in their software and state any significant changes they made';
            break;
        case 'GPL License':
            license = 'GPL License: Users can use, copy, modify, etc this programming so as long as the source code is freely available and their users are given the same rights';
            break;
        case 'Mozilla Public License 2.0 (MPL)':
            license = 'Mozilla Public License 2.0 (MPL): Users can use this programming so as long as they include an original copy of the software and any modified files.';
            break;
        default:
            license = 'There is no license associated with this app.';
    }

return `# ${answers.title}

## Description

${answers.description}

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [License](#license)
4. [Contributing](#contributing)
5. [Tests](#tests)
6. [Questions](#questions)

## <a name="installation"></a>Installation

${answers.installation}

## <a name="usage"></a>Usage

${answers.usage}

## <a name="license"></a>License

${license}

## <a name="contributing"></a>Contributing

${answers.contributing}

## <a name="tests"></a>Tests

${answers.tests}

## <a name="questions"></a>Questions

For any questions you can reach out either via github or email at the following:

- Github: https://github.com/${answers.githubProfile}
- Email: ${answers.email}`;
};

let askQuestions = () => {
    const questions = [
        {
            type: 'input',
            name: 'title',
            message: 'What is your project called?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a brief description of the project.'
        },
        {
            type: 'input',
            name: 'installation',
            message: 'How is this app installed?'
        },
        {
            type: 'input',
            name: 'usage',
            message: 'What is the intended use of the app?'
        },
        {
            type: 'list',
            name: 'license',
            message: 'What license do you have for this project?',
            choices: ['MIT License',
                      'Apache License 2.0',
                      'GPL License',
                      'Mozilla Public License 2.0 (MPL)',
                      'None']
        },
        {
           type: 'input',
           name: 'contributing',
           message: 'What are the guidelines for contributing?' 
        },
        {
            type: 'input',
            name: 'tests',
            message: 'What tests are available?'
        },
        {
            type: 'input',
            name: 'githubProfile',
            message: 'What is your github username to link to your profile?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What email can be contact you at with questions?',
            validate(val) {
                for(let i = 0; i < val.length; i++) {
                    if(val[i] === '@') {
                        return true;
                    }
                }
                return 'Please enter a valid email';
            }
        }
    ];

    inquirer.prompt(questions)
        .then((answers) => writeFileAsync('generated-readme.md', createMD(answers)))
        .then(() => console.log('Successfully wrote to index.html'))
        .catch((err) => console.error(err));
}

let init = () => {
    console.log('Let\'s create a readme file!');
    askQuestions();
}

init();