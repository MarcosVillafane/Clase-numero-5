document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const inputWord = document.getElementById('inputWord').value;
    const passwordType = document.getElementById('passwordType').value;
    const generatedPassword = generatePassword(inputWord, passwordType);
    document.getElementById('generatedPassword').textContent = `Contraseña generada: ${generatedPassword}`;
    updateBackground(passwordType);
});

function generatePassword(word, type) {
    const alphanumericCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    const numericCharacters = '0123456789';
    const characters = type === 'numeric' ? numericCharacters : alphanumericCharacters;
    let password = '';
    for (let i = 0; i < word.length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}

function updateBackground(type) {
    document.body.className = type;
}