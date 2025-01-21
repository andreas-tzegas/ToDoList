let form = document.getElementById('form');
let taskNameInput = document.getElementById('taskName');
let taskContentInput = document.getElementById('taskContent');
let message = document.getElementById('message');
let ul = document.getElementById('liste');

// Fonction pour ajouter un message utilisateur
function displayMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
    setTimeout(() => (message.textContent = ''), 3000); // Efface le message après 3 secondes
}

// Vérifier si une tâche est unique
function isTaskUnique(taskName, taskContent) {
    let tasks = ul.querySelectorAll('li');
    for (let task of tasks) {
        let name = task.querySelector('.task-name').textContent.trim();
        let content = task.querySelector('.task-content').textContent.trim();
        if (name === taskName.trim() || content === taskContent.trim()) {
            return false;
        }
    }
    return true;
}

// Ajouter une tâche à la liste
function addTask(event) {
    event.preventDefault();

    let taskName = taskNameInput.value.trim();
    let taskContent = taskContentInput.value.trim();

    if (!taskName || !taskContent) {
        displayMessage('Veuillez remplir tous les champs', 'red');
        return;
    }

    if (!isTaskUnique(taskName, taskContent)) {
        displayMessage('La tâche ou le nom existe déjà', 'red');
        return;
    }

    // Créer les éléments HTML de la tâche
    let li = document.createElement('li');
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    let nameSpan = document.createElement('span');
    nameSpan.textContent = taskName;
    nameSpan.classList.add('task-name');

    let contentSpan = document.createElement('span');
    contentSpan.textContent = taskContent;
    contentSpan.classList.add('task-content');

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.classList.add('delete_button');

    // Supprimer une tâche au clic sur le bouton
    deleteButton.addEventListener('click', () => {
        li.remove();
        displayMessage('Tâche supprimée', 'green');
    });

    // Marquer une tâche comme terminée
    checkbox.addEventListener('change', () => {
        nameSpan.classList.toggle('completed', checkbox.checked);
        contentSpan.classList.toggle('completed', checkbox.checked);
    });

    // Ajouter les éléments à la tâche
    li.appendChild(checkbox);
    li.appendChild(nameSpan);
    li.appendChild(contentSpan);
    li.appendChild(deleteButton);
    ul.appendChild(li);

    // Réinitialiser les champs du formulaire
    taskNameInput.value = '';
    taskContentInput.value = '';
    displayMessage('Tâche ajoutée avec succès', 'green');
}

// Ajouter un gestionnaire d'événements au formulaire
form.addEventListener('submit', addTask);