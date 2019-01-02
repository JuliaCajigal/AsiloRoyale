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
	
	public void setUsers(User[] users) {
		this.users = users;
	}
	
	public void addUser(int i, User user) {
		this.users[i] =user;
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
	
}