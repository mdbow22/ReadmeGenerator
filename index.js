const inquirer = require('inquirer');

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

    inquirer.prompt(questions).then((answers) => {
        console.log(answers);
    });
}

let init = () => {
    console.log('Let\'s create a readme file!');
    askQuestions();
}

init();