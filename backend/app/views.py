from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def get_lessons(request):
    # Example placeholder
    return JsonResponse({"message": "get_lessons placeholder"})

@csrf_exempt
def get_lesson(request):
    # Example placeholder
    return JsonResponse({"message": "get_lesson placeholder"})

@csrf_exempt
def log_interaction(request):
    # Example placeholder
    return JsonResponse({"message": "log_interaction placeholder"})