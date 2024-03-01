import json
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseNotAllowed, JsonResponse, HttpResponse

from prueba.preguntas import preguntas_materias, preguntas_companeros, preguntas_trabajos,preguntas_profesores, preguntas_centro, estudios_generales, preguntas_personales, preguntas_examenes


import nltk
import random
import joblib


try:
    modelo=joblib.load("./prueba/sentimientos_modelo.pkl")
except Exception as e:
    print("Error:", e)

# Lista de preguntas sobre materias
pregunta_materia_clave = "¿Cómo te afecta emocionalmente el sentir que vas por detrás de tus compañeros en clase?"
pregunta_companeros_clave = "¿Cómo te afecta emocionalmente la relación con tus compañeros en la decisión de ir a clase?"
preguntas_profesores_clave = "¿Te sientes apoyado/a por profesores en tus estudios?"
preguntas_centro_clave = "Describe emocionalmente tu experiencia en el centro hasta ahora"
preguntas_estudios_clave = "¿Cómo te sientes emocionalmente acerca de tu progreso académico hasta ahora?"
preguntas_trabajos_clave = "¿Sentiste que tus contribuciones en los trabajos fueron valoradas emocionalmente por el grupo al que pertenecias?"
preguntas_personales_clave = "¿Cómo has experimentado emocionalmente tu propio crecimiento personal en el último año?"
preguntas_examenes_clave = "¿Qué haces si no estás satisfecho con tus resultados de los exámenes?"

def crear_arrays(preguntas, pregunta_clave):
    preguntas_disponibles = preguntas.copy()

    if pregunta_clave in preguntas_disponibles:
        preguntas_disponibles.remove(pregunta_clave)

    pregunta_aleatoria_1 = random.choice(preguntas_disponibles)
    preguntas_disponibles.remove(pregunta_aleatoria_1)
    pregunta_aleatoria_2 = random.choice(preguntas_disponibles)
    array = [pregunta_aleatoria_1, pregunta_aleatoria_2,pregunta_clave]

    return array

preguntas_materias_completa=crear_arrays(preguntas_materias,pregunta_materia_clave)
preguntas_companeros_completa=crear_arrays(preguntas_companeros,pregunta_companeros_clave)
preguntas_profesores_completa=crear_arrays(preguntas_profesores,preguntas_profesores_clave)
preguntas_centro_completa=crear_arrays(preguntas_centro,preguntas_centro_clave)
estudios_generales_completa=crear_arrays(estudios_generales,preguntas_estudios_clave)
preguntas_trabajos_completa=crear_arrays(preguntas_trabajos,preguntas_trabajos_clave)
preguntas_personales_completa=crear_arrays(preguntas_personales,preguntas_personales_clave)
preguntas_examenes_completa=crear_arrays(preguntas_examenes,preguntas_examenes_clave)

todas_las_preguntas=[preguntas_materias_completa,preguntas_companeros_completa,preguntas_profesores_completa,preguntas_centro_completa,estudios_generales_completa,
                     preguntas_trabajos_completa,preguntas_personales_completa,preguntas_examenes_completa]



objeto = {}
puntuaciones=[]
@csrf_exempt
def chatbot_view(request):
    global objeto

    if request.path == '/api/chatbot/preguntas':
        if request.method == 'GET':
            return JsonResponse({"datos":objeto})
        elif request.method == 'POST':
            try:
            # Obtener los datos del cuerpo de la solicitud POST
                data = json.loads(request.body)
                
                # Aquí puedes procesar los datos como desees
                # Por ejemplo, imprimirlos en la consola
                texto_completo=str(data)
                # Encontrar la posición de 'respuestas'
                indice_respuestas = texto_completo.find("respuestas': ")

                # Encontrar la posición de 'fecha' después de ',  'respuestas'
                indice_fecha = texto_completo.find(", 'fecha'", indice_respuestas)

                # Si no se encuentra 'fecha' después de ',  'respuestas', prueba sin la coma
                if indice_fecha == -1:
                    indice_fecha = texto_completo.find(" 'fecha'", indice_respuestas)

                # Extraer la porción de texto entre 'respuestas' y 'fecha' sin incluir 'respuestas'
                texto = texto_completo[indice_respuestas + len("respuestas': "):indice_fecha]
                texto_modificado = texto.replace('[', '').replace(']', '').replace("'", '')

                # Se realiza el analisis
                array_resultado = texto_modificado.split(",")
                for frase in array_resultado:
                    puntuacion=modelo.predict([frase])[0]
                    puntuacion= round(puntuacion, 2)
                    puntuaciones.append(puntuacion)
                data["puntuaciones"] = puntuaciones
                objeto=data
                print(objeto)


                # Puedes devolver una respuesta al cliente si es necesario
                return JsonResponse({'message': 'Datos recibidos correctamente'})
            except json.JSONDecodeError as e:
                # Manejar errores de decodificación JSON
                return JsonResponse({'error': 'Error de decodificación JSON'}, status=400)
        else:
            return HttpResponse(status=405) 
    else:
        if request.method == 'GET':
            response_data = {"preguntas": todas_las_preguntas }
            return JsonResponse(response_data)
    

# Instalar antes de ejecutar el servidor
#    
# pip install django
# pip install djangorestframework
# pip install django-cors-headers
# pip install joblib  
    
# Arrancar el Servidor: python manage.py runserver
# Este comando lo debes ejecutar en el terminal del directorio Django antes de arrancar la web en angular
# Si no funciona lo que se acaba de instalar, en cualquier caso, reiniciar Visual Studio
