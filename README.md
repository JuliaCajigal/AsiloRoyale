# Asilo Royale

### ___Integrantes:___
Julia Cajigal Mimbrera:	     juliacajigal@gmail.com // https://github.com/JuliaCajigal  
Maru Suarez Pastene:              emme14112@gmail.com // https://github.com/Maru14  
Raul Arenas Espinosa:           naburorae@gmail.com // https://github.com/RaulArenas

### ___Descripción:___ 
Shooter 2D multijugador de género battle royale con vista cenital ambientado en un asilo para la tercera edad.  Los residentes competirán en una batalla desenfrenada por el control del mando de televisión, que tendrán que obtener siendo el último en pie antes de que comience su programa favorito, para el que apenas quedan unos minutos.

### ___Objetivo:___
El jugador deberá enfrentarse a otros jugadores, sorteando distintas trampas, haciéndose con diferentes objetos y armas para conseguir ser el último en pie y ganar la partida antes de que finalice el tiempo.

### ___Mecánicas:___
- Moverse por el escenario
- Recoger armas y utilizarlas
- Recoger objetos
- Evitar trampas y enemigos
- Eliminar rivales

### ___Dinámicas:___
Los jugadores comenzarán en una parte aleatoria del mapa y sin ningún objeto. Deberán explorar el escenario para encontrar las diferentes armas y objetos y acabar con los rivales reduciendo su barra de vida a cero antes de que el tiempo finalice. El tipo de arma que tengan en posesión determinará el campo de visión del escenario y el daño que causará cada proyectil. En caso de que ninguno de los jugadores acabe con el resto y sea el último en pie se contabilizarán los puntos obtenidos por recoger objetos, como medicinas o audífonos, y acabar con rivales y enemigos, como los enfermeros que intentarán deternernos.
Durante la partida, podremos matar a los enemigos, recoger pastillas de distintos colores y con distintas puntuaciones, recoger botiquines que aumentan nuestra vida y recoger balas que aumentan el número de balas de las que disponemos. Las armas serán recogidas y podrán ser utilizadas al pasar por encima de ellas, y si ya estamos usando una, esta se cambiará por la nueva y perderemos las balas que hayamos obtenido para ésta.

### ___Controles:___
Movimiento de personaje: rotación con cursor del ratón y desplazamiento con la cruceta de teclado. Disparar con botón izquierdo y recolección de objetos y armas pasando por encima. 
En la pantalla de Game Over, podremos acceder al menú principal pulsando escape. 

### ___Interfaz:___
El aspecto visual del juego emulará una televisión retro en todos sus aspectos. Siempre será visible el HUD con el marco del televisor, el tiempo haría referencia a la hora en dicho marco, la barra de vida tendrá el aspecto visual de la barra de volumen y el cambio de menús y estados tendrá un efecto de cambio de canal. Todo en pos de favorecer la inmersión y la experiencia de usuario.
Durante el juego, en el marco de la tele, también dispondremos de las balas del arma que usamos en el momento, y la puntuación que llevamos en la partida. Para que sea más fácil para el jugador reconocer el arma que está usando, contamos con un icono del arma en cuestión. 
Al iniciar el juego, se presenta un menú de inicio con un botón para comenzar la partida. Una vez finalizado el tiempo o tras morir, se nos presenta una pantalla con los resultados de la patida: el ganador, la puntuación, el número de asesinatos y el número de objetos obtenidos.


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

### ___Concepts___:

![Old Lady Concept](https://imageshack.com/a/img924/6522/OVt8nn.png)
*Old lady early concept, top-down view.*  

![Gun Screen](https://imageshack.com/a/img923/7664/RKNPqi.png)  

*Gun screen.*  

![Shotgun Screen](https://imageshack.com/a/img924/6719/IyKfec.png)  

*Shotgun screen.*  

### ___Objetos___:

-Armas: 
        -Pistola: la pistola utiliza balas pequeñas e inflige 10 de daño. Con la pistola el jugador tiene un amplio campo de visión. 
        -Escopeta: la pistola utiliza cartuchos e inflinge 5 de daño. En un disparo se proyectan 5 cartuchos. Con la escopeta al                  jugador se le reduce ligeramente el campo de visión.
        
-Balas: 
       -Balas pequeñas: si el jugador está equipado con pistola, se le añaden 15 balas.
       -Cartuchos: si el jugador está equipado con escopeta, se le añaden 10 cartuchos.

-Botiquin: el jugador recupera 20 de vida.

-Pastillas:
           -Rojas: el jugador gana 10 puntos.
           -Verde: el jugador gana 20 puntos.
           -Morada: el jugador gana 30 puntos.
           -Amarilla: el jugador gana 50 puntos.
           
           
### ___Enemigos___:

-Dientes: 
           - Inflinge 5 puntos de daño. 
           - Al matarlo se obtiene 35 puntos.
           - No es estático, al dispararle comienza a moverse en todas las direcciones.          

-Enfermeros: 
          - Inflinge 20 puntos de daño. 
          - Al matarlo se obtiene 55 puntos.
          - Es estático, no se mueve al dispararle.
          
Se lleva un recuento de los enemigos que ha matado cada jugador.           
           
           
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


### ___Diagrama de navegación___:

A continuación se presenta un diagrama de navegación con los estados del juego.

![Diagrama de navegación](https://imageshack.com/a/img921/2446/bv8eni.png)

Al comenzar se muestra el menú principal con las siguientes opciones: 

-Play: se comenzará una partida en local.
-Help: imagen explicativa con los controles y los objetos del juego.

Se utilizará el ratón para desplazarse por las opciones y click para seleccionarlas. 

![Menu principal]


En la pantalla de "Help" se podrá visualizar una imagen que contiene la explicación de los controles del juego, así como los objetos que se pueden coger, utilizar o equipar. 

![Help](https://imageshack.com/a/img921/2363/nrkyGg.png)

Una vez dentro del juego, el jugador podrá desplazarse por el mapa y recoger diferentes objetos y armas con las que equiparse. Se presentarán enemigos que reducen la vida del personaje, aunque se podrá acabar con ellos utilizando las armas, lo que nos generará más puntuación. 

Aqui se puede apreciar el HUD con la información de la partida: el tiempo que quede para que finalice, la munición, la puntuación, el arma equipada y la barra de vida. 

![In-game](https://imageshack.com/a/img923/2777/DYsk3E.png)

Por último, al finalizar la partida se puede observar una lista con los resultados:
     - La posición en la que se ha quedado.
     - Las muertes.
     - La puntuación.
     - El número de objetos recogidos. 
     
![Results](https://imageshack.com/a/img921/1659/SlFO7y.png)
           
  
##### _*Enlace Trello*_:
https://trello.com/b/q6wktSCS/asilo-royale


##### _*Enlace Presentación Powerpoint*_:
https://drive.google.com/file/d/1j6Tk_zuKZMG8ENV2fb-3WXqiD1wDLIfg/view?usp=sharing




