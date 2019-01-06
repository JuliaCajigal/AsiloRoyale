package es.urjc.code.juegosenred;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/lobbies")
public class LobbyController {
		
		static Map<Long, Lobby> lobbies = new ConcurrentHashMap<>();
		AtomicLong nextId = new AtomicLong(0);
		
		@GetMapping
		public static Collection<Lobby> lobbies() {
			return lobbies.values();
		}
		
		@PostMapping
		@ResponseStatus(HttpStatus.CREATED)
		public Lobby nuevoLobby(@RequestBody Lobby lobby) {

			long id = nextId.incrementAndGet();
			lobby.setId(id);
			lobbies.put(id, lobby);
			
			return lobby;
		}
		
		@PutMapping("/{id}")
		public ResponseEntity<Lobby> actualizaLobby(@PathVariable long id, @RequestBody Lobby lobbyActualizado) {

			Lobby savedLobby = lobbies.get(lobbyActualizado.getId());

			if (savedLobby != null) {

				lobbies.put(id, lobbyActualizado);

				return new ResponseEntity<>(lobbyActualizado, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
		/*
		@PutMapping("/{id}/users")
		public ResponseEntity<Lobby> actualizaLobbyUsers(@PathVariable long id, @RequestBody Lobby lobbyActualizado) {

			Lobby savedLobby = lobbies.get(lobbyActualizado.getId());

			if (savedLobby != null) {

				lobbies.put(id, lobbyActualizado);

				return new ResponseEntity<>(lobbyActualizado, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}*/

		@PutMapping("/{id}/{userId}")
		public ResponseEntity<Lobby> actualizaLobbyUser(@PathVariable long id, @PathVariable long userId, @RequestBody User userActualizado) {

			Lobby savedLobby = lobbies.get(id);
			
			int pos;
			Boolean newUserAdd = false;
			
			if (savedLobby != null) {
				System.out.println(savedLobby.toString());
				
				pos = savedLobby.getUserPos(userActualizado.getId());
				
				//Si no hay un usuario con dicho id se introduce en el lobby
				if(pos == -1) {
					for(int i = 0; i<savedLobby.getUsers().length; i++) {
						if(savedLobby.getUsers()[i] == null);
						savedLobby.setUser(i, userActualizado);
						newUserAdd = true;
					}
				
				//Si no actualizamos el usuario existente
				}else {
					savedLobby.setUser(pos, userActualizado);
				}
					
				lobbies.put(id, savedLobby);

				return new ResponseEntity<>(savedLobby, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}

		@GetMapping("/{id}")
		public ResponseEntity<Lobby> getLobby(@PathVariable long id) {

			Lobby savedLobby = lobbies.get(id);

			if (savedLobby != null) {		
				return new ResponseEntity<>(savedLobby, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			
		}
		
		@DeleteMapping("/{id}/{userId}")
		public static ResponseEntity<User> borraLobbyUser(@PathVariable long id, @PathVariable long userId, @RequestBody User userActualizado) {

			Lobby savedLobby = lobbies.get(id);
			int pos;

			if (savedLobby != null) {
				pos = savedLobby.getUserPos(userActualizado.getId());
				savedLobby.setUser(pos, null);
				
				if(savedLobby.isEmpty()) {
					lobbies.remove(savedLobby.getId());
				}

				return new ResponseEntity<>(userActualizado, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}

		@DeleteMapping("/{id}")
		public static ResponseEntity<Lobby> borraLobby(@PathVariable long id) {

			Lobby savedLobby = lobbies.get(id);

			if (savedLobby != null) {
				lobbies.remove(savedLobby.getId());
				return new ResponseEntity<>(savedLobby, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
}