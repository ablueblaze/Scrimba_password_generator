const password = (() => {
    /*
    Password requirements that I'm going to use in this project:
        at least 1 capital letter
        at least 1 lowercase letter
        at least 1 number
        at least 1 special character
        minimum 6 characters in length
        maximum 20 character in length
    */
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '1234567890';
    const symbols = '!@#$%^&*()_+-=<>';

    const randomNum = (num) => Math.floor(Math.random() * num);

    // Determine how many of each type of character the password will use
    const characterTypeGen = (num) => {
        let baseNum = num - 6;
        let assignmentNum = randomNum(baseNum) + 1;
        let vars = {
            lowerCase: 1,
            upperCase: 1,
            number: 2,
            symbol: 2,
        };

        vars.lowerCase += assignmentNum;
        baseNum -= assignmentNum;
        assignmentNum = randomNum(baseNum);

        vars.upperCase += assignmentNum;
        baseNum -= assignmentNum;
        assignmentNum = randomNum(baseNum);

        vars.number += assignmentNum;
        baseNum -= assignmentNum;

        vars.symbol += baseNum;
        return vars;
    };

    // Return random characters from given array
    const pickRandChars = (num, array) => {
        let newArray = [];
        for (let i = 0; i < num; i++) {
            newArray.push(array[randomNum(array.length - 1)]);
        }
        return newArray;
    };

    const shuffle = (array) => {
        let currentIndex = array.length;
        let randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = randomNum(currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }
        return array;
    };

    const create = (num) => {
        vars = characterTypeGen(num);
        const lower = pickRandChars(vars.lowerCase, letters);
        const upper = pickRandChars(vars.upperCase, letters.toUpperCase());
        const nums = pickRandChars(vars.number, numbers);
        const syms = pickRandChars(vars.symbol, symbols);

        const temp = lower.concat(upper.concat(nums.concat(syms.concat())));
        const newPassword = shuffle(temp);
        return newPassword.join('');
    };

    return { create };
})();

const appendPasswords = (length) => {
    const passwordEls = document.querySelectorAll('[data-new-password]');
    for (let i of passwordEls) {
        i.textContent = password.create(length);
    }
};

appendPasswords(12);

const generateBtn = document.getElementById('generate-btn');

// I tried to get the input number to reflect what was given.
// But I wasn't able to find a work around.
generateBtn.addEventListener('click', () => {
    const lengthEl = document.getElementById('length-el');
    const length = lengthEl.value;
    if (length > 20) {
        lengthEl.value = 20;
        appendPasswords(20);
        alert('Max password length is 20 characters');
        return;
    }
    if (length < 8) {
        lengthEl.value = 8;
        appendPasswords(8);
        alert('Minimum password length is 8 characters');
        return;
    }
    appendPasswords(length);
});
