import * as SQLite from "expo-sqlite";

const getDBConnection = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("crawl_vault.db");
    if (!db) {
      console.log("Failed to open database.");
      return null;
    }
    console.log("Database opened successfully.");
    return db;
  } catch (error) {
    console.error("Error opening database:", error);
    return null;
  }
};

// // SQL Queries
// const createTablesQuery = `
//  PRAGMA journal_mode = WAL;
//   CREATE TABLE IF NOT EXISTS users(
//       user_id INTEGER PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email VARCHAR(255) NOT NULL,
//       password VARCHAR(255) NOT NULL
//   );

//   CREATE TABLE IF NOT EXISTS vault(
//       vault_id INTEGER PRIMARY KEY,
//       user_id INTEGER REFERENCES users(user_id) NOT NULL,
//       code VARCHAR(4) NOT NULL
//   );

//   CREATE TABLE IF NOT EXISTS passwords(
//       password_id INTEGER PRIMARY KEY,
//       user_id INTEGER REFERENCES users(user_id),
//       website_name VARCHAR(255) NOT NULL,
//       website_user VARCHAR(255) NOT NULL,
//       website_password VARCHAR(255) NOT NULL,
//       category VARCHAR(255) DEFAULT "personal"
//   );
// `;

const createUsersTableQuery = `
PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS users(
      user_id INTEGER PRIMARY KEY,
      name VARCHAR(40) NOT NULL,
      email VARCHAR(80) NOT NULL,
      password VARCHAR(100) NOT NULL
  );
`;

const createVaultTableQuery = `
PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS vault(
      vault_id INTEGER PRIMARY KEY,
      user_id INTEGER REFERENCES users(user_id) NOT NULL,
      code VARCHAR(4) NOT NULL 
  );
`;

const createPasswordsTableQuery = `
PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS passwords(
      password_id INTEGER PRIMARY KEY,
      user_id INTEGER REFERENCES users(user_id),
      website_name VARCHAR(40) NOT NULL,
      website_user VARCHAR(40) NOT NULL,
      website_password VARCHAR(100) NOT NULL,
      category VARCHAR(40) DEFAULT "personal"
  );
`;

export const initDB = async () => {
  try {
    const db = await getDBConnection();
    await db.execAsync(createUsersTableQuery);
    await db.execAsync(createVaultTableQuery);
    await db.execAsync(createPasswordsTableQuery);

    // const allRows = await db.getAllAsync("SELECT  * FROM users");
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

    const existingUser = await db.getFirstAsync(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser) {
      console.log("Registration failed: Email already in use.");
      return { error: "Email already in use" };
    }

    const result = await db.runAsync(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    if (result.changes === 0) {
      console.log("Failed to insert user.");
      return { error: "Failed to register user, Try Reloading App" };
    }

    const newUserId = result.lastInsertRowId;

    const newUser = await db.getFirstAsync(
      "SELECT * FROM users WHERE user_id = ?",
      [newUserId]
    );

    if (!newUser) {
      console.log("Failed to retrieve new user.");
      return { error: "User not found after registration" };
    }

    console.log("Newly registered user:", newUser);
    return newUser;
  } catch (error) {
    console.log("Error from registerUser", error);
    return { error: "Registration failed, Try Reloading App" };
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
    return { error: "Login failed, Try Reloading App" };
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
      return { error: "Failed to create vault, Try Reloading App" };
    }

    console.log("Vault created successfully for user:", userId);
    return { success: true };
  } catch (error) {
    console.log("Error from createVault", error);
    return { error: "Vault creation failed, Try Reloading App" };
  }
};

export const accessVault = async (userId) => {
  try {
    const db = await getDBConnection();
    if (!db) {
      console.error("Database connection is null.");
      return { error: "Database connection failed" };
    }

    const result = await db.getFirstAsync(
      "SELECT * FROM vault WHERE user_id = ?",
      [userId]
    );

    if (!result) {
      console.error("No code for this user");
      return { error: "No code found" };
    }

    console.log("result.com from DB", result.code);
    // Ensure result.code is returned as a string
    return result.code;
  } catch (error) {
    console.error("Error from accessVault:", error);
    return { error: "Vault Access failed, Try Reloading App" };
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
    const result = await db.runAsync(
      "INSERT INTO passwords (user_id, website_name, website_user, website_password, category) VALUES (?, ?, ?, ?, ?)",
      [user_id, website_name, website_user, website_password, category]
    );

    if (result.changes === 0) {
      console.log("Failed to insert password.");
      return { error: "Failed to add password" };
    }

    const newPasswordId = result.lastInsertRowId;

    const newPassword = await db.getFirstAsync(
      "SELECT website_name FROM passwords WHERE password_id = ?",
      [newPasswordId]
    );

    if (!newPassword) {
      console.log("Failed to retrieve new password.");
      return { error: "Password couldn't be retrieved" };
    }

    console.log("Newly added password:", newPassword);
    return newPassword;
  } catch (error) {
    console.log("Error from addPasswordToDB", error);
    return { error: "Adding password failed, Try Reloading App" };
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

    return passwords;
  } catch (error) {
    console.log("Error fetching passwords:", error);
    return { error: "Failed to fetch passwords, , Try Reloading App" };
  }
};

