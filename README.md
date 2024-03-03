---
jupyter:
  deepnote_full_width: false
  deepnote_notebook_id: dfa05eeabf5042b4acd51e883c45df39
  deepnote_persisted_session:
    createdAt: "2024-03-02T00:02:37.409Z"
  nbformat: 4
  nbformat_minor: 0
---

::: {.cell .markdown cell_id="2ca1c8aef4604eabbd2157edd457bb70" deepnote_cell_type="text-cell-h1" formattedRanges="[]"}
# PROYECTO 1: Estado anímico
:::

::: {.cell .markdown cell_id="94ed6b2ea2e246128deb9f4bac8a4d0a" deepnote_cell_type="text-cell-p" formattedRanges="[{\"fromCodePoint\":0,\"marks\":{\"bold\":true},\"toCodePoint\":496,\"type\":\"marks\"}]"}
El proyecto consiste en el desarrollo de un chatbot que interacciona con
el alumnado de un centro educativo, para que le haga diversas preguntas
sobre su situación académica y su satisfacción con los diferentes
elementos que intervienen (materias, compañeros, profesores, centro
educativo, exámenes, trabajos, etc.). Dicha información se almacena y se
le realiza analítica de sentimientos. De este modo, se visualiza un
panel con los sentimientos del alumno/a en base a diferentes parámetros.
:::

::: {.cell .markdown cell_id="3547909af76c43d88d55b954a1b59cbe" deepnote_cell_type="text-cell-h2" formattedRanges="[]"}
## Paso 1: Creación de un Chat
:::

::: {.cell .markdown cell_id="18f2c3f0f270462e95226c5d5ddfbcae" deepnote_cell_type="text-cell-p" formattedRanges="[{\"fromCodePoint\":287,\"marks\":{\"bold\":true},\"toCodePoint\":320,\"type\":\"marks\"},{\"fromCodePoint\":740,\"marks\":{\"bold\":true},\"toCodePoint\":766,\"type\":\"marks\"},{\"fromCodePoint\":940,\"marks\":{\"bold\":true},\"toCodePoint\":972,\"type\":\"marks\"}]"}
Este código Python se centra en analizar las respuestas emocionales de
los usuarios en diversas categorías. Utiliza preguntas clave
relacionadas con temas académicos, relaciones interpersonales y
crecimiento personal para evaluar las respuestas de los usuarios.
Principales componentes:

1.  Preguntas clave y adicionales

El código define una serie de preguntas clave en diferentes áreas, como
materias, compañeros, profesores, centro educativo, estudios generales,
trabajos, personales y exámenes. Estas preguntas son fundamentales para
evaluar las respuestas emocionales de los usuarios. Además, se incluye
un archivo de preguntas adicionales para cada tema, de las cuales se
seleccionan aleatoriamente dos junto con la pregunta clave.

1.  Entrada de Respuestas

El usuario proporciona respuestas a las preguntas clave y adicionales.
El código valida que cada respuesta tenga al menos tres palabras para
garantizar un análisis preciso.

1.  Almacenamiento de Respuestas

Las respuestas del usuario se almacenan en variables para su posterior
procesamiento. Esto permite enviarlas al análisis de sentimiento y
evaluar cómo se siente el usuario en cada categoría.
:::

::: {.cell .code cell_id="c5048de8fd7846cb91d8879d98f8ba22" deepnote_cell_type="code"}
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
:::

::: {.cell .markdown cell_id="50f116c08cdb49d78014ee0213723089" deepnote_cell_type="text-cell-h2" formattedRanges="[]"}
## Paso 2: Extracción
:::

::: {.cell .markdown cell_id="85b5e3503e654e37ae1be4e877f0e25c" deepnote_cell_type="text-cell-h3" formattedRanges="[]"}
### APIs
:::

