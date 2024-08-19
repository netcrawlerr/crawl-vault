import * as SQLite from "expo-sqlite";

// Function to open the database connection
const getDBConnection = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("crawl_vault.db");
    return db;
  } catch (error) {
    console.error("Error opening database:", error);
    return null;
  }
};

// SQL Queries
const createTablesQuery = `
 PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS users(
      user_id INTEGER PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
  );

  
  CREATE TABLE IF NOT EXISTS vault(
      vault_id INTEGER PRIMARY KEY,
      user_id INTEGER REFERENCES users(user_id) NOT NULL,
      code VARCHAR(4) NOT NULL 
  );

  CREATE TABLE IF NOT EXISTS passwords(
      password_id INTEGER PRIMARY KEY,
      user_id INTEGER REFERENCES users(user_id),
      website_name VARCHAR(255) NOT NULL,
      website_user VARCHAR(255) NOT NULL,
      website_password VARCHAR(255) NOT NULL,
      category VARCHAR(255) DEFAULT "personal"
  );
`;

export const initDB = async () => {
  try {
    const db = await getDBConnection();
    await db.execAsync(createTablesQuery);

    // const allRows = await db.getAllAsync("SELECT  website_name FROM passwords");
    // console.log("From DB All", allRows);

    console.log("Database initialized !");
  } catch (error) {
    console.log("Error from initilalizingDB is ", error);
  }
};

export const getAllUsers = async () => {
  console.log("About to get all users");
  try {
    const db = await getDBConnection();

    const allRows = await db.getAllAsync("SELECT * FROM users");
    console.log("All Users", allRows);
    console.log("Got all users");
  } catch (error) {
    console.log("Error from getall user is ", error);
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const db = await getDBConnection();
    if (!db) {
      console.log("Database connection is null.");
      return { error: "Database connection failed" };
    }

    // Check if the email already exists in the database
    const existingUser = await db.getFirstAsync(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser) {
      console.log("Registration failed: Email already in use.");
      return { error: "Email already in use" }; // Return an error object if email exists
    }

    // If the email does not exist, insert the new user
    const result = await db.runAsync(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    // Check if the insertion was successful
    if (result.changes === 0) {
      console.log("Failed to insert user.");
      return { error: "Failed to register user" };
    }

    // Get the ID of the newly inserted user
    const newUserId = result.lastInsertRowId;

    // Retrieve the full information of the newly inserted user
    const newUser = await db.getFirstAsync(
      "SELECT * FROM users WHERE user_id = ?",
      [newUserId]
    );

    if (!newUser) {
      console.log("Failed to retrieve new user.");
      return { error: "User not found after registration" };
    }

    console.log("Newly registered user:", newUser);
    return newUser; // Return the full user information
  } catch (error) {
    console.log("Error from registerUser", error);
    return { error: "Registration failed" }; // Return an error object in case of failure
  }
};

export const loginUser = async (email, password) => {
  try {
    const db = await getDBConnection();
    if (!db) {
      console.log("Database connection is null.");
      return { error: "Database connection failed" };
    }

    const user = await db.getFirstAsync("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    console.log("login user", user);

    if (!user) {
      return { error: "User not found" };
    }

    const isValidUser = await db.getFirstAsync(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    console.log(isValidUser);

    if (isValidUser) {
      console.log("Login successful:", user);
      return user;
    } else {
      console.log("Login failed: Invalid email or password");
      return { error: "Invalid email or password" };
    }
  } catch (error) {
    console.log("Error during login:", error);
    return { error: "Login failed" };
  }
};

export const createVault = async (userId, code) => {
  try {
    const db = await getDBConnection();
    if (!db) {
      console.log("Database connection is null.");
      return { error: "Database connection failed" };
    }

    const result = await db.runAsync(
      "INSERT INTO vault (user_id, code) VALUES (?, ?)",
      [userId, code]
    );

    if (result.changes === 0) {
      console.log("Failed to create vault.");
      return { error: "Failed to create vault" };
    }

    console.log("Vault created successfully for user:", userId);
    return { success: true };
  } catch (error) {
    console.log("Error from createVault", error);
    return { error: "Vault creation failed" };
  }
};

export const accessVault = async (userId) => {
  try {
    const db = await getDBConnection();
    if (!db) {
      console.log("Database connection is null.");
      return { error: "Database connection failed" };
    }

    const result = await db.getFirstAsync(
      "SELECT * FROM vault WHERE user_id = ? ",
      [userId]
    );
    console.log("Result from access vault db", result);

    if (!result) {
      console.log("No code for this user");
      return { error: "No code found" };
    }

    // Ensure 'code' is in a proper format before returning
    const codeArray = JSON.parse(result.code); // Convert JSON string to array
    const codeString = codeArray.join(""); // Join array elements into a single string

    return {
      code: codeString, // Return the concatenated code string
      user_id: result.user_id,
      vault_id: result.vault_id,
    };
  } catch (error) {
    console.log("Error from accessVault", error);
    return { error: "Vault Access failed" };
  }
};

export const addPasswordToDB = async (
  user_id,
  website_name,
  website_user,
  website_password,
  category
) => {
  try {
    // Initialize database connection
    const db = await getDBConnection();

    if (!db) {
      console.log("Database connection is null.");
      return { error: "Database connection failed" };
    }

    // Optionally, you can fetch existing passwords here if needed
    // const passwordFromCurrentUser = await db.getAllAsync("SELECT * FROM passwords");
    // console.log("Password From Current User", passwordFromCurrentUser);

    // Insert the new password into the database
    const result = await db.runAsync(
      "INSERT INTO passwords (user_id, website_name, website_user, website_password, category) VALUES (?, ?, ?, ?, ?)",
      [user_id, website_name, website_user, website_password, category]
    );

    // Check if the insertion was successful
    if (result.changes === 0) {
      console.log("Failed to insert password.");
      return { error: "Failed to add password" };
    }

    // Get the ID of the newly inserted password
    const newPasswordId = result.lastInsertRowId;

    // Retrieve the full information of the newly inserted password
    const newPassword = await db.getFirstAsync(
      "SELECT website_name FROM passwords WHERE password_id = ?",
      [newPasswordId]
    );

    if (!newPassword) {
      console.log("Failed to retrieve new password.");
      return { error: "Password couldn't be retrieved" };
    }

    console.log("Newly added password:", newPassword);
    return newPassword; // Return the full password information
  } catch (error) {
    console.log("Error from addPasswordToDB", error);
    return { error: "Adding password failed" }; // Return an error object in case of failure
  }
};

export const getAllPasswords = async (userId) => {
  try {
    const db = await getDBConnection();
    if (!db) {
      console.log("Database connection is null.");
      return { error: "Database connection failed" };
    }

    const passwords = await db.getAllAsync(
      "SELECT * FROM passwords WHERE user_id = ?",
      [userId]
    );

    if (!passwords) {
      console.log("No passwords found.");
      return { error: "No passwords found" };
    }

    console.log("Fetched passwords:", passwords);
    return passwords; // Return the list of passwords
  } catch (error) {
    console.log("Error fetching passwords:", error);
    return { error: "Failed to fetch passwords" };
  }
};
