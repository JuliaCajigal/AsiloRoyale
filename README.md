# Asilo Royale

### ___Integrantes:___
Julia Cajigal Mimbrera:	     juliacajigal@gmail.com // https://github.com/JuliaCajigal   
Raul Arenas Espinosa:           naburorae@gmail.com // https://github.com/RaulArenas

### ___Descripción:___ 
Shooter 2D multijugador de género battle royale con vista cenital ambientado en un asilo para la tercera edad.  Los residentes competirán en una batalla desenfrenada por el control del mando de televisión, que tendrán que obtener siendo el último en pie antes de que comience su programa favorito, para el que apenas quedan unos minutos.

### ___Objetivo:___
El jugador deberá enfrentarse a otros jugadores, sorteando distintas trampas, haciéndose con diferentes objetos y armas para conseguir ser el último en pie y ganar la partida antes de que finalice el tiempo.
           
### ___Mecánicas___:

- El jugador puede moverse por el mapa que se le presenta.
- El jugador puede recoger objetos que le aumentarán la puntuación, la vida y la munición. 
- El jugador es capaz de equiparse con armas, pistola o escopeta, y así inflingir daño a sus enemigos. 
- El jugador posee una barra de vida que se reducirá si los enemigos le tocan. 


### ___Dinámicas___:

- Si el jugador pierde sus 100 puntos de vida, el juego termina.
- Existe un tiempo máximo de 5:00 minutos, entonces finalizará la partida. 
- Cuando el jugador cambia de arma, pierde las balas que hubiera acumulado con su arma anterior.
- El jugador tendrá un campo de visión u otro dependiendo del arma que lleve equipada. 

### ___Objetos___:

Armas: 
- Pistola: la pistola utiliza balas pequeñas e inflige 10 de daño. Con la pistola el jugador tiene un amplio campo de visión. 
- Escopeta: la pistola utiliza cartuchos e inflinge 5 de daño. En un disparo se proyectan 5 cartuchos. Con la escopeta al                  jugador se le reduce ligeramente el campo de visión.
        
Balas: 
- Balas pequeñas: si el jugador está equipado con pistola, se le añaden 15 balas.
- Cartuchos: si el jugador está equipado con escopeta, se le añaden 10 cartuchos.

Botiquin: el jugador recupera 20 de vida.

Pastillas:
- Rojas: el jugador gana 10 puntos.
- Verde: el jugador gana 20 puntos.
- Morada: el jugador gana 30 puntos.
- Amarilla: el jugador gana 50 puntos.
           
           
### ___Enemigos___:

Dientes: 
- Inflinge 5 puntos de daño. 
- Al matarlo se obtiene 35 puntos.
- No es estático, al dispararle comienza a moverse en todas las direcciones.          

Enfermeros: 
- Inflinge 20 puntos de daño. 
- Al matarlo se obtiene 55 puntos.
- Es estático, no se mueve al dispararle.
          
Se lleva un recuento de los enemigos que ha matado cada jugador.           
           

### ___Controles:___

Menu principal:
- Elegir una opción: desplazamienton con ratón y seleccionamos la opción haciendo click
- Volvemos al menu principal con la tecla escape.

In-game:
- Movimiento de personaje: rotación con cursor del ratón y desplazamiento con la cruceta de teclado. 
- Disparar: botón izquierdo. 
- Recargar arma: tecla R.
- Recolección objetos: pasando por encima. 

### ___Interfaz:___
El aspecto visual del juego emulará una televisión retro en todos sus aspectos. Siempre será visible el HUD con el marco del televisor, el tiempo haría referencia a la hora en dicho marco, la barra de vida tendrá el aspecto visual de la barra de volumen y el cambio de menús y estados tendrá un efecto de cambio de canal. Todo en pos de favorecer la inmersión y la experiencia de usuario.

Durante el juego, en el marco de la tele, también dispondremos de las balas del arma que usamos en el momento, y la puntuación que llevamos en la partida. Para que sea más fácil para el jugador reconocer el arma que está usando, contamos con un icono del arma en cuestión. 
Al iniciar el juego, se presenta un menú de inicio con un botón para comenzar la partida. Una vez finalizado el tiempo o tras morir, podemos observar una pantalla con los resultados de la patida: el ganador, la puntuación, el número de asesinatos y el número de objetos obtenidos.

