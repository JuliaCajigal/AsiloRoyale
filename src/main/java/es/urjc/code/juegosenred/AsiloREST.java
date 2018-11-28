package es.urjc.code.juegosenred;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AsiloREST {

	public static void main(String[] args) {
		SpringApplication.run(AsiloREST.class, args);
		UsersConnection.init();
	}
}
