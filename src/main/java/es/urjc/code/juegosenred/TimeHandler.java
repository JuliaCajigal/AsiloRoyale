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

public class TimeHandler extends TextWebSocketHandler {

	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private static Map<String,List<WebSocketSession>> lobbies = new ConcurrentHashMap<>();
	private ObjectMapper mapper = new ObjectMapper();
	
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New time user: " + session.getId());
		sessions.put(session.getId(), session);
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Time session closed: " + session.getId());
		sessions.remove(session.getId());

	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		System.out.println("Message received: " + message.getPayload());
		JsonNode node = mapper.readTree(message.getPayload());
		
		sendOtherParticipants(session, node);
	}

	private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException {

		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("socket", node.get("socket").asText());
		
		
		switch(node.get("socket").asText()){
		case "time":
			newNode.put("time", node.get("time").asText());
			System.out.println("Message sent: " + node.toString());
			sendTimeMessage(session, newNode);
			break;
			
		case "player":
			System.out.println("Message sent: " + node.toString());
			sendPlayerMessage(session, node);
			break;
			
		case "bang":
			System.out.println("BANG message sent: " + node.toString());
			sendPlayerMessage(session, node);
			break;
			
		case "lobby":
			newNode.put("lobby", node.get("lobby").asText());
			System.out.println("Message sent: " + node.toString());
			generateLobby(session, node.get("lobby").asText());
			break;
			
		}
		/*
		for(WebSocketSession participant : sessions.values()) {
			lobbies.get(lobbyID).get(0)
			if(!participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(newNode.toString()));
			}
		}*/
	}
	
	private void sendTimeMessage(WebSocketSession session, ObjectNode newNode) throws IOException {
		System.out.println("xxxxxx");
		
		List<WebSocketSession> participants = getLobbyWS(session);	// lobbies.get(node.get("lobby").asText());
		System.out.println("SENDING MSG");
		
		if(participants.get(0).equals(session)) {
			System.out.println("Participant get0: " + participants.get(0).getId());
			System.out.println("Sesisions get0: " + session.getId());
			
			for(WebSocketSession participant : participants){
				if(!participant.getId().equals(session.getId())) {
					System.out.println("Sesision: " + session.getId());
					System.out.println("Participant [ID]: " + participant.getId());
					participant.sendMessage(new TextMessage(newNode.toString()));
				}
			}	
		}
	}
	
	private void sendPlayerMessage(WebSocketSession session, JsonNode newNode) throws IOException {
		System.out.println("xxxxxx");
		
		List<WebSocketSession> participants = getLobbyWS(session);	// lobbies.get(node.get("lobby").asText());
		System.out.println("SENDING PLYR");
		
		//if(participants.get(0).equals(session)) {
			//System.out.println("Participant get0: " + participants.get(0).getId());
			//System.out.println("Sesisions get0: " + session.getId());
			
			for(WebSocketSession participant : participants){
				if(!participant.getId().equals(session.getId())) {
					System.out.println("Mandado por: " + session.getId() + " a [ID]: " + participant.getId());
					participant.sendMessage(new TextMessage(newNode.toString()));
				}
			}	
		//}
	}
	
	//Devuelve el lobby al que pertenece la sesión actual
	private List<WebSocketSession> getLobbyWS (WebSocketSession session) throws IOException{
		List<WebSocketSession> currentLobby = new ArrayList<>();
		
		for(List<WebSocketSession> lobby : getLobbies().values()) {
			if(lobby.get(0).getId().equals(session.getId()) || lobby.get(1).getId().equals(session.getId())){
				currentLobby = lobby;
			}
		}
		return currentLobby;
	}
	
	
	private void generateLobby(WebSocketSession session, String lobbyID) {
		System.out.println("METODO GEN LOBBY");
		
		if(!getLobbies().containsKey(lobbyID)) {
			List<WebSocketSession> newlobby = new ArrayList<>();
			newlobby.add(session);
			getLobbies().put(lobbyID , newlobby);
			System.out.println("New lobby [0]: " + getLobbies().get(lobbyID).get(0).getId());
			
		}else {
			getLobbies().get(lobbyID).add(session);
			System.out.println("Lobby: " + lobbyID);
			System.out.println("Lobby session [0]: " + getLobbies().get(lobbyID).get(0).getId());
			System.out.println("Lobby session [1]: " + getLobbies().get(lobbyID).get(1).getId());
			
		}/*
		for(List<WebSocketSession> lobby: lobbies.values()){
			System.out.println(lobbies.get(lobbyID));
								
			//Hay un usuario ya en la sesión de dicho lobby (somos cliente)	
			}else if(lobbies.get(lobbyID) != null && lobbies.get(lobbyID).size()==1) {
				
				//Añadimos el usuario al lobby de su posición (lobbyID)
				lobby.add(session);
				
				//Actualizamos dicha sesión en lobbies
				lobbies.put(lobbyID, lobby);
				//lobbies.put(lobby.get(1).getId(), lobby);
				System.out.println("lobbies.get(lobby.get(0).getId()" + lobbies.get(session.getId()).get(0));
			}	
		}
		if() {
			List<WebSocketSession> newLobby = new ArrayList<>();
			newLobby.add(session);
			lobbies.put(session.getId(), newLobby);
		}*/
		

	}

	public static Map<String,List<WebSocketSession>> getLobbies() {
		return lobbies;
	}

}