export const fetchSingleUser = async (userId) => {
  try {
    const db = await getDBConnection();
    if (!db) {
      console.log("Database connection is null.");
      return { error: "Database connection failed" };
    }

    const singleUser = await db.getFirstAsync(
      "SELECT * FROM users WHERE user_id = ?",
      [userId]
    );

    if (!singleUser) {
      console.log("No user found.");
      return { error: "No user found" };
    }

    console.log("Fetched user:", singleUser);
    return singleUser;
  } catch (error) {
    console.log("Error fetching user:", error);
    return { error: "Failed to fetch user, Try Reloading App" };
  }
};
export const updatePasswordDB = async (
  website_name,
  website_user,
  website_password,
  category,
  user_id,
  password_id
) => {
  try {
    const db = await getDBConnection();
    if (!db) {
      console.log("Database connection is null.");
      return { error: "Database connection failed" };
    }

    const result = await db.runAsync(
      `UPDATE passwords
      SET 
          website_name = ?,
          website_user = ?,
          website_password = ?,
          category = ?
      WHERE 
          user_id = ? AND password_id = ?;`,
      [
        website_name,
        website_user,
        website_password,
        category,
        user_id,
        password_id,
      ]
    );

    if (result.changes === 0) {
      console.log("No password updated.");
      return { error: "No passwords updated" };
    }
    const updated = await db.getFirstAsync(
      "SELECT * FROM passwords WHERE password_id = ?",
      [password_id]
    );
    console.log("updated password:", updated);
    return updated;
  } catch (error) {
    console.log("Error updating password:", error);
    return { error: "Failed to update password, Try Reloading App" };
  }
};

export const deletePassword = async (password_id) => {
  try {
    const db = await getDBConnection();
    if (!db) {
      console.log("Database connection is null.");
      return { error: "Database connection failed" };
    }

    const result = await db.runAsync(
      `DELETE 
       FROM passwords
       WHERE password_id = ?
       `,
      [password_id]
    );

    if (result.changes === 0) {
      console.log("No password deleted.");
      return { error: "No passwords deleted" };
    }
    const deleted = await db.getFirstAsync(
      "SELECT * FROM passwords WHERE password_id = ?",
      [password_id]
    );
    if (!deleted) {
      console.log("deleted password successfully");
    }
  } catch (error) {
    console.log("Error deleting password:", error);
    return { error: "Failed to delete password, Try Reloading App" };
  }
};

export const updateUser = async (name, password, userId) => {
  try {
    const db = await getDBConnection();
    if (!db) {
      console.log("Database connection is null.");
      return { error: "Database connection failed" };
    }

    const result = await db.runAsync(
      `UPDATE users
      SET 
          name = ?,
          password = ?
      WHERE 
          user_id = ?`,
      [name, password, userId]
    );

    if (result.changes === 0) {
      console.log("No user updated.");
      return { error: "No users updated" };
    }
    const updatedUser = await db.getFirstAsync(
      "SELECT * FROM users WHERE user_id = ?",
      [userId]
    );
    console.log("updated user:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.log("Error updating user:", error);
    return { error: "Failed to update user, Try Reloading App" };
  }
};

export const changePIN = async (newPIN, userId) => {
  try {
    const db = await getDBConnection();
    if (!db) {
      console.error("Database connection is null.");
      return { error: "Database connection failed" };
    }

    await db.runAsync("UPDATE vault SET code = ? WHERE user_id = ?", [
      newPIN,
      userId,
    ]);

    return { success: true };
  } catch (error) {
    console.error("Error from changePIN:", error);
    return { error: "Failed to change PIN, Try Reloading App" };
  }
};

export const changePassword = async (newPassword, userId) => {
  try {
    const db = await getDBConnection();
    if (!db) {
      console.log("Database connection is null.");
      return { error: "Database connection failed" };
    }

    const result = await db.runAsync(
      `UPDATE users
      SET 
         password = ? 
      WHERE 
          user_id = ?;`,
      [newPassword, userId]
    );

    if (result.changes === 0) {
      console.log("No password updated.");
      return { error: "No passwords updated" };
    }
    const updated = await db.getFirstAsync(
      "SELECT * FROM users WHERE user_id = ?",
      [userId]
    );
    console.log("updated password:", updated);
    return updated;
  } catch (error) {
    console.log("Error updating password:", error);
    return { error: "Failed to update password, Try Reloading App" };
  }
};
