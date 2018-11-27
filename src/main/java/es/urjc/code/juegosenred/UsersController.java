package es.urjc.code.juegosenred;

import java.util.Collection;
import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/users")
public class UsersController {

	static Map<Long, User> users = new ConcurrentHashMap<>(); 
	private static ArrayList<String> userNames = new ArrayList<String>();
	AtomicLong nextId = new AtomicLong(0);
	
	@GetMapping
	public static Collection<User> users() {
		return users.values();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public User nuevoUser(@RequestBody User user) {

		if(!userNames.contains(user.getNick())&& user.getNick()!=null) {
		long id = nextId.incrementAndGet();
		user.resetInactivity();
		user.setId(id);
		//user.setChecked(true);
		users.put(id, user);
		userNames.add(user.getNick());
		}

		return user;
	}

	@PutMapping("/{id}")
	public ResponseEntity<User> actulizaUser(@PathVariable long id, @RequestBody User UserActualizado) {

		User savedUser = users.get(UserActualizado.getId());

		if (savedUser != null) {

			users.put(id, UserActualizado);

			return new ResponseEntity<>(UserActualizado, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> getUser(@PathVariable long id) {

		User savedUser = users.get(id);

		if (savedUser != null) {
			System.out.println(savedUser.getInactivityTime());
			savedUser.resetInactivity();
			//users.put(id, savedUser);
			
			return new ResponseEntity<>(savedUser, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
	}

	@DeleteMapping("/{id}")
	public static ResponseEntity<User> borraUser(@PathVariable long id) {

		User savedUser = users.get(id);

		if (savedUser != null) {
			userNames.remove(savedUser.getNick());
			users.remove(savedUser.getId());
			return new ResponseEntity<>(savedUser, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
