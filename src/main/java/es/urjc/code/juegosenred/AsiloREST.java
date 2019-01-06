package es.urjc.code.juegosenred;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;


@SpringBootApplication
@EnableWebSocket
public class AsiloREST implements WebSocketConfigurer{

	public static void main(String[] args) {
		SpringApplication.run(AsiloREST.class, args);
		UsersConnection.init();
	}
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(createHandler(), "/handler")
			.setAllowedOrigins("*");
		
		registry.addHandler(createTimeHandler(), "/timeHandler")
		.setAllowedOrigins("*");
	}
	
	@Bean
	public Handler createHandler() {
		return new Handler();
	}
	
	@Bean
	public TimeHandler createTimeHandler() {
		return new TimeHandler();
	}
}
