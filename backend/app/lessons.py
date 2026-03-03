<<<<<<< HEAD
 from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .db_connections import lessons_collection
from bson import ObjectId
=======
from app.models import Lesson, Quiz
>>>>>>> cd5193d120afa605d62d6e5395cf9dd8c76830c7

# Add a quiz to a lesson
def add_quiz(lesson_id, question, answer):
    try:
        lesson = Lesson.objects.get(id=lesson_id)
        quiz = Quiz.objects.create(
            question=question,
            answer=answer,
            lesson=lesson
        )
        return quiz
    except Lesson.DoesNotExist:
        return None

# Get quizzes for a lesson
def get_quiz(lesson_id):
    try:
        lesson = Lesson.objects.get(id=lesson_id)
        quizzes = list(lesson.quizzes.values("question", "answer"))
        return quizzes
    except Lesson.DoesNotExist:
        return []

# Submit a quiz answer (optional: log interaction)
def submit_quiz(lesson_id, question, user_answer):
    # Simple check
    quizzes = get_quiz(lesson_id)
    for q in quizzes:
        if q["question"] == question:
            correct = q["answer"] == user_answer
            return {"correct": correct}
    return {"correct": False, "error": "Question not found"}