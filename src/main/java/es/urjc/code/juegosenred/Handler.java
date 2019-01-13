package es.urjc.code.juegosenred;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class Handler extends TextWebSocketHandler {

	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	
	private ObjectMapper mapper = new ObjectMapper();
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception{
		
		JsonNode jnode = mapper.readTree(message.getPayload());
		
		/*for(WebSocketSession s : sessions.values()) {
			if(!s.getId().equals(session.getId()))
				s.sendMessage(new TextMessage(jnode.toString()));
		}*/
		
		sendPlayerMessage(session, jnode);
	}
	
	private void sendPlayerMessage(WebSocketSession session, JsonNode newNode) throws IOException {
		System.out.println("xxxxxx");
		
		List<WebSocketSession> participants = getLobbyWS(session);	// lobbies.get(node.get("lobby").asText());
		System.out.println("SENDING PLYR");
		
		//if(participants.get(0).equals(session)) {
			System.out.println("Participant get0: " + participants.get(0).getId());
			System.out.println("Participant get1: " + participants.get(1).getId());
			
			System.out.println("Sesisions player ID: " + session.getId());
			
			for(WebSocketSession participant : participants){
				if(!participant.getId().equals(session.getId())) {
					System.out.println("Sesision: " + session.getId());
					System.out.println("Participant [ID]: " + participant.getId());
					participant.sendMessage(new TextMessage(newNode.toString()));
				}
			}	
		//}
	}
	
	//Devuelve el lobby al que pertenece la sesión actual
	private List<WebSocketSession> getLobbyWS (WebSocketSession session) throws IOException{
		List<WebSocketSession> currentLobby = new ArrayList<>();
		
		for(List<WebSocketSession> lobby : TimeHandler.getLobbies().values()) {
			if(lobby.get(0).getId().equals(session.getId()) || lobby.get(1).getId().equals(session.getId())){
				currentLobby = lobby;
			}
		}
		return currentLobby;
	}
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessions.put(session.getId(), session);
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status)throws Exception{
		sessions.remove(session.getId());
	}
}
