# Interactive Quiz

## Описание

Interactive Quiz — это веб-приложение, позволяющее пользователям пройти тест на основе вопросов.

## Структура проекта

Проект состоит из следующих файлов:

- `index.html`: Главный HTML-файл, который отображает интерфейс викторины.
- `script.js`: JavaScript файл, реализующий логику викторины и обработку данных.
- `questions.json`: Файл, содержащий вопросы викторины в формате JSON.

### Запуск приложения

- необходимо установить python3, node.js.

git clone https://github.com/yourusername/interactive-quiz.git

cd interactive-quiz

python -m http.server 8000

http://localhost:8000


### Пример JSON-файла `questions.json`


```json
[
    {
        "prompt": "Какие из перечисленных СУБД относятся к реляционным (выберите все подходящие ответы)?",
        "options": [
            "A. MongoDB",
            "B. PostgreSQL",
            "C. MariaDB",
            "D. Elasticsearch",
            "E. Greenplum"
        ],
        "answer": ["B", "C", "E"],
        "type": "multiple"
    },
    {
        "prompt": "Как называется технология, позволяющая преобразовать внутренние IP-адреса в публичные?",
        "options": [
            "A. NAT",
            "B. TCP",
            "C. DNS",
            "D. HTTP"
        ],
        "answer": "A",
        "type": "single"
    }
]
