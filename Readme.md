-Proyect made by Thomas de Groot-

sources-help:https://poliformat.upv.es/portal/site/GRA_13952_2023/tool/e9fc034b-8bd6-4727-bad1-401a737df3da?panel=Main

First of all go to cmd and in servidorREST folder exectue comand: npm run servidor

Now that the server is runnin check in android project if its linked to the correct ip (localhost of your computer or device you are hosting the server in)
After youv done that click on Prueba1 in your app to Post a JSON (you can change it at the end of mainActivity)

If everything is correct you can check if its posted by using command: 
sqlite3 datos.bd
then schema Persona (should be Medicion)
and finally: select apellidos from Persona;
(to check that data is being stored)

index.html folder is in ux inside API_REST folder, enter your http://localhost:8080 to see the get being displayed at the botton, the last data should be stored in the dataBase.


