fetch('questions.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(questions => {
        const quizContainer = document.getElementById('quiz');
        let correctAnswersCount = 0;

        questions.forEach((question, index) => {
            const questionBlock = document.createElement('div');
            questionBlock.classList.add('question-block');
            questionBlock.innerHTML = `<h3>${index + 1}. ${question.prompt}</h3>`;

            question.options.forEach(option => {
                const label = document.createElement('label');
                label.innerHTML = `
                    <input type="${question.type === "multiple" ? "checkbox" : "radio"}" name="question${index}" value="${option.charAt(0)}" required> ${option}
                `;
                questionBlock.appendChild(label);
                questionBlock.appendChild(document.createElement('br'));
            });
            quizContainer.appendChild(questionBlock);
        });

        document.getElementById('submit').addEventListener('click', () => {
            correctAnswersCount = 0;
            let allAnswered = true; // Флаг для проверки, все ли вопросы отвечены

            questions.forEach((question, index) => {
                const selectedAnswers = Array.from(document.querySelectorAll(`input[name="question${index}"]:checked`))
                    .map(input => input.value);

                const questionBlock = document.querySelector(`.question-block:nth-of-type(${index + 1})`);

                // Проверяем, отвечен ли вопрос
                if (selectedAnswers.length === 0) {
                    allAnswered = false; // Устанавливаем флаг, если ответ не выбран
                    questionBlock.style.border = '2px solid red'; // Подсвечиваем вопрос
                } else {
                    questionBlock.style.border = ''; // Убираем подсветку
                    if (question.type === "multiple") {
                        const correctAnswers = question.answer;
                        const isCorrect = selectedAnswers.length === correctAnswers.length &&
                            selectedAnswers.every(answer => correctAnswers.includes(answer));

                        if (isCorrect) {
                            correctAnswersCount++;
                        } else {
                            selectedAnswers.forEach(selected => {
                                const label = [...questionBlock.querySelectorAll('label')]
                                    .find(label => label.innerText.includes(selected));
                                if (label) {
                                    label.style.color = 'red';
                                }
                            });
                        }
                    } else {
                        if (selectedAnswers[0] === question.answer) {
                            correctAnswersCount++;
                        } else {
                            const label = [...questionBlock.querySelectorAll('label')]
                                .find(label => label.innerText.includes(selectedAnswers[0]));
                            if (label) {
                                label.style.color = 'red';
                            }
                        }
                    }
                }
            });

            // Проверяем, все ли вопросы отвечены
            if (!allAnswered) {
                alert('Пожалуйста, ответьте на все вопросы!'); // Сообщение об ошибке
            } else {
                showResult(correctAnswersCount, questions.length);
            }
        });
    })
    .catch(error => console.error('Ошибка загрузки вопросов:', error));

// Функция для показа результата в модальном окне
function showResult(correctAnswersCount, totalQuestions) {
    document.getElementById('alertMessage').innerText = `Вы ответили правильно на ${correctAnswersCount} вопросов из ${totalQuestions}.`;
    document.getElementById('myModal').style.display = "block";
}

// Функция для закрытия модального окна
function closeModal() {
    document.getElementById('myModal').style.display = "none";
}

// Закрытие модального окна при клике вне его
window.onclick = function (event) {
    const modal = document.getElementById('myModal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
