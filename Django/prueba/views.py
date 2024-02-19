import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse

@csrf_exempt
def chatbot_view(request):
    if request.method == 'GET':
        response_data = {"message": "Hola. Has realizado una solicitud GET a la página de inicio."}
        return JsonResponse(response_data)
    elif request.method == 'POST':
        response_data = {"message": "Hola. Has realizado una solicitud POST a la página de inicio."}
        return JsonResponse(response_data)
    else:
        return HttpResponse(status=405) 
    

# Instalar antes de ejecutar el servidor
#    
# pip install django
# pip install djangorestframework
# pip install django-cors-headers
    
# Arrancar el Servidor: python manage.py runserver
