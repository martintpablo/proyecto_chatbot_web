# PROYECTO 1: Estado anímico

El proyecto consiste en el desarrollo de un chatbot que interacciona con
el alumnado de un centro educativo, para que le haga diversas preguntas
sobre su situación académica y su satisfacción con los diferentes
elementos que intervienen (materias, compañeros, profesores, centro
educativo, exámenes, trabajos, etc.). Dicha información se almacena y se
le realiza analítica de sentimientos. De este modo, se visualiza un
panel con los sentimientos del alumno/a en base a diferentes parámetros.

Vídeo del chat funcionando: [Vídeo chat](https://drive.google.com/file/d/1FTmqUv7R_6M4AhY6v683M3p7PoPy-jlM/view?usp=sharing)

## Paso 1: Creación de un Chat

Este código Python se centra en analizar las respuestas emocionales de
los usuarios en diversas categorías. Utiliza preguntas clave
relacionadas con temas académicos, relaciones interpersonales y
crecimiento personal para evaluar las respuestas de los usuarios.
Principales componentes:

**1.  Preguntas clave y adicionales**

El código define una serie de preguntas clave en diferentes áreas, como
materias, compañeros, profesores, centro educativo, estudios generales,
trabajos, personales y exámenes. Estas preguntas son fundamentales para
evaluar las respuestas emocionales de los usuarios. Además, se incluye
un archivo de preguntas adicionales para cada tema, de las cuales se
seleccionan aleatoriamente dos junto con la pregunta clave.

**2.  Entrada de Respuestas**

El usuario proporciona respuestas a las preguntas clave y adicionales.
El código valida que cada respuesta tenga al menos tres palabras para
garantizar un análisis preciso.

**3.  Almacenamiento de Respuestas**

Las respuestas del usuario se almacenan en variables para su posterior
procesamiento. Esto permite enviarlas al análisis de sentimiento y
evaluar cómo se siente el usuario en cada categoría.

``` python
import nltk
from nltk.chat.util import Chat, reflections
import random
from preguntas import preguntas_materias, preguntas_companeros, preguntas_profesores, preguntas_centro, estudios_generales, preguntas_personales, preguntas_examenes
from analizador import get_sentiment_score 



# Descargar el conjunto de datos de entrenamiento de chat de NLTK
nltk.download('nltk_data')


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

```


## Paso 2: Extracción

### APIs

Todo el proceso de ETL se ha realizado en AWS para la obtención de datos
tanto para web como para extracción de datos.

Además, también usamos la API para la creación y gestión de usuarios.

<img src="/IMG/image-20240302-160302.png"/>

Estructura de la API

Enlace: https://4apyvj5zx4.execute-api.us-east-1.amazonaws.com/prod/

Metodos:

-   /:
    -   GET:{queryStrings:\[date,justOne:{True,False,All},name\]}
    -   PUT:{queryStrings:\[results:{True,False}\],body:{\"usuario\":
        \"\...\", \"preguntas\": \[\"\...\", \"\...\"\], \"respuesta\":
        \[\"\...\", \"\...\"\], \"fecha\": \"d-mm-aaaa\"}}

-/logins: -PUT:{body(obligatorio):{\"email\":
\"\...\",\"password\":\"\...\",\"rol\":
{student,teacher,Login},\"createUser\":{\"True\",\"False\"}},body(completo):{\"email\":
\"\...\",\"classes\":\[\"\...\",\"\...\"\],\"password\":\"\...\",\"rol\":
{student,teacher,Login},\"name\":\"\...\",\"sex\":{\"M\",\"F\"}}

### Estructura de carpetas

Visualización de la estructura de carpetas en AWS

<img src="/IMG/image-20240302-160107.png"/>


### Lambda de extracción y carga

Lambda utilizado para la extracción y la carga

``` python
import json
import boto3
import os

def lambda_handler(event, context):
    s3 = boto3.client('s3', aws_access_key_id = os.getenv("AWS_ACCESS_KEY_ID"), 
    aws_secret_access_key= os.getenv("AWS_SECRET_ACCESS_KEY"),
    aws_session_token=os.getenv("AWS_SESSION_TOKEN"))
    bucket = "stac-backend"

    #get the content from event, put it in a json file and upload it to an s3 bucket

    content = event["body"]
    queryStringParameters = event["queryStringParameters"]
    data = json.loads(content)
    rute = f"Entradas/{data.get("usuario").replace(" ","")}/{data.get("fecha")}.json"

    try:
        if queryStringParameters["results"] == "True":
            try:
                existing_json = s3.get_object(Bucket=bucket,Key=rute)["Body"].read().decode("utf-8")
                #user exists
                existing_data = json.loads(existing_json)
                existing_data["preguntas"] += data['preguntas']
                existing_data["respuesta"] += data['respuesta']
                existing_data["puntuaciones"] += data['puntuaciones']
                content = json.dumps(existing_data, ensure_ascii=False)
                rute_res = f"Resultados/{data.get("usuario").replace(" ","")}/{data.get("fecha")}.json"
                s3.put_object(Bucket=bucket,Key=rute_res, Body=content)
                return {
                'statusCode': 200,
                'headers': {
                'Access-Control-Allow-Origin': '*'
                },
                # 'body': {"File updated": "True"}
                'body': json.dumps(event)
                }
            except:
                rute_res = f"Resultados/{data.get("usuario").replace(" ","")}/{data.get("fecha")}.json"
                s3.put_object(Bucket=bucket,Key=rute_res, Body=content)
                return {
                'statusCode': 200,
                'headers': {
                'Access-Control-Allow-Origin': '*'
                },
                # 'body': {"File updated": "True"}
                'body': json.dumps(event)
                }
                
        else:
            existing_json = s3.get_object(Bucket=bucket,Key=rute)["Body"].read().decode("utf-8")
            #user exists
            existing_data = json.loads(existing_json)
            existing_data["preguntas"] += data['preguntas']
            existing_data["respuesta"] += data['respuesta']
            content = json.dumps(existing_data, ensure_ascii=False)
            s3.put_object(Bucket=bucket,Key=rute, Body=content)
    
            return {
            'statusCode': 200,
            'headers': {
            'Access-Control-Allow-Origin': '*'
            },
            # 'body': {"File updated": "True"}
            'body': json.dumps(event)
            }

    except Exception as e:
        s3.put_object(Bucket=bucket,Key=rute, Body=content)
        return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
            },
        # 'body': {"File uploaded": "True"}
        'body': json.dumps(event)
        }
```

## Paso 3: Transformación

En el paso de transformación hemos decidido utilizar Glue debido a los
beneficios que nos aporta al trabajar con una estructura AWS. Es muy
parecido a los contenidos que hemos aprendido a lo largo del cursoy
gracias a él hemos aprendido a utilizar Spark. Creemos además que es una
mejor opción que Pentaho y Nifi.

### Lambda para llamar al Glue

``` python
import json
import boto3
import os

s3 = boto3.client("s3", aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    aws_session_token=os.getenv("AWS_SESSION_TOKEN"))

def lambda_handler(event, context):
    # Configura el cliente de S3
    glue = boto3.client(service_name='glue')
    
    ##
    rute = f"Lambda/lambda.json"
    s3.put_object(Bucket="stac-backend", Key=rute, Body=json.dumps(event))
    
    content = event["Records"][0]["s3"]["object"]["key"]

    try:
        response = glue.start_job_run(
             JobName = 'super-mega-etl',
             Arguments = {
                '--aws_access_key_id': os.getenv("AWS_ACCESS_KEY_ID"),
                '--aws_secret_access_key': os.getenv("AWS_SECRET_ACCESS_KEY"),
                '--aws_session_token': os.getenv("AWS_SESSION_TOKEN"),
                '--rute': content,
             })

        return {
            'statusCode': 200,
            'body': json.dumps(f"Started Glue job run for file_name_b: {response}")
        }

    except Exception as e:
        return {
            'statusCode': 41,
            'body': json.dumps(e)
        }
```
### Glue

Enlace a un cuaderno de Google Colab con el código utilizado:

https://colab.research.google.com/drive/1gYGex2oaTVQQgB6NJITwSPxrLZ5nIJv4?usp=sharing

## Paso 4: Carga

Para la carga hemos utilizado el mismo cuaderno Glue (fragmento de
código mostrado en el siguiente bloque) y el Lambda mostrado en el paso
de tratado.

### Glue

``` python
datos = {"usuario": "", "preguntas": [], "respuesta": [], "fecha": ""}

for x in df_limpio:
    datos["usuario"] = x[0]
    datos["preguntas"] = x[1]
    datos["respuesta"] = x[2]
    datos["fecha"] = x[3]
    
    rute = f"Tratado/{datos['usuario'].replace(' ','')}/{datos['fecha']}.json"

    try:
        existing_json = s3.get_object(Bucket=bucket,Key=rute)["Body"].read().decode("utf-8")
        #user exists
        existing_data = json.loads(existing_json)
        existing_data["preguntas"] += datos['preguntas']
        existing_data["respuesta"] += datos['respuesta']
        content = json.dumps(existing_data, ensure_ascii=False)
        s3.put_object(Bucket=bucket,Key=rute, Body=content)

    except Exception as e:
        data = json.dumps(datos, ensure_ascii=False)
        s3.put_object(Bucket=bucket,Key=rute, Body=data)
        
    rute = f"Entradas/{datos['usuario'].replace(' ','')}/{datos['fecha']}.json"
    s3.delete_object(Bucket=bucket, Key=rute)
```

Destacar que al hacer la transformación eliminamos el archivo de la
carpeta Entradas para optimizar el gasto de nuestra estructura AWS.

## Extra ETL

### Lambda out-stac-control

Lambda para enviar los datos de AWS al modelo y recibir las puntuaciones
de cada respuesta.

Este Lambda también se encarga de enviar la información a la aplicación
final.

``` python
import json
import boto3
import os


def dynamoParser(response: dict):
    res = []
    items = response.get("Items")
    keys = ['password', 'sex', 'email', 'rol', 'name']
    for item in items:  # item is a python dict
        hold = {}
        for key in keys:
            hold[key] = item.get(key).get("S")

        # we extract classes appart
        c = []
        for x in item.get("classes").get("L"):
            c.append(x.get("S"))
        hold["classes"] = c

        res.append(hold)

    return res


def lambda_handler(event, context):
    s3 = boto3.client("s3", aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
                      aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
                      aws_session_token=os.getenv("AWS_SESSION_TOKEN"))
    bucket_name = "stac-backend"
    content = event["queryStringParameters"]

    s3_r = boto3.resource('s3', aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
                          aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
                          aws_session_token=os.getenv("AWS_SESSION_TOKEN"))
    bucket = s3_r.Bucket(name='stac-backend')

    dynamo = boto3.client("dynamodb", aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
                          aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
                          aws_session_token=os.getenv("AWS_SESSION_TOKEN"))

    if content["results"] == "True":
        if content["justOne"] == "True":
            try:
                rute = f"Resultados/{content['name'].replace(' ', '')}/{content['date']}.json"
                existing_json = s3.get_object(Bucket=bucket_name, Key=rute)["Body"].read().decode("utf-8")
                existing_data = json.loads(existing_json)

                return {
                    'statusCode': 200,
                    'headers': {
                    'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(existing_data)
                }


            except Exception as e:
                return {
                    'statusCode': 420,
                    'headers': {
                    'Access-Control-Allow-Origin': '*'
                    },
                    'body': {"error": str(e)}
                }

        else:
            try:
                res = []
                rute = f"Resultados/{content['name'].replace(' ', '')}/"
                for object_summary in bucket.objects.filter(Prefix=rute):
                    res.append(json.loads(object_summary.get()["Body"].read().decode("utf-8")))

                response = {"response": res}
                return {
                    'statusCode': 200,
                    'headers': {
                    'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(response)
                }
            except Exception as e:
                return {
                    'statusCode': 469,
                    'headers': {
                    'Access-Control-Allow-Origin': '*'
                    },
                    'body': {"error": str(e)}
                    # 'body': json.dumps(event)
                }
    else:
        if content["justOne"] == "True":
            try:
                rute = f"Tratado/{content['name'].replace(' ', '')}/{content['date']}.json"
                existing_json = s3.get_object(Bucket=bucket_name, Key=rute)["Body"].read().decode("utf-8")
                existing_data = json.loads(existing_json)

                return {
                    'statusCode': 200,
                    'headers': {
                    'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(existing_data)
                }


            except Exception as e:
                return {
                    'statusCode': 420,
                    'headers': {
                    'Access-Control-Allow-Origin': '*'
                    },
                    'body': {"error": str(e)}
                }

        elif content["justOne"] == "False":
            try:
                res = []
                rute = f"Tratado/{content['name'].replace(' ', '')}/"
                for object_summary in bucket.objects.filter(Prefix=rute):
                    res.append(json.loads(object_summary.get()["Body"].read().decode("utf-8")))

                response = {"response": res}
                return {
                    'statusCode': 200,
                    'headers': {
                    'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(response)
                }
            except Exception as e:
                return {
                    'statusCode': 469,
                    'headers': {
                    'Access-Control-Allow-Origin': '*'
                    },
                    'body': {"error": str(e)}
                    # 'body': json.dumps(event)
                }

        elif content["justOne"] == "All":
            try:
                res = dynamoParser(dynamo.scan(TableName="STAC"))
                response = {"response": res}
                return {
                    'statusCode': 200,
                    'headers': {
                    'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(response)
                }
            except Exception as e:
                return {
                    'statusCode': 469,
                    'headers': {
                    'Access-Control-Allow-Origin': '*'
                    },
                    'body': {"error": str(e)}
                    # 'body': json.dumps(event)
                }
```


### DynamoDB

Utilizamos DynamoDB como base de datos para guardar la información
referente a los usuarios.

<img src="IMG/image-20240302-163644.png"/>

Este lambda es el que se encarga de crear los usuarios y de gestionar
los inicios de sesión.

``` python
import json
import boto3
import os


def dynamoParser(response:dict):
    res = []
    items = response.get("Items")
    keys = ['password', 'sex', 'email', 'rol', 'name']
    for item in items: # item is a python dict
        hold = {}
        for key in keys:
            hold[key] = item.get(key).get("S")
            
        # we extract classes appart
        c = []
        for x in item.get("classes").get("L"):
            c.append(x.get("S"))
        hold["classes"] = c
        
        res.append(hold)
    
    return res



def lambda_handler(event, context):
    dynamo = boto3.client('dynamodb', 
    aws_access_key_id = os.getenv("AWS_ACCESS_KEY_ID"), 
    aws_secret_access_key= os.getenv("AWS_SECRET_ACCESS_KEY"),
    aws_session_token=os.getenv("AWS_SESSION_TOKEN"))
    

    content = event["body"]
    
    data = json.loads(content) #Json de la peticion
    
    try:
        
        only_correo = dynamo.scan(TableName="STAC",
        ExpressionAttributeValues={
            ":email":{
                "S":f"{data.get('email')}"
            }
        },
        FilterExpression="email=:email")
        

        if only_correo['Count'] > 0:
            d = dynamoParser(only_correo)
            if d[0]["password"]==data.get("password"):
                if data.get("createUser") == "True":
                    return {
                    'statusCode': 420,
                    'headers': {
                    'Access-Control-Allow-Origin': '*'
                    },
                    'body': {"Usuario ya existe"}
                    }
                else:
                    return {
                    'statusCode': 200,
                    # 'body': "Login Correcto"
                    'headers': {
                    'Access-Control-Allow-Origin': '*'
                    },
                    'body' : json.dumps({'message':"Login Correcto",'user':d[0]})
                    }
            else:
                return {
                'statusCode': 469,
                'headers': {
                'Access-Control-Allow-Origin': '*'
                },
                'body': {"Credenciales incorrectas"}
                }
        
        elif data.get("createUser") == "True":
            
            if data.get("rol") == "teacher":
                classes = []
                for clas in data.get("classes"):
                    classes.append({"S":clas})
                user = {
                "email":{
                    "S":data.get("email")
                },
                "password":{
                    "S":data.get("password")
                },
                "name":{
                    "S":data.get("name")
                },
                "rol":{
                    "S":data.get("rol")
                },
                "sex":{
                    "S":data.get("sex")
                },
                "classes":{
                    "L":classes
                },
                "birthdate":{
                    "S":data.get("birthdate")
                }
            }
                dynamo.put_item(TableName="STAC",Item=user)
                return {
                'statusCode': 200,
                'headers': {
                'Access-Control-Allow-Origin': '*'
                },
                'body': {"El que enseña creado correctamente"}
                }
            
            elif data.get("rol") == "student":
                classes = []
                for clas in data.get("classes"):
                    classes.append({"S":clas})
                user = {
                "email":{
                    "S":data.get("email")
                },
                "password":{
                    "S":data.get("password")
                },
                "name":{
                    "S":data.get("name")
                },
                "rol":{
                    "S":data.get("rol")
                },
                "sex":{
                    "S":data.get("sex")
                },
                "classes":{
                    "L":classes
                },
                "birthdate":{
                    "S":data.get("birthdate")
                }
            }
                dynamo.put_item(TableName="STAC",Item=user)
                return {
                'statusCode': 200,
                'headers': {
                'Access-Control-Allow-Origin': '*'
                },
                'body': {"Alumno creado"}
                }
            
            
        else:
            return {
            'statusCode': 469,
            'headers': {
            'Access-Control-Allow-Origin': '*'
            },
            'body': {"Credenciales incorrectas"}
            }

    
    except Exception as e:
        return {
        'statusCode': 469,
        'headers': {
            'Access-Control-Allow-Origin': '*'
            },
        'body': e
        }
```

## Paso 5: Modelo de IA

El modelo de sentimientos, ha sido necesario crear un dataset hecho a
mano analizando las frases con la libreria nltk y despues se entrena el
modelo a traves del dataset previamente creado.

## 5.1 Crear un buscador de sinonimos.

Aquí se esta buscando sinonimos de palabras para despues penalizarlas o
puntuarlas mejor.

``` python
sinonimos_conjunto = []
sinonimos_lista = []
def obtener_sinonimos(palabra):
    global sinonimos_conjunto

    url = 'http://www.wordreference.com/sinonimos/'
    enlace = f"{url}{palabra}"

    resp = requests.get(enlace)
    bs = BeautifulSoup(resp.text, 'html.parser')

    # Busca la sección de sinónimos y antónimos
    seccion_sinonimos_antonimos = bs.find('div', id='otherDicts').find('div', class_='trans esp clickable')

    # Verifica si se encontró la sección de sinónimos y antónimos
    if seccion_sinonimos_antonimos:
        # Extrae y agrega los sinónimos a la lista
        for elemento in seccion_sinonimos_antonimos.find_all(['li', 'div']):
            texto = elemento.get_text(strip=True)
            if texto.startswith('Antónimos:'):
                break  # Termina si encontramos la sección de antónimos
            sinonimos_conjunto.extend(texto.split(', '))

        # Imprime los sinónimos para la palabra actual
        sinonimos_conjunto += sinonimos_lista
        print(f"Sinónimos de '{palabra}': {sinonimos_conjunto}")

    else:
        print(f"No se encontraron sinónimos para la palabra '{palabra}'.")

# Lista de palabras para buscar sinónimos
palabras_a_buscar = ["triste", "morir","perdido","ansiedad"]

# Itera sobre la lista y obtén sinónimos para cada palabra
for palabra in palabras_a_buscar:
    obtener_sinonimos(palabra)

# Convierte la lista a un string antes de imprimir
print("Conjuntas: " + str(sinonimos_conjunto))
```

## 5.2 Función que para puntualizar las frases. 

En este codigo se esta haciendo una puntuacion a una frase comprobando
si tiene palabras negativas para puntualizarla peor o si tiene palabras
positivas para puntualizarlas mas.

``` python
def get_sentiment_score(text):
    translator = Translator(to_lang='en', from_lang='es')
    translation = translator.translate(text)
    text_en = translation

    sia = SentimentIntensityAnalyzer()

    # Obtener la polaridad del análisis de sentimientos
    sentiment_polarity = sia.polarity_scores(text_en)['compound']

    # Ajustar manualmente el valor para considerar palabras positivas
    positive_words = ["si", "sí", "afirmativo", "claro"]  # Puedes ampliar esta lista según tus necesidades
    negative_words = sinonimos_conjunto  # Asegúrate de definir este conjunto

    # Factor de ajuste adicional para palabras positivas
    positive_factor = 0.0

    # Factor de ajuste adicional para palabras negativas
    negative_factor = 0.0

    # Sumar positive_factor solo si alguna palabra positiva está presente
    if any(word in text.lower() for word in positive_words):
        positive_factor += abs(sentiment_polarity) * 0.1  # Puedes ajustar este valor según tus necesidades

    # Sumar negative_factor solo si alguna palabra negativa está presente
    if any(word in text.lower() for word in negative_words):
        negative_factor += abs(sentiment_polarity) * 0.1  # Puedes ajustar este valor según tus necesidades

    # Calcular el puntaje final del sentimiento
    sentiment_score = max(0, (sentiment_polarity + 1) * 2.5 + positive_factor - negative_factor)

    return text_en, sentiment_score
```

## 5.3 Comprobacion individual

``` python
texto = "esto harto de proyectos quiero acabar con mi vida "

# Dividir el texto en palabras
palabras = texto.split()

lista_de_palabras=["super","bastante"]
contiene_palabra_delante=False

indice_cantidad=0
indice_negativo=0
# Iterar sobre las palabras
for indice,palabra in enumerate(palabras):
    for palabra1 in lista_de_palabras:
      if palabra1==palabra:
        indice_cantidad=indice

    resultado,score = get_sentiment_score(palabra)
    if score < 2.5:
      indice_negativo=indice

    if indice_cantidad == (indice_negativo-1):
      contiene_palabra_delante=True

respuesta,score = get_sentiment_score(texto)
if contiene_palabra_delante == True:
  score=score/2
print(f"El sentimiento de es: ",score)
```

Como podemos ver esta dandole una puntuación adecuada a la frase.

## 5.4 Funcion para pasarle un array de frases y que las puntualice.

``` python
def funcion(texto):
  # Dividir el texto en palabras
  palabras = texto.split()

  lista_de_palabras=["super","bastante"]
  contiene_palabra_delante=False

  indice_cantidad=0
  indice_negativo=0
  # Iterar sobre las palabras
  for indice,palabra in enumerate(palabras):
      for palabra1 in lista_de_palabras:
        if palabra1==palabra:
          indice_cantidad=indice

      resultado,score = get_sentiment_score(palabra)
      if score < 2.5:
        indice_negativo=indice

      if indice_cantidad == (indice_negativo-1):
        contiene_palabra_delante=True

  respuesta,score = get_sentiment_score(texto)
  if contiene_palabra_delante == True:
    score=score/2

  return score
```

## 5.5 Arreglando las frases antes de puntualizarlas.

Aqui estamos eliminadon valores y caracteres que no son necesarios, como
los iconos, eliminar los @ y el texto asociado, eliminar \# y su texto,
eliminar urls y convertir todo a minusculas.

``` python
def limpiar_texto(texto):
    # Convertir el texto a minúsculas
    texto_minusculas = texto.lower()

    # Eliminar los patrones de arroba seguido de texto hasta el espacio
    texto_sin_arrobas = re.sub(r'@\S+', '', texto_minusculas)

    # Eliminar las URLs
    texto_sin_urls = re.sub(r'http[s]?://\S+', '', texto_sin_arrobas)

    # Eliminar los emoticonos
    texto_sin_emoticonos = re.sub(r'[\U0001F600-\U0001F64F\U0001F300-\U0001F5FF\U0001F680-\U0001F6FF\U0001F700-\U0001F77F\U0001F780-\U0001F7FF\U0001F800-\U0001F8FF\U0001F900-\U0001F9FF\U0001FA00-\U0001FA6F\U0001FA70-\U0001FAFF\U00002702-\U000027B0\U000024C2-\U0001F251]+', '', texto_sin_urls)

    # Eliminar los hashtags y lo que sigue hasta el espacio
    texto_sin_hashtags = re.sub(r'#\S+\s', '', texto_sin_emoticonos)

    return texto_sin_hashtags


# Las frases proporcionadas
textos = [
    "Un chico bohemio para fumar, leer, follar y hablar",
    "Ya me acostumbré a despertarme y no tener ni un mensaje en WhatsApp",
    "Si no apoyamos a los nuestros no estamos en nada, en pocos minutos #ElRingdelaspalabras en #Larfm https://t.co/2ucJSiVFit",
    "Engomado con la lectura erótica.",
    "Una gran pérdida para la música, para el arte. https://t.co/atCh1xyS05",
    "@Ritsuka4 Igual tú para mí 🤗",
    "Borracho.",
    "@JeffCaicedo 😍",
    "¿Eres feliz?",
    "Yo escribo aquí como para dejar algunas cosas que pienso en el momento porque me leen como 3 personas, los amo igual. 😍",
    "Con el tiempo entendí que a los que llamé amigos o mejores amigos solo lo fueron de una época de mi vida, están en un lugar especial pero ya no somos las mismas personas que éramos antes.",
    "Ay querido si siempre vas a abrir la boca para destilar veneno ahógate tú solo en tus palabras.... Yo me voy, ahí te quedas jaja",
    "Me gusta estar al lado del camino fumando el humo mientras todo pasa",
    "Muero por un beso de esos que no son de amigos",
    "@MariaCamila_C Jajaja bebé eso termina en el suelo, las arruncho mientras me duermo pero ya luego me fastidian",
    "Soy de amores simples, de tragos corrientes en la calle sin apariencias y abriendo los sentimientos hablando de lo que realmente vale sin aparentar cuánto pagamos por lo que nos tomamos.",
    "Vengo a confesarles que me hace mucha falta la mariconería, bailar así muy entregado en el antro con las amigas maricas 🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈",
    "@MariaCamila_C Tengo 4 pero dejo solo unita",
    "Si usa gel déjalo ir 😂",
    "Querer superar la depre pero no dejar de poner temas sad. Así es",
    "Sueño con el día que pueda ver sin necesidad de ponerme las gafas.",
    "Ignorar ignorar ignorar.",
    "Amanecí fastidiado de lo que esperan siempre que sea y haga.",
    "Tengo un toque Midas para las relaciones, cualquiera que medio se acerca a un intento de algo conmigo fijo fijo consigue su relación soñada después de mí.",
    "Es difícil no sentirse frustrado viviendo en un país en el que las oportunidades son tan escasas, aún así de verdad espero esta vez conseguir algo de trabajo. Ojalá ustedes tengan uno bueno 💪"
]

textos_procesados = [limpiar_texto(texto) for texto in textos]
array=[]
textos_procesados = []

for texto in textos:
    texto_procesado = limpiar_texto(texto)
    textos_procesados.append(texto_procesado)

print("textos =", textos_procesados)
```

## 5.6 Puntualizando frases para añadirlo al dataset.

``` python
textos = ['esta soy yo al ver que las directioners piden ayuda a otros fandoms y la pagina no cuenta todo lo que ya llevamos que creo que arrevazamos a 1d pero la pagina ni verga  ', 'púdrete maldita sensación de angustia y desespero por no tener nada estable, déjame descansar de tu compañía pinche perra.']

for resultado in textos:
  score=funcion(resultado)
  formatted_score = "{:.2f}".format(score)
  print(resultado," ,puntuacion: ", formatted_score)
```

## 5.7 Preparacion de los modelos y entrenamiento.

Una vez creado el dataset probamos como funcionan mejor los modelos si
dejando las stopword o quitandolas.

``` python
# Con las estopwords
df['texto'] = df['texto'].apply(lambda x: ' '.join([word.lower() for word in x.split() if word.isalpha()]))
```

``` python
# Sin las stopwords
stop_words = set(stopwords.words('spanish'))
df['texto'] = df['texto'].apply(lambda x: ' '.join([word.lower() for word in x.split() if word.isalpha() and word.lower() not in stop_words]))
```

## 5.8 Separamos los valores para el entrenamiento.

``` python
# División de datos en conjuntos de entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(df['texto'], df['puntuacion'], test_size=0.2, random_state=42)
```

## 5.9 Modelo de regresión lineal.

``` python
# Crear un modelo de regresión lineal con un pipeline que incluye un vectorizador de texto
model = make_pipeline(CountVectorizer(), LinearRegression())

# Entrenar el modelo
model.fit(X_train, y_train)

# Realizar predicciones en el conjunto de prueba
predictions = model.predict(X_test)

# Evaluar el rendimiento del modelo (opcional)
mse = mean_squared_error(y_test, predictions)
print(f'Mean Squared Error: {mse}')

# Calcular el rango de los datos
rango_datos = np.ptp(y_train)

# Calcular el Mean Squared Error (MSE)
mse = mean_squared_error(y_test, predictions)

# Calcular el porcentaje de precisión
precision = 1 - mse / (rango_datos ** 2)

print(f'Porcentaje de precisión: {precision * 100:.2f}%')
```

Mean Squared Error: 1.7861577832948043 Porcentaje de precisión: 92.34%

Con este modelo hemos tenido un 92.34% de acierto.

## Paso 6: Visualización

### 6.1 Web

Para la creación web hemos utilizado el Framework de Javascript llamado
Angular, el cual nos ha permitido no sólo crear la estructura más
organizada sino realizar un diseño más estético.

Para la organización de las diferentes partes de la aplicación se han
utilizado componentes, es decir, carpetas en las que se encuentran un
apartado en Typescript, otro apartado en HTML y su correspondiente CSS.
A la hora de la visualización cada componente mostrará la parte HTML,
estos siendo llamados, o más bien cargados gracias al fichero de
app-routing donde cada componente es inicializado y se le asigna una
variable. También se puede llamar al componente mediante la etiqueta
`<app-nombre_del_componente>`

Bootstrap ha sido sin duda un elemento a tener en cuenta a la hora del
diseño de la aplicación, ya que ha permitido añadir clases y organizar
componentes con solo unas líneas en el html.

### Página HOME

En la página de home el formulario de inicio de sesión es el componente
principal. Los usuarios pueden iniciar sesión en la plataforma
introduciendo su correo electrónico y contraseña. También hay una opción
para registrarse si el usuario no tiene una cuenta. Características:

-   Apoyo personalizado: STAC ofrece un apoyo personalizado a cada
    estudiante.
-   Análisis de sentimientos: puede analizar los sentimientos de los
    estudiantes para proporcionar un apoyo más efectivo.
-   Comunidad solidaria: promueve una comunidad solidaria entre los
    estudiantes.


Aquí tenemos el componente \"home\" que a su vez llama al componente
\"login-component\" y éste a \"role-register\"

<img src="IMG/image-20240301-230504.png"/>

### Selección de roles

Cuando el usuario hace click en \"registrarse\", se le presentará una
ventana emergente en la cuál tendra que seleccionar el rol que tendrá
dentro de la web.

Exiten dos roles:

-   Estudiante: Los estudiantes interactuarán con el chatbot y formarán
    parte de un curso con un profesor al frente.
-   Profesor: Los profesores estarán al frente de una clase y tendrán un
    seguimiento de las emociones y el ánimo de los alumnos.

Gracias al componente \"redirect\" si el alumno o el profesor intentase
poner en la barra de dirección una sección del otro rol, o de otro
usuario, o incluso una dirección no válida, la página le redigirá al
inicio

<img src="/IMG/image-20240301-231045.png"/>

### Registro

La página de registro permite a los usuarios crear una cuenta
introduciendo su nombre, apellidos, género, correo electrónico, curso,
fecha de nacimiento y contraseña. Una vez completado, pueden hacer clic
en "Registrarse" para finalizar el proceso.

En este componente (\"register.component\"), los datos introducidos por
el usuario en el html serán recogidos en type-script y enviados en la
función \"register()\" que llamará al servicio User service para que
haga una petición PUT con la funcion del servicio también llamada
register().

<img src="IMG/image-20240301-230611.png"/>

### ChatBot

El alumno, una vez haya creado su cuenta, tendrá acceso al chatbot, el
cual le hará preguntas relacionadas con el curso. El alumno deberá
responder con un mínimo de 2 palabras. Una vez respondidas todas las
preguntas, estas se analizarán y se mostrarán en el apartado de
estadísticas.

En el chat encontramos numerosas funcionalidades a comentar. La primera
es la barra lateral izquierda, donde aparece el icono del usuario donde
si se pincha podrá acceder a su perfil y el icono de debajo es un enlace
a las estadísticas de los sentimientos del usuario con el rol de alumno.

En el apartado del chat se ve nada más empezar la fecha actual del día
en el que se inicia la conversación con el bot mediante la variable en
TS llamada fechaDeHoy en el que saca la fecha en el fichero mediante
\"new Date()\". Y lo importante, la conversación, que se carga llamando
al servicio del chat que hace una petición a S3 y carga todos los
mensajes en el chat. Para ordenarlos se hacen con un ngIf de manera que
si el que es el bot el que habla primero, que en este caso lo es
siempre, pues aparecerá su mensaje a la izquierda , sin embargo, si
procede del usuario el mensaje aparecerá a la derecha. Para el tema de
enviar mensajes, el usuario escribe un texto en el input y al enviarlo,
pasa por diferentes funciones en chat.component.ts en las que
transforman el texto para enviarlo al S3(mediante otro servicio) y al
bot, donde este le devuelve una respuesta.

<img src="/IMG/image-20240301-230357.png"/>

Al pinchar en el icono del usuario, se muestra una card de Boostrap con
la información del usuario.

<img src="/IMG/image-20240301-231658.png"/>

En el apartado de estadísticas alumno, se mostrarán graficas con la
información recaudada y extraida de AWS, y un pequeño mensaje de
motivación en base a la puntuación que ha sacado el análisis.

<img src="/IMG/image-20240302-205107.png"/>

El profesor podrá gestionar los alumnos de su clase, y acceder a sus
estadísticas individuales.

<img src="/IMG/image-20240302-204942.png"/>

El profesor también cuenta con una pestaña de estadísticas de la clase,
aquí puede ver información como el número de alumno, profesores, clase y
las gráficas correspondientes. Toda esta información se extrae
directamente de AWS.

<img src="/IMG/image-20240302-205158.png"/>

### 6.1 Power BI

Para visualizar los datos generales de la aplicación y detectar patrones
interesantes para tomar decisiones acertadas en base a datos usaremos
PowerBI. Como nuestra aplicación aún no está disponible para el uso
general, usaremos datos de prueba para mostrar como se vería en caso de
un funcionamiento real de la misma. Serán mil entradas donde cada
entrada representa a una pregunta realizada por el chatbot junto con la
respuesta asociada y la puntuación que le daría el modelo. Aquí tenemos
una demostración de los datos utilizados, generados en la web
mockaroo.com:

``` python
import pandas as pd

data = pd.read_csv("STAC_Data.csv")

data.head(10)
```
| Nombre | Apellidos | Email | Rol | Clase | Género | Pregunta | Respuesta | Puntuación | Fecha |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Mandie | Kaming | mkaming0@edublogs.org | student | 1º DAM | Masculino | Managed 24/7 toolset | Muy Bien | 0.05 | 9/15/2023 |
| Shaylynn | Corcut | scorcut1@merriam-webster.com | teacher | 1º DAM | Masculino | Seamless next generation open architecture | Podría Ser Mejor | 2.4 | 4/10/2023 |
| Jermaine | Rowen | jrowen2@privacy.gov.au | student | Videojuegos | Masculino | Enterprise-wide reciprocal productivity | Bastante Mal | 4.97 | 4/9/2023 |
| Glennie | Scrane | gscrane3@parallels.com | teacher | Ciberseguridad | NS/NC | Sharable regional utilisation | Bastante Bien | 0.91 | 10/13/2023 |
| Stanislaw | Edmunds | sedmunds4@i2i.jp | student | 1º DAW | Femenino | Enhanced multimedia framework | Bastante Bien | 3.93 | 10/21/2022 |
| Lyman | Rosenblatt | lrosenblatt5@mapquest.com | student | Videojuegos | Femenino | Optimized well-modulated firmware | Muy Bien | 0.34 | 3/3/2023 |
| Kori | Fury | kfury6@goo.gl | student | Videojuegos | Femenino | Managed incremental architecture | Bastante Bien | 1.69 | 11/29/2023 |
| Crin | Farrears | cfarrears7@telegraph.co.uk | student | 2º ASIR | Femenino | Sharable discrete archive | Podría Ser Mejor | 4.18 | 2/5/2023 |
| Nelia | Gillon | ngillon8@cpanel.net | student | 2º ASIR | NS/NC | Phased discrete extranet | Bastante Mal | 2.52 | 1/3/2022 |
| Abbot | Snaden | asnaden9@adobe.com | student | 2º ASIR | Masculino | Organized responsive neural-net | Podría Ser Mejor | 1.82 | 9/21/2022 |

La forma en la que obtendríamos estos datos de nuestra base datos sería
obteniendo cada pregunta, junto con la respuesta, la puntuación, el
usuario que la ha hecho, su email, su rol, su género y la fecha en la
que esa pregunta ha sido realizada.

Una vez subamos nuestros datos a PowerBI, veremos que tendremos que
hacer una transformación de datos previa. Las transformaciones que
deberíamos realizar en un caso real serían (ya que suponemos que nuestro
público es español), cambiar los roles de \'student\' y \'teacher\' por
\'Estudiante\' y \'Profesor\' respectivamente. También, aunque los hemos
generado directamente completos y no hay necesidad de transformarlos,
habría que transformar los géneros que nos llegan codificados como M
(Hombre - Male), F (Mujer - Female), NB (No Binario) y NS/NC (No Sabe/No
Contesta). Aparte también tenemos que realizar transformaciones de datos
que no se han generado correctamente como son las preguntas y un caso
que también nos podría pasar con datos reales y es que los números están
guardados con un punto (.) para definir los decimales, pero PowerBI usa
la coma (,), por lo que estos números serán obtenidos como enteros de
hasta tres decimales. Es por eso que hemos realizado las siguientes
transformaciones de datos:

-   Reemplazo de \'student\' y \'teacher\' por Estudiante y Profesor

-   División entre 100 de los valores de las puntuaciones. Para ello
    crearemos una nueva columna en la que guardaremos esos resultados,
    usando la siguiente función:

``` python
Puntuación1 = [Puntuación] / 100
```

Borraremos la columna con los datos de las puntuaciones erróneas y le
pondremos el nombre de esta columna a los nuevos datos transformados. Le
cambiamos el tipo a float.

-   Generaremos una nueva columna con números del 1 al 8
    (correspondientes a las 8 preguntas clave de nuestra aplicación) de
    la siguiente manera:

``` python
Preguntas = Number.RandomBetween(1,8)
```

Sustituiremos cada número por una pregunta de las que tenemos. Borramos
la columna con las preguntas mal generadas y le ponemos el nombre de
esta a la columna nueva.

<img src="/IMG/Captura de pantalla 2024-03-02 014904.jpg"/>

Aquí podemos ver los datos ya transformados.

<img src="/IMG/STAC_PowerBI_Captura-20240301-232323.jpg"/>

Aquí podemos observar el informe de PowerBI que sirve para ver datos de
los mensajes y usuarios de nuestra aplicación. Explicaremos cada panel
de izquierda a derecha y de arriba a abajo:

1.  Recuento de Usuarios, Alumnos, Profesores y Clases Disponibles. Para
    mostrar estos datos crearemos 4 medidas que son las siguientes:

-   Usuarios

``` dax
Usuarios = DISTINCTCOUNT(STAC_Data[Email]) 
```

-   Alumnos

``` dax
Alumnos = CALCULATE(
    COUNTROWS(STAC_Data),
    FILTER(
        STAC_Data,
        STAC_Data[Rol] = "Estudiante"
    )
)
```

-   Profesores

``` dax
Profesores = CALCULATE(
    COUNTROWS(STAC_Data),
    FILTER(
        STAC_Data,
        STAC_Data[Rol] = "Profesor"
    )
)
```

-   Clases

``` dax
Clases = DISTINCTCOUNT(STAC_Data[Clase])
```

Estas medidas las introduciremos en una tarjeta de varias filas.

2.  Recuento de Rangos de Puntuaciones de las Respuestas Ofrecidas por
    los Usuarios. Gráfico de Barras. Mientras más bajo, más negativas
    serán las respuestas, mientras más alto, más positivo.

Para poder visualizar estos datos crearemos una nueva columna llamada
\'Sentimientos\' definida de la siguiente manera:

``` dax
Sentimientos = SWITCH (
    TRUE (),
    STAC_Data[Puntuación] >= 0 && STAC_Data[Puntuación] < 1, "0-1",
    STAC_Data[Puntuación] >= 1 && STAC_Data[Puntuación] < 2, "1-2",
    STAC_Data[Puntuación] >= 2 && STAC_Data[Puntuación] < 3, "2-3",
    STAC_Data[Puntuación] >= 3 && STAC_Data[Puntuación] < 4, "3-4",
    STAC_Data[Puntuación] >= 4 && STAC_Data[Puntuación] <= 5, "4-5"
)
```

Pondremos esta columna en el eje X y la fecha del mensaje en el eje Y

3.  Respuestas por Clase: Gráfico Circular.Podemos ver el número de
    respuestas que se ha realizado por cada clase. Esta gráfica nos será
    muy útil ya que gracias a la interactividad de PowerBI podremos ver
    fácilmente los datos por cada clase. Para la \'Leyenda\'
    introduciremos la columna \'Clase\' y para los valores la columna
    \'Respuestas\'.

4.  Recuento de Mensajes por Fecha. Gráfico de Líneas

La columna \'Fecha\' en el eje X y las columna \'Respuesta\' en el eje
Y.

5.  Sentimientos por Género. Gráfico de Columnas Agrupadas. Aquí podemos
    ver una forma mejorada del gráfico que está justo arriba teniendo en
    cuenta las puntuaciones de las respuestas por cada género.

Para poder construir este objeto visual introduciremos en el eje X la
columna \'Género\', la columna \'Puntuación\' en el eje Y y la columna
\'Sentimientos\' en la Leyenda.

6.  Pregúntale a PowerBI. En este objeto visual de preguntas y
    respuestas podremos realizar preguntas y consultas para ver en
    detalle aspectos de nuestros datos. Como ejemplo tenemos un top 10
    de clases con más alumnos.

Además tenemos en la esquina superior derecha un desplegable para ver
los datos por clase y un slider con todo el rango de fechas que existen
en nuestros datos para poder ver datos en según qué épocas.

Puedes interactuar con el informe [aquí ](https://github.com/martintpablo/proyecto_chatbot_web/blob/main/PowerBI/STAC.pbix).