![HUD](https://imageshack.com/a/img921/1495/Qj3rQt.png)

### ___Diagrama de navegación___:

A continuación se presenta un diagrama de navegación con los estados del juego.

Fase 2

![Diagrama de navegación Fase 2](https://imageshack.com/a/img921/2446/bv8eni.png)

Fase 3

![Diagrama de navegación Fase 3](https://imageshack.com/a/img923/6721/dUk5MT.png)

Al iniciar el juego podemos ver una breve introducción a la historia.

!!!!!!!!!!!!!IMAGEN INTRO!!!!!!!!!!!!!!!


Al comenzar se muestra el menú principal con las siguientes opciones: 

- Offline: se comenzará una partida en local.
- Online: se iniciará una conexión entre el cliente y el servidor. 
- Help: imagen explicativa con los controles y los objetos del juego.


Se utilizará el ratón para desplazarse por las opciones y click para seleccionarlas. 
Cuando haces click en alguno de los botones del menu inicial se podrá observar un efecto de ruido blanco o niebla que da paso al siguiente menú.


En la pantalla de "Help" se podrá visualizar una imagen que contiene la explicación de los controles del juego, así como los objetos que se pueden coger, utilizar o equipar. 

![Help](https://imageshack.com/a/img921/2363/nrkyGg.png)

Si iniciamos el juego online se entrará en la sala de Login, donde el usuario escribirá un nombre (menos de 12 caracteres)y una contraseña y al pusar "OK" avanzará al lobby Online.

¡¡¡¡¡¡¡CAMBIAR IMAGENES POR NUEVAS!!!!!!!!

 ![Login](https://imageshack.com/a/img924/1256/Av0GSM.jpg)
 ![Ready](https://imageshack.com/a/img921/6431/Qe7pVy.jpg)
 
 Una vez hecho el Login pasaremos a la pantalla de seleccion de personaje, donde podremos elegir entre las skin disponibles. 
 
 !!!!!!!!!!IMAGEN SELECCION PERSONAJE!!!!!!!!
 
 Tras seleccionar nuestro personaje pasamos a la pantalla de selección de Lobby, en ella tendremos 3 opciones:
 1.Crear un nuevo lobby. Para ello debemos introducir un numero para el lobby y una contraseña
 
 !!!!IMAGEN LOBBY CONFIG!!!!!
 
 2.Acceder a un Lobby ya creado por otro jugador. Para ello debemos introducir el numero de Lobby y la contraseña correcta.
 !!!!!!!!IMAGEN LOBBY CONFIG!!!!!!
 
 3.Acceder a un Lobby aleatorio
 
 
Una vez se ha accedido a un Lobby aparecerá una lista con los nombres de los usuarios conectados. Si pulsa el botón "READY" el usuario indicará que está preparado para comenzar una partida y esto se verá reflejado mediante el texto "[READY]" que aparecerá junto asu nombre en la lista de usuarios. Cuando todos los jugadores estén preparados comenzará una cuenta atrás de 10 segundos y empezará la partida.

!!!!!!!FOTO CON RELOJ NUEVO!!!!!!
![ReadyChange](https://imageshack.com/a/img922/9167/o8HbSg.png)
 
Si en algún momento uno de los usuarios se desconectase del servidor, aparecerá el texto "[DESC]" junto a su nombre unos segundos antes de desaparecer de la lista.

![DESC](https://imageshack.com/a/img922/5791/hch1ME.png)

Tras la cuenta atrás se accede al juego Online, donde nos enfrentaremos a los demás jugadores. 

!!!!!!!IMAGEN PARTIDA CON 2 JUGADORES!!!!!!!

Si perdemos toda nuestra vida durante la partida moriremos. Nuestro avatar pasará a ser un esqueleto y no podremos movernos. Además aparecerá el texto "YOU DIED" en pantalla, y tendremos que esperar a que acabe el tiempo de la partida o a que todos los jugadores mueran.

!!!!!!!IMAGEN MUERTE ESQUELETO!!!!!!

Una vez acabe la partida se accederá a la pantalla de puntuaciones finales, donde se muestra la puntuación de cada jugador, sus muertes, los objetos reacogidos y si ha sido el ganador

!!!!!!IMAGEN PUNTUACIONES!!!!!!!!!!1

Datos permanentes: Tabla de puntuaciones máximas.

![maxScoresIcon](https://imageshack.com/a/img923/9256/fEoo1u.png)
![maxScores](https://imageshack.com/a/img922/55/m72yMB.png)

Otros avisos: servidor desconectado o nombres duplicados.

![server](https://imageshack.com/a/img924/7589/ZBYo4h.png)


Si iniciamos el juego en local, el jugador podrá desplazarse por el mapa y recoger diferentes objetos y armas con las que equiparse. Se presentarán enemigos que reducen la vida del personaje, aunque se podrá acabar con ellos utilizando las armas, lo que nos generará más puntuación. 
El objetivo de la partida será alcanzar una puntuación dada (1000 puntos) antes de que se acabe el tiempo.

Aqui se puede apreciar el HUD con la información de la partida: el tiempo que quede para que finalice, la munición, la puntuación, el arma equipada y la barra de vida. 

![Offline](https://imageshack.com/a/img923/2777/DYsk3E.png)

Por último, al finalizar la partida se puede observar una lista con los resultados:

- La posición en la que se ha quedado.
- Las muertes.
- La puntuación.
- El número de objetos recogidos. 
     
![Results](https://imageshack.com/a/img921/1659/SlFO7y.png)

### ___Diagrama de clases:___


### ___Instrucciones para iniciar el juego online:___


### ___Referencias:___

![Hotline Miami](https://www.gamereactor.es/media/83/hotlinemiami2_838341b.png)
*Hotline Miami.*  

![GTA 2](http://www.onlinemania.org/windows/gta2/2.jpg)  

*Grand Theft Auto 2.*  

![Zombies ate my neighbors](https://tecno.americaeconomia.com/sites/tecno.americaeconomia.com/files/styles/photo_inline/public/zombies-ate-my-neighbors-enemigos.png?itok=Bk5mKM0A)
*Zombies Ate my Neighbors.*  

![Fortnite](https://assets.pcmag.com/media/images/603663-fortnite.jpg?thumb=y&width=810&height=456)  

*Fortnite.*  

![The Swords of Ditto](http://labo.fnac.com/wp-content/uploads/2018/04/The_Swords_of_Ditto_001.jpg)
*The Swords of Ditto.*

![Gun Screen](https://imageshack.com/a/img923/7664/RKNPqi.png)  

*Gun screen.*  

![Shotgun Screen](https://imageshack.com/a/img924/6719/IyKfec.png)  

*Shotgun screen.*

### ___Concepts___:

![Old Lady Concept](https://imageshack.com/a/img924/6522/OVt8nn.png)
*Old lady early concept, top-down view.* 
           
  
##### _*Enlace Trello*_:
https://trello.com/b/q6wktSCS/asilo-royale


##### _*Enlace Presentación Powerpoint*_:
https://drive.google.com/file/d/1j6Tk_zuKZMG8ENV2fb-3WXqiD1wDLIfg/view?usp=sharing




