package es.urjc.code.juegosenred;

import java.util.Collection;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
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
	static Map<String, String> userNames = new ConcurrentHashMap<>();
	AtomicLong nextId = new AtomicLong(0);
	
	@GetMapping
	public static Collection<User> users() {
		return users.values();
	}
	
	@GetMapping("/userNames")
	public static Collection<String> userNames(){
		return userNames.values();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public User nuevoUser(@RequestBody User user,  HttpServletRequest request) {

		//if(!userNames.contains(user.getNick())&& user.getNick()!=null) {
			//System.out.println(userNames.contains(user.getNick()));
		long id = nextId.incrementAndGet();
		user.resetInactivity();
		user.setId(id);
		user.setPassword(user.getPassword());
		user.setIp(request.getRemoteAddr());
		System.out.println(request.getRemoteAddr());
		//System.out.println(request.getHeader("X-FORWARDED-FOR"));
		//System.out.println(request.getLocalHost());
		//user.setChecked(true);
		users.put(id, user);
		userNames.put(user.getPassword(),user.getNick());
		//System.out.println(user.getNick());
		//System.out.println(userNames.get(0));
		//}

		return user;
	}

	@PutMapping("/{id}")
	public ResponseEntity<User> actulizaUser(@PathVariable long id, @RequestBody User UserActualizado) {

		User savedUser = users.get(UserActualizado.getId());

		if (savedUser != null) {

			users.put(id, UserActualizado);
			userNames.put(UserActualizado.getPassword(), UserActualizado.getNick());

			return new ResponseEntity<>(UserActualizado, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> getUser(@PathVariable long id) {

		User savedUser = users.get(id);

		if (savedUser != null) {
			//System.out.println(savedUser.getInactivityTime());
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
			users.remove(savedUser.getId());
			userNames.remove(savedUser.getPassword());
			
			return new ResponseEntity<>(savedUser, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/maxScores")
	public String[][] readMaxScores() throws IOException{
		
		BufferedReader scores = new BufferedReader(new FileReader (new File("target/classes/scores.txt")));
		String line;
		String [][] nickScores = new String [2][10];
		int i = 0;
		while((line = scores.readLine()) != null) 
		{
			String [] splited = line.split(" ");
			nickScores[0][i] = splited[0];
			nickScores[1][i] = splited[1];
			System.out.println(nickScores);
			i++;
			
		}
		scores.close();
		return nickScores;
	}

}
