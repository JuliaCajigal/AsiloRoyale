package es.urjc.code.juegosenred;

import java.util.Stack;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class UsersConnection {

	private static ScheduledExecutorService connectionController = Executors.newSingleThreadScheduledExecutor();
	
	private static boolean serverOn = false;
	
	private static int maxInactivityTime = 10;
	
	private static int timeStep = 500;
	
	public static void init() {
		if(serverOn) {
			System.out.println("Servidor ya inicializado.");
			return;
		}
		
		serverOn = true;
		
		connectionController.scheduleWithFixedDelay(()->{
			
			Stack<User> disconnectStack = new Stack<>();
			
			for(User user: UsersController.users()) {
				user.stepInactivityTime();
				
				if(user.getInactivityTime() > maxInactivityTime) {
					disconnectStack.push(user);
				}
			}
			
			while(!disconnectStack.empty()) {
				User aux = disconnectStack.pop();
				UsersController.borraUser(aux.getId());
			}
		}, timeStep,timeStep, TimeUnit.MILLISECONDS);
		
	}
}