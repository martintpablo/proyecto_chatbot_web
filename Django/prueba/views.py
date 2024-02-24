import json
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseNotAllowed, JsonResponse, HttpResponse

from prueba.preguntas import preguntas_materias, preguntas_companeros, preguntas_profesores, preguntas_centro, estudios_generales, preguntas_personales, preguntas_examenes

'''
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


def hacer_preguntas(categoria, pregunta_clave, preguntas):
    respuestas_categoria = []
    categoria_formateada = categoria.split()[-1].capitalize()  # Extraer la última palabra y capitalizar

    print(f"\n¡Analizaremos la categoría {categoria_formateada}!")

    # Pregunta clave obligatoria
    print(f"1. {pregunta_clave}")
    respuesta_clave = input("Tu respuesta: ")
    
    # Validar que la respuesta tiene al menos 3 palabras
    while len(respuesta_clave.split()) < 3:
        print("Por favor, responde con al menos 3 palabras para poder analizar correctamente como te sientes.")
        respuesta_clave = input("Tu respuesta: ")

    respuestas_categoria.append(respuesta_clave)
    print(f"{respuesta_clave}")

    # Filtrar preguntas que no contienen la palabra clave
    preguntas_filtradas = [pregunta for pregunta in preguntas if pregunta != pregunta_clave]

    # Seleccionar aleatoriamente dos preguntas
    random.shuffle(preguntas_filtradas)
    for i in range(2):
        print(f"{i + 2}. {preguntas_filtradas[i]}")
        respuesta_usuario = input("Tu respuesta: ")
        
        # Validar que la respuesta tiene al menos 3 palabras
        while len(respuesta_usuario.split()) < 3:
            print("Por favor, responde con al menos 3 palabras para poder analizar correctamente como te sientes.")
            respuesta_usuario = input("Tu respuesta: ")

        respuestas_categoria.append(respuesta_usuario)
        print(f"{respuesta_usuario}")

    return tuple(respuestas_categoria)

print("\n¡Hola! Soy STAC. Tengamos una pequeña conversación para comprobar cómo te sientes.")
while True:
    inicio = input("Para empezar con las preguntas, escribe 'empezar': ")
    if inicio.lower() == "empezar":
        break
    else:
        print("¡Vamos! Inténtalo de nuevo escribiendo 'empezar'. ¡Estoy emocionado de conocerte!")

# Lista para almacenar respuestas del usuario
respuestas_materias = hacer_preguntas("Preguntas sobre materias", pregunta_materia_clave, preguntas_materias)
respuestas_companeros = hacer_preguntas("Preguntas sobre compañeros", pregunta_companeros_clave, preguntas_companeros)
respuestas_profesores = hacer_preguntas("Preguntas sobre profesores", preguntas_profesores_clave, preguntas_profesores)
respuestas_centro = hacer_preguntas("Preguntas sobre el centro educativo", preguntas_profesores_clave, preguntas_profesores)
respuestas_estudios = hacer_preguntas("Preguntas sobre tus estudios", preguntas_estudios_clave, preguntas_centro)
respuestas_trabajos = hacer_preguntas("Preguntas sobre trabajos", preguntas_trabajos_clave, estudios_generales)
respuestas_personales = hacer_preguntas("Preguntas personales", preguntas_personales_clave, preguntas_personales)
respuestas_examenes = hacer_preguntas("Preguntas sobre examenes", preguntas_examenes_clave, preguntas_examenes)


print("Gracias por participar!!! A continuación tendrás los resultados de las respuestas")
print("Mi trabajo aquí ha terminado, hasta la próxima...🖐️🖐️")


categorias = ["respuestas_materias","respuestas_companeros","respuestas_profesores","respuestas_centro","respuestas_estudios","respuestas_trabajos","respuestas_personales","respuestas_examenes"]
var_categorias = [respuestas_materias,respuestas_companeros,respuestas_profesores,respuestas_centro,respuestas_estudios,respuestas_trabajos,respuestas_personales,respuestas_examenes]
zipper = zip(categorias,var_categorias)
dict_puntuaciones_respuestas = {}
dict_resultados_analisis = {}

for categoria,variable in zipper:
    #creo la estructura
    dict_puntuaciones_respuestas[categoria]=[]
    dict_resultados_analisis[categoria]=[]
    suma=0

    #analisis de las respuestas
    for i, respuesta in enumerate(variable, start=1):
        
        puntuacion=modelo.predict([respuesta])[0]
        
        texto_en=respuesta
        puntuacion_respuesta= round(puntuacion, 2)
        dict_resultados_analisis[categoria].append((i, texto_en, puntuacion_respuesta))
    
    for x,punct in enumerate(dict_resultados_analisis[categoria]):
        suma += punct[2]
    dict_resultados_analisis[categoria].append(["resultados_analisis",suma/len(variable) ])
    
    print(categoria,dict_resultados_analisis[categoria])
'''
@csrf_exempt
def chatbot_view(request):
    if request.path == '/api/chatbot/preguntas':
        response_data = {"preguntas": [preguntas_materias, preguntas_companeros, preguntas_profesores, preguntas_centro, estudios_generales, preguntas_personales, preguntas_examenes] }
        return JsonResponse(response_data)
    else:
        response_data = {"message": "Hola" + request.method }
        return JsonResponse(response_data)
    

# Instalar antes de ejecutar el servidor
#    
# pip install django
# pip install djangorestframework
# pip install django-cors-headers
    
# Arrancar el Servidor: python manage.py runserver
# Este comando lo debes ejecutar en el terminal del directorio Django antes de arrancar la web en angular
