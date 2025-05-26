const f = document.createElement('footer');

document.body.append(f);

const today = new Date();

const thisYear = today.getFullYear();

const footer = document.querySelector('footer');

const copyright = document.createElement('p');

copyright.innerHTML = `David Camacho ${thisYear}`;

footer.appendChild(copyright);

const skills = ["Scientific writing", "Statistical analysis", "Time management", "Problem-solving", "Attention to detail"];

const skillsSection = document.getElementById("skills");

const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement("li");

    skill.innerText = skills[i];

    skillsList.appendChild(skill); 
}

const messageForm = document.forms['leave_message'];
messageForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const usersName = event.target.usersName.value;
    const usersEmail = event.target.usersEmail.value;
    const usersMessage = event.target.usersMessage.value;

    console.log(usersName, usersEmail, usersMessage);

    const messageSection = document.getElementById('messages');
    const messageList = messageSection.querySelector('ul');
    const newMessage = document.createElement('li');

    newMessage.innerHTML = `
        <a href="mailto:${usersEmail}">${usersName}</a>
        <span> wrote: ${usersMessage}</span>
        `;

    const removeButton = document.createElement('button');
    removeButton.innerText = 'remove';
    removeButton.type = 'button';

    removeButton.addEventListener('click', function () {
        const entry = removeButton.parentNode;
        entry.remove();
    });

    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

    messageForm.reset();
});

fetch('https://api.github.com/users/dcamacho2002/repos') 
    .then(function (response) {
        return response.json();
    })
    .then(function (repositories) {
        console.log(repositories);

        const projectSection = document.getElementById("Projects");
        const projectList = projectSection.querySelector("ul");

        for (let i = 0; i < repositories.length; i++) {
            const project = document.createElement("li");
            const link = document.createElement("a");
            link.href = repositories[i].html_url;
            link.innerText = repositories[i].name;
            link.targget = "_blank";
            project.appendChild(link);
            projectList.appendChild(project);
        }
    })

    .catch(function (error) {
        console.error('An error occurred:', error);
        console.log('Project section empty.');
    })

