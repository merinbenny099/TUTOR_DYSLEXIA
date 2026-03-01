from django.db import models

# Example Lesson model
class Lesson(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()

    def __str__(self):
        return self.title

# Example Quiz model
class Quiz(models.Model):
    question = models.TextField()
    answer = models.TextField()
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name="quizzes")

    def __str__(self):
        return self.question

# Add any other models you had in models_mongo.py here