::: {.cell .markdown cell_id="392aed37548646b2862db2da5e91d961" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
Todo el proceso de ETL se ha realizado en AWS para la obtención de datos
tanto para web como para extracción de datos.

Además, también usamos la API para la creación y gestión de usuarios.
:::

::: {.cell .markdown cell_id="8baacb4a732048cb9f2e34851a26cb71" deepnote_cell_type="image" deepnote_img_src="image-20240302-160302.png"}
`<img src="image-20240302-160302.png" width="" align="" />`{=html}
:::

::: {.cell .markdown cell_id="c2951375f2b04921905081fa1119f9af" deepnote_cell_type="text-cell-p" formattedRanges="[{\"fromCodePoint\":0,\"marks\":{\"bold\":true},\"toCodePoint\":20,\"type\":\"marks\"}]"}
Estructura de la API
:::

::: {.cell .markdown cell_id="d2f4c5e39b8e4c2299fb8786028c1d92" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
Enlace: <https://4apyvj5zx4.execute-api.us-east-1.amazonaws.com/prod/>

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
:::

::: {.cell .markdown cell_id="dc923439941346b782b253f7d9c4b790" deepnote_cell_type="text-cell-h3" formattedRanges="[]"}
### Estructura de carpetas
:::

::: {.cell .markdown cell_id="826213a6bad14eb79090691bd1b93269" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
Visualización de la estructura de carpetas en AWS
:::

::: {.cell .markdown cell_id="901b4cbdedd64bd7a0f0def9d8be5550" deepnote_cell_type="image" deepnote_img_src="image-20240302-160107.png"}
`<img src="image-20240302-160107.png" width="" align="" />`{=html}
:::

::: {.cell .markdown cell_id="5469c33aec47455a9e2cfa030f8c7666" deepnote_cell_type="text-cell-h3" formattedRanges="[]"}
### Lambda de extracción y carga
:::

::: {.cell .markdown cell_id="cba08a850b764f0bb0d55a346603ec47" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
Lambda utilizado para la extracción y la carga
:::

::: {.cell .code cell_id="78254d84c87a47a1a55e7f34e08bc357" deepnote_cell_type="code"}
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
:::

::: {.cell .markdown cell_id="c664d891e2b547cca9461447e9921178" deepnote_cell_type="text-cell-h2" formattedRanges="[]"}
## Paso 3: Transformación
:::

::: {.cell .markdown cell_id="5e3459ec52f04d28ba6e07a1091d034a" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
En el paso de transformación hemos decidido utilizar Glue debido a los
beneficios que nos aporta al trabajar con una estructura AWS. Es muy
parecido a los contenidos que hemos aprendido a lo largo del cursoy
gracias a él hemos aprendido a utilizar Spark. Creemos además que es una
mejor opción que Pentaho y Nifi.
:::

::: {.cell .markdown cell_id="4fec62a67b3044b5a68dc315e2f52606" deepnote_cell_type="text-cell-h3" formattedRanges="[]"}
### Lambda para llamar al Glue
:::

::: {.cell .code cell_id="ec145efec539485fadd2ea4b2a95ba14" deepnote_cell_type="code"}
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
:::

::: {.cell .markdown cell_id="91a82854b396481d834cf125f137fa72" deepnote_cell_type="text-cell-h3" formattedRanges="[]"}
### Glue
:::

::: {.cell .markdown cell_id="827e6c00751f4f5ebc5f4c9518d72dba" deepnote_cell_type="text-cell-p" formattedRanges="[{\"fromCodePoint\":63,\"ranges\":[],\"toCodePoint\":148,\"type\":\"link\",\"url\":\"https://colab.research.google.com/drive/1gYGex2oaTVQQgB6NJITwSPxrLZ5nIJv4?usp=sharing\"}]"}
Enlace a un cuaderno de Google Colab con el código utilizado:

<https://colab.research.google.com/drive/1gYGex2oaTVQQgB6NJITwSPxrLZ5nIJv4?usp=sharing>
:::

::: {.cell .markdown cell_id="b52aa6880e904390aa4baae543a64a4f" deepnote_cell_type="text-cell-h2" formattedRanges="[]"}
## Paso 4: Carga
:::

::: {.cell .markdown cell_id="4ce4a3e3044e40e891375ca3c59302cd" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
Para la carga hemos utilizado el mismo cuaderno Glue (fragmento de
código mostrado en el siguiente bloque) y el Lambda mostrado en el paso
de tratado.
:::

::: {.cell .markdown cell_id="8b5b219ee6144d22ab6fd07eea638130" deepnote_cell_type="text-cell-h3" formattedRanges="[]"}
### Glue {#glue}
:::

::: {.cell .code cell_id="f1ad307b0cdc4818bc2946f9ad64dbaa" deepnote_cell_type="code"}
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
:::

::: {.cell .markdown cell_id="5f76fdd0ae324b1aaea1fadc761ff825" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
Destacar que al hacer la transformación eliminamos el archivo de la
carpeta Entradas para optimizar el gasto de nuestra estructura AWS.
:::

::: {.cell .markdown cell_id="cbf512c0b73d4986846ca1eb94f7110c" deepnote_cell_type="text-cell-h2" formattedRanges="[]"}
## Extra ETL
:::

::: {.cell .markdown cell_id="db789cd298fe4944b8fa0c7784027743" deepnote_cell_type="text-cell-h3" formattedRanges="[]"}
### Lambda out-stac-control
:::

::: {.cell .markdown cell_id="a1820469789f4421a4d2c393d837f326" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
Lambda para enviar los datos de AWS al modelo y recibir las puntuaciones
de cada respuesta.

Este Lambda también se encarga de enviar la información a la aplicación
final.
:::

::: {.cell .code cell_id="e719183ad63d4f0abfb0f022b9f08724" deepnote_cell_type="code"}
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
:::

::: {.cell .markdown cell_id="eb88c8ba7b7a44d0912e5509bd2b35cc" deepnote_cell_type="text-cell-h3" formattedRanges="[]"}
### DynamoDB
:::

::: {.cell .markdown cell_id="afed375d9d7a4c99925170a1bc80d46f" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
Utilizamos DynamoDB como base de datos para guardar la información
referente a los usuarios.
:::

::: {.cell .markdown cell_id="338099008ae749a1b461610231e745d4" deepnote_cell_type="image" deepnote_img_src="image-20240302-163644.png"}
`<img src="image-20240302-163644.png" width="" align="" />`{=html}
:::

::: {.cell .markdown cell_id="897d2d4b299342c691c1aca94bd61d0f" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
Este lambda es el que se encarga de crear los usuarios y de gestionar
los inicios de sesión.
:::

::: {.cell .code cell_id="fb7e0cf3bbac421c8c7b3d4ad664d22a" deepnote_cell_type="code"}
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
:::

::: {.cell .markdown cell_id="7b23d0d12ba0439b98a3929ce5e6cb8e" deepnote_cell_type="text-cell-h2" formattedRanges="[]"}
## Paso 5: Modelo de IA
:::

::: {.cell .markdown cell_id="0e8acb368d5d41b8ba3f1fefc88bf6d2" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
El modelo de sentimientos, ha sido necesario crear un dataset hecho a
mano analizando las frases con la libreria nltk y despues se entrena el
modelo a traves del dataset previamente creado.
:::

::: {.cell .markdown cell_id="ff09fc5589ae4d68ba8e80bd49949806" deepnote_cell_type="text-cell-h2" formattedRanges="[]"}
## 5.1 Crear un buscador de sinonimos. {#51-crear-un-buscador-de-sinonimos}
:::

::: {.cell .markdown cell_id="4b15ebc878644ae696857831846860d7" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
Aquí se esta buscando sinonimos de palabras para despues penalizarlas o
puntuarlas mejor.
:::

::: {.cell .code cell_id="332d9af01a8246b081d3e2443ef0e965" deepnote_cell_type="code"}
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
:::

::: {.cell .markdown cell_id="08f8e1696978464ea96de49da202bb2a" deepnote_cell_type="text-cell-h2" formattedRanges="[]"}
## 5.2 Función que para puntualizar las frases. {#52-función-que-para-puntualizar-las-frases}
:::

::: {.cell .markdown cell_id="907fa0352b0c4a19929601944b5d2b4b" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
En este codigo se esta haciendo una puntuacion a una frase comprobando
si tiene palabras negativas para puntualizarla peor o si tiene palabras
positivas para puntualizarlas mas.
:::

::: {.cell .code cell_id="2868e580a68d4118aa46c8475ad9cc1d" deepnote_cell_type="code"}
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
:::

::: {.cell .markdown cell_id="299d9ab43fe949069922939a44b8cfc3" deepnote_cell_type="text-cell-h2" formattedRanges="[]"}
## 5.3 Comprobacion individual {#53-comprobacion-individual}
:::

::: {.cell .code cell_id="52db7336a3b8488882629eb6f5a6dad4" deepnote_cell_type="code"}
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
:::

::: {.cell .markdown cell_id="2de753309e73405988b06fcf61d9a56e" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
Como podemos ver esta dandole una puntuación adecuada a la frase.
:::

::: {.cell .markdown cell_id="7d13a95e90b842b3959c574d31952e99" deepnote_cell_type="text-cell-h2" formattedRanges="[]"}
## 5.4 Funcion para pasarle un array de frases y que las puntualice. {#54-funcion-para-pasarle-un-array-de-frases-y-que-las-puntualice}
:::

::: {.cell .code cell_id="4fd42fdc832246b4a166b87fb6756d47" deepnote_cell_type="code"}
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
:::

::: {.cell .markdown cell_id="6e96bca4d1d7493eb03ca027e372bb95" deepnote_cell_type="text-cell-h2" formattedRanges="[]"}
## 5.5 Arreglando las frases antes de puntualizarlas. {#55-arreglando-las-frases-antes-de-puntualizarlas}
:::

::: {.cell .markdown cell_id="9b9ae2499c7d47b29427f00189a25be0" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
Aqui estamos eliminadon valores y caracteres que no son necesarios, como
los iconos, eliminar los @ y el texto asociado, eliminar \# y su texto,
eliminar urls y convertir todo a minusculas.
:::

::: {.cell .code cell_id="9643a9a55ce94ed19e16dd2a1a4abd9f" deepnote_cell_type="code"}
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
:::

::: {.cell .markdown cell_id="395a3fae67c24368b862c241f96e5300" deepnote_cell_type="text-cell-h2" formattedRanges="[]"}
## 5.6 Puntualizando frases para añadirlo al dataset. {#56-puntualizando-frases-para-añadirlo-al-dataset}
:::

::: {.cell .code cell_id="5ef95c8beff34bc5be89ba13f9c642e0" deepnote_cell_type="code"}
``` python
textos = ['esta soy yo al ver que las directioners piden ayuda a otros fandoms y la pagina no cuenta todo lo que ya llevamos que creo que arrevazamos a 1d pero la pagina ni verga  ', 'púdrete maldita sensación de angustia y desespero por no tener nada estable, déjame descansar de tu compañía pinche perra.']

for resultado in textos:
  score=funcion(resultado)
  formatted_score = "{:.2f}".format(score)
  print(resultado," ,puntuacion: ", formatted_score)
```
:::

::: {.cell .markdown cell_id="7e7667a02ba64de89f913ac5a70822d7" deepnote_cell_type="text-cell-h2" formattedRanges="[]"}
## 5.7 Preparacion de los modelos y entrenamiento. {#57-preparacion-de-los-modelos-y-entrenamiento}
:::

::: {.cell .markdown cell_id="b80725fd74594be6ad85ade5a6a82e63" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
Una vez creado el dataset probamos como funcionan mejor los modelos si
dejando las stopword o quitandolas.
:::

::: {.cell .code cell_id="a6f7955bcfaf4335a21663c0e0ee4a2f" deepnote_cell_type="code"}
``` python
# Con las estopwords
df['texto'] = df['texto'].apply(lambda x: ' '.join([word.lower() for word in x.split() if word.isalpha()]))
```
:::

::: {.cell .code cell_id="85bb346130c548fb8629164706ba7898" deepnote_cell_type="code"}
``` python
# Sin las stopwords
stop_words = set(stopwords.words('spanish'))
df['texto'] = df['texto'].apply(lambda x: ' '.join([word.lower() for word in x.split() if word.isalpha() and word.lower() not in stop_words]))
```
:::

::: {.cell .markdown cell_id="35f8e8df5ee140fa89100b9d11853bbd" deepnote_cell_type="text-cell-h2" formattedRanges="[]"}
## 5.8 Separamos los valores para el entrenamiento. {#58-separamos-los-valores-para-el-entrenamiento}
:::

::: {.cell .code cell_id="1f5d7fd44cbd458582451ba6b575e17e" deepnote_cell_type="code"}
``` python
# División de datos en conjuntos de entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(df['texto'], df['puntuacion'], test_size=0.2, random_state=42)
```
:::

::: {.cell .markdown cell_id="19c9446d57a5422c966f7eacde91fec4" deepnote_cell_type="text-cell-h2" formattedRanges="[]"}
## 5.9 Modelo de regresión lineal. {#59-modelo-de-regresión-lineal}
:::

::: {.cell .code cell_id="aad86164144f4486b14bcdb018e90ce3" deepnote_cell_type="code"}
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
:::

::: {.cell .markdown cell_id="f87ee89d26af45ab9e4c4ab103d6a26c" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
Mean Squared Error: 1.7861577832948043 Porcentaje de precisión: 92.34%
:::

::: {.cell .markdown cell_id="58df39184beb4813a22eed70402bd050" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
Con este modelo hemos tenido un 92.34% de acierto.
:::

::: {.cell .markdown cell_id="72eb74c6f98d42e3b65c42969917e20b" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
:::

::: {.cell .markdown cell_id="0f2204995ad5421c811a0de9d0a714a8" deepnote_cell_type="text-cell-h2" formattedRanges="[]"}
## Paso 6: Visualización
:::

::: {.cell .markdown cell_id="ba52ebe9db504122ab86b7d54c5b6c76" deepnote_cell_type="text-cell-h3" formattedRanges="[]"}
### 6.1 Web {#61-web}
:::

::: {.cell .markdown cell_id="fd3125943de244d1a5de29abf9799d83" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
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
`<app-nombre_del_componente>`{=html}.

Bootstrap ha sido sin duda un elemento a tener en cuenta a la hora del
diseño de la aplicación, ya que ha permitido añadir clases y organizar
componentes con solo unas líneas en el html.
:::

::: {.cell .markdown cell_id="e09c11c8d9304954a33b3f7cc94212d3" deepnote_cell_type="text-cell-h3" formattedRanges="[{\"fromCodePoint\":0,\"marks\":{\"bold\":true},\"toCodePoint\":12,\"type\":\"marks\"}]"}
### Página HOME
:::

::: {.cell .markdown cell_id="de7022a1d3a248dca31754119535ff62" deepnote_cell_type="text-cell-p" formattedRanges="[{\"fromCodePoint\":280,\"marks\":{\"bold\":true},\"toCodePoint\":302,\"type\":\"marks\"},{\"fromCodePoint\":358,\"marks\":{\"bold\":true},\"toCodePoint\":385,\"type\":\"marks\"},{\"fromCodePoint\":479,\"marks\":{\"bold\":true},\"toCodePoint\":501,\"type\":\"marks\"}]"}
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
:::

::: {.cell .markdown cell_id="c525818bab2e463592f0f6b44e63e8b7" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
Aquí tenemos el componente \"home\" que a su vez llama al componente
\"login-component\" y éste a \"role-register\"
:::

::: {.cell .markdown cell_id="fdf7599363134ed0a30d4dd2c8a483d6" deepnote_cell_type="image" deepnote_img_src="image-20240301-230504.png"}
`<img src="image-20240301-230504.png" width="" align="" />`{=html}
:::

::: {.cell .markdown cell_id="5a47f46d429747b196ccade41f519dd4" deepnote_cell_type="text-cell-h3" formattedRanges="[{\"fromCodePoint\":0,\"marks\":{\"bold\":true},\"toCodePoint\":18,\"type\":\"marks\"}]"}
### Selección de roles
:::

::: {.cell .markdown cell_id="abc25b27b1f445a4a263b46458b7af3a" deepnote_cell_type="text-cell-p" formattedRanges="[{\"fromCodePoint\":176,\"marks\":{\"bold\":true},\"toCodePoint\":191,\"type\":\"marks\"},{\"fromCodePoint\":292,\"marks\":{\"bold\":true},\"toCodePoint\":303,\"type\":\"marks\"}]"}
Cuando el usuario hace click en \"registrarse\", se le presentará una
ventana emergente en la cuál tendra que seleccionar el rol que tendrá
dentro de la web.

Exiten dos roles:

-   Estudiante: Los estudiantes interactuarán con el chatbot y formarán
    parte de un curso con un profesor al frente.
-   Profesor: Los profesores estarán al frente de una clase y tendrán un
    seguimiento de las emociones y el ánimo de los alumnos.
:::

::: {.cell .markdown cell_id="10d3f125276f4b5793736531cd57ded6" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
Gracias al componente \"redirect\" si el alumno o el profesor intentase
poner en la barra de dirección una sección del otro rol, o de otro
usuario, o incluso una dirección no válida, la página le redigirá al
inicio
:::

::: {.cell .markdown cell_id="a2e3de2f50f34ba09e188b4ddf003dd8" deepnote_cell_type="image" deepnote_img_src="image-20240301-231045.png"}
`<img src="image-20240301-231045.png" width="" align="" />`{=html}
:::

::: {.cell .markdown cell_id="d324bb1a1ef045a5b552120c43abcdf2" deepnote_cell_type="text-cell-h3" formattedRanges="[]"}
### Registro
:::

::: {.cell .markdown cell_id="40c5ac79311b436fa857aaad2b6cc736" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
La página de registro permite a los usuarios crear una cuenta
introduciendo su nombre, apellidos, género, correo electrónico, curso,
fecha de nacimiento y contraseña. Una vez completado, pueden hacer clic
en "Registrarse" para finalizar el proceso.
:::

::: {.cell .markdown cell_id="8bb27baba1104b8ab9f5a646897454a4" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
En este componente (\"register.component\"), los datos introducidos por
el usuario en el html serán recogidos en type-script y enviados en la
función \"register()\" que llamará al servicio User service para que
haga una petición PUT con la funcion del servicio también llamada
register().
:::

::: {.cell .markdown cell_id="d09374fa6eed4b5eb7e1065f72b7c575" deepnote_cell_type="image" deepnote_img_src="image-20240301-230611.png"}
`<img src="image-20240301-230611.png" width="" align="" />`{=html}
:::

::: {.cell .markdown cell_id="67f35d2699cf4463b1b3237c7b2d2ae9" deepnote_cell_type="text-cell-h3" formattedRanges="[{\"fromCodePoint\":0,\"marks\":{\"bold\":true},\"toCodePoint\":7,\"type\":\"marks\"}]"}
### ChatBot
:::

::: {.cell .markdown cell_id="50a2f6928bfd446db6755d7e60b0e15b" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
El alumno, una vez haya creado su cuenta, tendrá acceso al chatbot, el
cual le hará preguntas relacionadas con el curso. El alumno deberá
responder con un mínimo de 2 palabras. Una vez respondidas todas las
preguntas, estas se analizarán y se mostrarán en el apartado de
estadísticas.
:::

::: {.cell .markdown cell_id="2fe8a96923de41b5bd2143b9df46ecbd" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
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
:::

::: {.cell .markdown cell_id="8e4e622c69d54d3d87e893c597ece999" deepnote_cell_type="image" deepnote_img_src="image-20240301-230357.png"}
`<img src="image-20240301-230357.png" width="" align="" />`{=html}
:::

::: {.cell .markdown cell_id="7042ca6fc227456c967249eb8b181d8d" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
Al pinchar en el icono del usuario, se muestra una card de Boostrap con
la información del usuario.
:::

::: {.cell .markdown cell_id="6d7e51a7569440acae8eff2ecfef4d0b" deepnote_cell_type="image" deepnote_img_src="image-20240301-231658.png"}
`<img src="image-20240301-231658.png" width="" align="" />`{=html}
:::

::: {.cell .markdown cell_id="0e0f8dc6504842b3a85a72c31e6b4ba2" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
En el apartado de estadísticas alumno, se mostrarán graficas con la
información recaudada y extraida de AWS, y un pequeño mensaje de
motivación en base a la puntuación que ha sacado el análisis.
:::

::: {.cell .markdown cell_id="8a36ff76070c4ffc8b47472ddd6ec355" deepnote_cell_type="image" deepnote_img_src="image-20240302-205107.png"}
`<img src="image-20240302-205107.png" width="" align="" />`{=html}
:::

::: {.cell .markdown cell_id="1913ba058aa74200b642ee3b8be38e0e" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
El profesor podrá gestionar los alumnos de su clase, y acceder a sus
estadísticas individuales.
:::

::: {.cell .markdown cell_id="90fe814ae03a479fb6c754377912ee55" deepnote_cell_type="image" deepnote_img_src="image-20240302-204942.png"}
`<img src="image-20240302-204942.png" width="" align="" />`{=html}
:::

::: {.cell .markdown cell_id="ed002af86c144ea4a2af7bdfeb970c52" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
El profesor también cuenta con una pestaña de estadísticas de la clase,
aquí puede ver información como el número de alumno, profesores, clase y
las gráficas correspondientes. Toda esta información se extrae
directamente de AWS.
:::

::: {.cell .markdown cell_id="cad691a4ae04481fb17e475e0351cae8" deepnote_cell_type="image" deepnote_img_src="image-20240302-205158.png"}
`<img src="image-20240302-205158.png" width="" align="" />`{=html}
:::

::: {.cell .markdown cell_id="92783a59f0f948a5b7c2fc682bb641a6" deepnote_cell_type="text-cell-h3" formattedRanges="[]"}
### 6.1 Power BI {#61-power-bi}
:::

::: {.cell .markdown cell_id="c54529bd574349a7a3d33cd5ad3bfa74" deepnote_cell_type="text-cell-p" formattedRanges="[{\"fromCodePoint\":555,\"ranges\":[],\"toCodePoint\":567,\"type\":\"link\",\"url\":\"https://www.mockaroo.com/\"}]"}
Para visualizar los datos generales de la aplicación y detectar patrones
interesantes para tomar decisiones acertadas en base a datos usaremos
PowerBI. Como nuestra aplicación aún no está disponible para el uso
general, usaremos datos de prueba para mostrar como se vería en caso de
un funcionamiento real de la misma. Serán mil entradas donde cada
entrada representa a una pregunta realizada por el chatbot junto con la
respuesta asociada y la puntuación que le daría el modelo. Aquí tenemos
una demostración de los datos utilizados, generados en la web
mockaroo.com:
:::

::: {.cell .code cell_id="a00760e385fe48deaaf824c6d0f90961" deepnote_cell_type="code" deepnote_to_be_reexecuted="false" execution_millis="41" execution_start="1709336721664" source_hash="null"}
``` python
import pandas as pd

data = pd.read_csv("/work/STAC_Data.csv")

data.head(10)
```

::: {.output .execute_result execution_count="2"}
``` json
{"column_count":10,"columns":[{"dtype":"object","name":"Nombre","stats":{"categories":[{"count":1,"name":"Mandie"},{"count":1,"name":"Shaylynn"},{"count":8,"name":"8 others"}],"nan_count":0,"unique_count":10}},{"dtype":"object","name":"Apellidos","stats":{"categories":[{"count":1,"name":"Kaming"},{"count":1,"name":"Corcut"},{"count":8,"name":"8 others"}],"nan_count":0,"unique_count":10}},{"dtype":"object","name":"Email","stats":{"categories":[{"count":1,"name":"mkaming0@edublogs.org"},{"count":1,"name":"scorcut1@merriam-webster.com"},{"count":8,"name":"8 others"}],"nan_count":0,"unique_count":10}},{"dtype":"object","name":"Rol","stats":{"categories":[{"count":8,"name":"student"},{"count":2,"name":"teacher"}],"nan_count":0,"unique_count":2}},{"dtype":"object","name":"Clase","stats":{"categories":[{"count":3,"name":"Videojuegos"},{"count":3,"name":"2º ASIR"},{"count":4,"name":"3 others"}],"nan_count":0,"unique_count":5}},{"dtype":"object","name":"Género","stats":{"categories":[{"count":4,"name":"Masculino"},{"count":4,"name":"Femenino"},{"count":2,"name":"NS/NC"}],"nan_count":0,"unique_count":3}},{"dtype":"object","name":"Pregunta","stats":{"categories":[{"count":1,"name":"Managed 24/7 toolset"},{"count":1,"name":"Seamless next generation open architecture"},{"count":8,"name":"8 others"}],"nan_count":0,"unique_count":10}},{"dtype":"object","name":"Respuesta","stats":{"categories":[{"count":3,"name":"Podría Ser Mejor"},{"count":3,"name":"Bastante Bien"},{"count":4,"name":"2 others"}],"nan_count":0,"unique_count":4}},{"dtype":"float64","name":"Puntuación","stats":{"histogram":[{"bin_end":0.542,"bin_start":5.0e-2,"count":2},{"bin_end":1.034,"bin_start":0.542,"count":1},{"bin_end":1.526,"bin_start":1.034,"count":0},{"bin_end":2.018,"bin_start":1.526,"count":2},{"bin_end":2.51,"bin_start":2.018,"count":1},{"bin_end":3.002,"bin_start":2.51,"count":1},{"bin_end":3.4939999999999998,"bin_start":3.002,"count":0},{"bin_end":3.9859999999999998,"bin_start":3.4939999999999998,"count":1},{"bin_end":4.478,"bin_start":3.9859999999999998,"count":1},{"bin_end":4.97,"bin_start":4.478,"count":1}],"max":"4.97","min":"0.05","nan_count":0,"unique_count":10}},{"dtype":"object","name":"Fecha","stats":{"categories":[{"count":1,"name":"9/15/2023"},{"count":1,"name":"4/10/2023"},{"count":8,"name":"8 others"}],"nan_count":0,"unique_count":10}},{"dtype":"int64","name":"_deepnote_index_column"}],"row_count":10,"rows":[{"Apellidos":"Kaming","Clase":"1º DAM","Email":"mkaming0@edublogs.org","Fecha":"9/15/2023","Género":"Masculino","Nombre":"Mandie","Pregunta":"Managed 24/7 toolset","Puntuación":5.0e-2,"Respuesta":"Muy Bien","Rol":"student","_deepnote_index_column":0},{"Apellidos":"Corcut","Clase":"1º DAM","Email":"scorcut1@merriam-webster.com","Fecha":"4/10/2023","Género":"Masculino","Nombre":"Shaylynn","Pregunta":"Seamless next generation open architecture","Puntuación":2.4,"Respuesta":"Podría Ser Mejor","Rol":"teacher","_deepnote_index_column":1},{"Apellidos":"Rowen","Clase":"Videojuegos","Email":"jrowen2@privacy.gov.au","Fecha":"4/9/2023","Género":"Masculino","Nombre":"Jermaine","Pregunta":"Enterprise-wide reciprocal productivity","Puntuación":4.97,"Respuesta":"Bastante Mal","Rol":"student","_deepnote_index_column":2},{"Apellidos":"Scrane","Clase":"Ciberseguridad","Email":"gscrane3@parallels.com","Fecha":"10/13/2023","Género":"NS/NC","Nombre":"Glennie","Pregunta":"Sharable regional utilisation","Puntuación":0.91,"Respuesta":"Bastante Bien","Rol":"teacher","_deepnote_index_column":3},{"Apellidos":"Edmunds","Clase":"1º DAW","Email":"sedmunds4@i2i.jp","Fecha":"10/21/2022","Género":"Femenino","Nombre":"Stanislaw","Pregunta":"Enhanced multimedia framework","Puntuación":3.93,"Respuesta":"Bastante Bien","Rol":"student","_deepnote_index_column":4},{"Apellidos":"Rosenblatt","Clase":"Videojuegos","Email":"lrosenblatt5@mapquest.com","Fecha":"3/3/2023","Género":"Femenino","Nombre":"Lyman","Pregunta":"Optimized well-modulated firmware","Puntuación":0.34,"Respuesta":"Muy Bien","Rol":"student","_deepnote_index_column":5},{"Apellidos":"Fury","Clase":"Videojuegos","Email":"kfury6@goo.gl","Fecha":"11/29/2023","Género":"Femenino","Nombre":"Kori","Pregunta":"Managed incremental architecture","Puntuación":1.69,"Respuesta":"Bastante Bien","Rol":"student","_deepnote_index_column":6},{"Apellidos":"Farrears","Clase":"2º ASIR","Email":"cfarrears7@telegraph.co.uk","Fecha":"2/5/2023","Género":"Femenino","Nombre":"Crin","Pregunta":"Sharable discrete archive","Puntuación":4.18,"Respuesta":"Podría Ser Mejor","Rol":"student","_deepnote_index_column":7},{"Apellidos":"Gillon","Clase":"2º ASIR","Email":"ngillon8@cpanel.net","Fecha":"1/3/2022","Género":"NS/NC","Nombre":"Nelia","Pregunta":"Phased discrete extranet","Puntuación":2.52,"Respuesta":"Bastante Mal","Rol":"student","_deepnote_index_column":8},{"Apellidos":"Snaden","Clase":"2º ASIR","Email":"asnaden9@adobe.com","Fecha":"9/21/2022","Género":"Masculino","Nombre":"Abbot","Pregunta":"Organized responsive neural-net","Puntuación":1.82,"Respuesta":"Podría Ser Mejor","Rol":"student","_deepnote_index_column":9}]}
```
:::
:::

::: {.cell .markdown cell_id="899267d458074dc4a6b47cb00bd40243" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
La forma en la que obtendríamos estos datos de nuestra base datos sería
obteniendo cada pregunta, junto con la respuesta, la puntuación, el
usuario que la ha hecho, su email, su rol, su género y la fecha en la
que esa pregunta ha sido realizada.
:::

::: {.cell .markdown cell_id="9b6fff71a807410cb85b1cebf6183a7e" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
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
:::

::: {.cell .markdown cell_id="8c3986be7f7141d7b5ddb9016559e5db" deepnote_app_block_visible="false" deepnote_cell_type="markdown"}
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
:::

::: {.cell .markdown cell_id="cd63cb0f4bb14749bb85395a9e4ac0a1" deepnote_cell_type="image" deepnote_img_src="Captura de pantalla 2024-03-02 014904.jpg"}
`<img src="Captura de pantalla 2024-03-02 014904.jpg" width="" align="" />`{=html}
:::

::: {.cell .markdown cell_id="8f6d7a377b744f99ae9124d9ab9b1091" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
Aquí podemos ver los datos ya transformados.
:::

::: {.cell .markdown cell_id="15be2efe1440457f9a16ff0e0e54aa22" deepnote_cell_type="image" deepnote_img_src="STAC_PowerBI_Captura-20240301-232323.jpg"}
`<img src="STAC_PowerBI_Captura-20240301-232323.jpg" width="" align="" />`{=html}
:::

::: {.cell .markdown cell_id="1a644094de8148e3a2cf150fdbdbf409" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
Aquí podemos observar el informe de PowerBI que sirve para ver datos de
los mensajes y usuarios de nuestra aplicación. Explicaremos cada panel
de izquierda a derecha y de arriba a abajo:
:::

::: {.cell .markdown cell_id="0c7f21c434f64ee88a8790b7b9325c70" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
1.  Recuento de Usuarios, Alumnos, Profesores y Clases Disponibles. Para
    mostrar estos datos crearemos 4 medidas que son las siguientes:
:::

::: {.cell .markdown cell_id="6790a5ca5909459085c43d82c0f75428" deepnote_cell_type="text-cell-bullet" formattedRanges="[]"}
-   Usuarios
:::

::: {.cell .markdown cell_id="f090a3ec02d64c19b284772554ff9065" deepnote_cell_type="markdown"}
``` dax
Usuarios = DISTINCTCOUNT(STAC_Data[Email]) 
```
:::

::: {.cell .markdown cell_id="fc5c29803dd246ba818f1e2ec6e8cb99" deepnote_cell_type="text-cell-bullet" formattedRanges="[]"}
-   Alumnos
:::

::: {.cell .markdown cell_id="4dd8a8e2b97b43d59479d2a5da2e03c0" deepnote_cell_type="markdown"}
``` dax
Alumnos = CALCULATE(
    COUNTROWS(STAC_Data),
    FILTER(
        STAC_Data,
        STAC_Data[Rol] = "Estudiante"
    )
)
```
:::

::: {.cell .markdown cell_id="7b6be14c331845ab9a2dd7caeeb88f47" deepnote_cell_type="text-cell-bullet" formattedRanges="[]"}
-   Profesores
:::

::: {.cell .markdown cell_id="0ec96551f75e494fbf47ab927798cd7d" deepnote_cell_type="markdown"}
``` dax
Profesores = CALCULATE(
    COUNTROWS(STAC_Data),
    FILTER(
        STAC_Data,
        STAC_Data[Rol] = "Profesor"
    )
)
```
:::

::: {.cell .markdown cell_id="3d5ef512d50240a3a18afd247dad36ad" deepnote_cell_type="text-cell-bullet" formattedRanges="[]"}
-   Clases
:::

::: {.cell .markdown cell_id="ead0769419434395b388b47efb57a5eb" deepnote_cell_type="markdown"}
``` dax
Clases = DISTINCTCOUNT(STAC_Data[Clase])
```
:::

::: {.cell .markdown cell_id="c2f90843e7f344358fd4aed05b68ca33" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
Estas medidas las introduciremos en una tarjeta de varias filas.
:::

::: {.cell .markdown cell_id="1f3d68c2561f41ef9eca32aa7f157e21" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
1.  Recuento de Rangos de Puntuaciones de las Respuestas Ofrecidas por
    los Usuarios. Gráfico de Barras. Mientras más bajo, más negativas
    serán las respuestas, mientras más alto, más positivo.
:::

::: {.cell .markdown cell_id="f2cce1793f264a9892d2b16d5ee7d97b" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
Para poder visualizar estos datos crearemos una nueva columna llamada
\'Sentimientos\' definida de la siguiente manera:
:::

::: {.cell .markdown cell_id="2c079ce4f23844a9b10c283309591085" deepnote_cell_type="markdown"}
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
:::

::: {.cell .markdown cell_id="2acbf53684a443acb37fde9bfd29f5cc" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
Pondremos esta columna en el eje X y la fecha del mensaje en el eje Y
:::

::: {.cell .markdown cell_id="fec0e554c01b45e5b38b5f2a7c289b7c" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
1.  Respuestas por Clase: Gráfico Circular.Podemos ver el número de
    respuestas que se ha realizado por cada clase. Esta gráfica nos será
    muy útil ya que gracias a la interactividad de PowerBI podremos ver
    fácilmente los datos por cada clase. Para la \'Leyenda\'
    introduciremos la columna \'Clase\' y para los valores la columna
    \'Respuestas\'.
:::

::: {.cell .markdown cell_id="b23def01595a421982e77b19212acdee" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
1.  Recuento de Mensajes por Fecha. Gráfico de Líneas
:::

::: {.cell .markdown cell_id="68190419aef145f98d21f12981010d4a" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
La columna \'Fecha\' en el eje X y las columna \'Respuesta\' en el eje
Y.
:::

::: {.cell .markdown cell_id="a5a1dadd908c46e5a4468386b33b08a4" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
1.  Sentimientos por Género. Gráfico de Columnas Agrupadas. Aquí podemos
    ver una forma mejorada del gráfico que está justo arriba teniendo en
    cuenta las puntuaciones de las respuestas por cada género.
:::

::: {.cell .markdown cell_id="1febfca612204d6999f48357a96143c3" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
Para poder construir este objeto visual introduciremos en el eje X la
columna \'Género\', la columna \'Puntuación\' en el eje Y y la columna
\'Sentimientos\' en la Leyenda.
:::

::: {.cell .markdown cell_id="766cc07083c145eda414dce198f28f12" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
1.  Pregúntale a PowerBI. En este objeto visual de preguntas y
    respuestas podremos realizar preguntas y consultas para ver en
    detalle aspectos de nuestros datos. Como ejemplo tenemos un top 10
    de clases con más alumnos.
:::

::: {.cell .markdown cell_id="ddea86ba8158417388478409039d2afd" deepnote_cell_type="text-cell-p" formattedRanges="[]"}
Además tenemos en la esquina superior derecha un desplegable para ver
los datos por clase y un slider con todo el rango de fechas que existen
en nuestros datos para poder ver datos en según qué épocas.
:::

::: {.cell .markdown cell_id="5ba6650c8b384f20bb07adf282dfd485" deepnote_cell_type="text-cell-p" formattedRanges="[{\"fromCodePoint\":34,\"ranges\":[],\"toCodePoint\":38,\"type\":\"link\",\"url\":\"https://github.com/martintpablo/proyecto_chatbot_web/blob/main/PowerBI/STAC.pbix\"}]"}
Puedes interactuar con el informe aquí.
:::

::: {.cell .markdown created_in_deepnote_cell="true" deepnote_cell_type="markdown"}
`<a style='text-decoration:none;line-height:16px;display:flex;color:#5B5B62;padding:10px;justify-content:end;' href='https://deepnote.com?utm_source=created-in-deepnote-cell&projectId=3bae215b-bd38-458a-9615-863375324f3d' target="_blank">`{=html}
`<img alt='Created in deepnote.com' style='display:inline;max-height:16px;margin:0px;margin-right:7.5px;' src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODBweCIgaGVpZ2h0PSI4MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU0LjEgKDc2NDkwKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5Hcm91cCAzPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkxhbmRpbmciIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyMzUuMDAwMDAwLCAtNzkuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cC0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjM1LjAwMDAwMCwgNzkuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aC0yMCIgZmlsbD0iIzAyNjVCNCIgcG9pbnRzPSIyLjM3NjIzNzYyIDgwIDM4LjA0NzY2NjcgODAgNTcuODIxNzgyMiA3My44MDU3NTkyIDU3LjgyMTc4MjIgMzIuNzU5MjczOSAzOS4xNDAyMjc4IDMxLjY4MzE2ODMiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zNS4wMDc3MTgsODAgQzQyLjkwNjIwMDcsNzYuNDU0OTM1OCA0Ny41NjQ5MTY3LDcxLjU0MjI2NzEgNDguOTgzODY2LDY1LjI2MTk5MzkgQzUxLjExMjI4OTksNTUuODQxNTg0MiA0MS42NzcxNzk1LDQ5LjIxMjIyODQgMjUuNjIzOTg0Niw0OS4yMTIyMjg0IEMyNS40ODQ5Mjg5LDQ5LjEyNjg0NDggMjkuODI2MTI5Niw0My4yODM4MjQ4IDM4LjY0NzU4NjksMzEuNjgzMTY4MyBMNzIuODcxMjg3MSwzMi41NTQ0MjUgTDY1LjI4MDk3Myw2Ny42NzYzNDIxIEw1MS4xMTIyODk5LDc3LjM3NjE0NCBMMzUuMDA3NzE4LDgwIFoiIGlkPSJQYXRoLTIyIiBmaWxsPSIjMDAyODY4Ij48L3BhdGg+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMCwzNy43MzA0NDA1IEwyNy4xMTQ1MzcsMC4yNTcxMTE0MzYgQzYyLjM3MTUxMjMsLTEuOTkwNzE3MDEgODAsMTAuNTAwMzkyNyA4MCwzNy43MzA0NDA1IEM4MCw2NC45NjA0ODgyIDY0Ljc3NjUwMzgsNzkuMDUwMzQxNCAzNC4zMjk1MTEzLDgwIEM0Ny4wNTUzNDg5LDc3LjU2NzA4MDggNTMuNDE4MjY3Nyw3MC4zMTM2MTAzIDUzLjQxODI2NzcsNTguMjM5NTg4NSBDNTMuNDE4MjY3Nyw0MC4xMjg1NTU3IDM2LjMwMzk1NDQsMzcuNzMwNDQwNSAyNS4yMjc0MTcsMzcuNzMwNDQwNSBDMTcuODQzMDU4NiwzNy43MzA0NDA1IDkuNDMzOTE5NjYsMzcuNzMwNDQwNSAwLDM3LjczMDQ0MDUgWiIgaWQ9IlBhdGgtMTkiIGZpbGw9IiMzNzkzRUYiPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+' >`{=html}
`</img>`{=html} Created in
`<span style='font-weight:600;margin-left:4px;'>`{=html}Deepnote`</span>`{=html}`</a>`{=html}
:::
