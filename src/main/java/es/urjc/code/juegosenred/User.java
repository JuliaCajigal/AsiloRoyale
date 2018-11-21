package es.urjc.code.juegosenred;

public class User {

	private long id;
	private String nick;
	private boolean checked;

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

	public boolean getChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", nick=" + nick + ", checked=" + checked + "]";
	}

}
