package es.urjc.code.juegosenred;

public class User {

	private long id;
	private String nick;
	private boolean ready;
	private int inactivityTime = 0;
	private int score = 0;

	public User() {
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNick() {
		return nick;
	}

	public void setNick(String nick) {
		this.nick = nick;
	}

	public boolean getReady() {
		return ready;
	}

	public void setReady(boolean ready) {
		this.ready = ready;
	}
	
	@Override
	public String toString() {
		return "User [id=" + id + ", nick=" + nick + ", ready=" + ready + "]";
	}

	public int getInactivityTime() {
		return inactivityTime;
	}

	public void setInactivityTime(int inactivityTime) {
		this.inactivityTime = inactivityTime;
	}
	
	public void stepInactivityTime() {
		this.inactivityTime ++;
	}
	
	public int resetInactivity() {
		this.inactivityTime = 0;
        return 0;
    }

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}



}
