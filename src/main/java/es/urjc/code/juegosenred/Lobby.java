package es.urjc.code.juegosenred;

public class Lobby {
	private long id;
	private int num;
	private String password;
	private User[] users;
	private int maxUsers;
	
	public Lobby() {
		this.maxUsers = 4;
		this.users = new User[this.maxUsers];
	}
	
	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public User[] getUsers() {
		return users;
	}
	
	public User getUser(int i) {
		return users[i];
	}
	
	public User setUser(int i, User user) {
		return this.users[i] = user;
	}

	public int getMaxUsers() {
		return maxUsers;
	}

	public void setMaxUsers(int maxUsers) {
		this.maxUsers = maxUsers;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}
	
	public int getUserPos(long userId) {
		int pos = -1;
		for(int i = 0; i< this.users.length; i++) {
			if(this.users[i] != null) {
				if(this.users[i].getId() == userId) {
					pos = i;
					System.out.println("M. User id: " + userId);
					System.out.println("this.User id: " + this.users[i].getId());
				}
			}
		}
		
		return pos;
	}
	
	@Override
	public String toString() {
		return "Lobby [id=" + this.id + ", num=" + this.num + ", password=" + this.password + "]";
	}
	
}
