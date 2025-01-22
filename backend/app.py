from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

def get_db_connection():
    connection = sqlite3.connect("form_data.db")
    connection.row_factory = sqlite3.Row
    return connection

def init_db():
    print("Створення таблиці...")
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS submissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL
        )
    """)
    connection.commit()
    connection.close()
    print("Таблиця успішно створена.")


def is_table_exists():
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT name FROM sqlite_master WHERE type='table' AND name='submissions';
    """)

    table_exists = cursor.fetchone() is not None
    connection.close()

    return table_exists

@app.route('/submit_form', methods=['POST'])
def submit_form():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        if not name or not email or not message:
            return jsonify(status="error", message="Будь ласка, заповніть всі поля.")

        connection = get_db_connection()

        cursor = connection.cursor()

        cursor.execute(
            "INSERT INTO submissions (name, email, message) VALUES (?, ?, ?)",
            (name, email, message)
        )

        connection.commit()

        connection.close()

        return jsonify(status="success", message="Форма успішно відправлена!")
    except Exception as e:
        print(f"Помилка: {e}")
        return jsonify(status="error", message="Сталася помилка при обробці форми.")

if __name__ == '__main__':
    if not is_table_exists():
        print("Таблиця не існує. Ініціалізація бази даних...")
        init_db()
    else:
        print("Таблиця вже існує. Ініціалізація не потрібна.")

    debug_mode = os.environ.get("FLASK_ENV", "development") == "development"
    app.run('0.0.0.0', debug=debug_mode)

