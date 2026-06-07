package com.library.model;

//Represent Library User
public class User {

	private int userId;
	private String userName;

	// Constructor to initialize the user details
	public User(int userId, String userName) {
		this.userId = userId;
		this.userName = userName;
	}

	public int getUserId() {
		return userId;
	}

	public String getUserName() {
		return userName;
	}

	@Override
	public String toString() {
		return "User ID : " + userId + "\nUser Name : " + userName;
	}
}