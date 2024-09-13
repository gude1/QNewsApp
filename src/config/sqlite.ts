import SQLite, {SQLiteDatabase, ResultSet} from 'react-native-sqlite-storage';
import CryptoJS from 'crypto-js';

SQLite.enablePromise(true);

let db: SQLiteDatabase | null = null;

const initDatabase = async (): Promise<void> => {
  try {
    db = await SQLite.openDatabase({
      name: 'myDatabase.db',
      location: 'default',
    });
    console.log('Database opened successfully');
  } catch (error) {
    console.error('Error opening database', error);
  }
};

export const initUsersTable = async (): Promise<void> => {
  if (!db) {
    await initDatabase();
  }

  try {
    await db!.executeSql(`
      CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        password TEXT NOT NULL
      );
    `);
    console.log('Users table created or already exists');
  } catch (error) {
    console.error('Error creating Users table', error);
  }
};

const hashPassword = (password: string): string => {
  return CryptoJS.SHA256(password).toString();
};

// Function to insert a user
export const insertUser = async (
  email: string,
  name: string,
  plainPassword: string,
) => {
  try {
    if (!db) {
      await initDatabase();
    }
    const hashedPassword = hashPassword(plainPassword);

    await db!.executeSql(
      'INSERT INTO Users (email, name, password) VALUES (?, ?, ?);',
      [email, name, hashedPassword],
    );
    console.log('User inserted successfully with hashed password');

    return true;
  } catch (error) {
    console.error('Error inserting user', error);
    return false;
  }
};

export const updateUser = async (
  id: number,
  email: string,
  name: string,
  plainPassword: string,
): Promise<void> => {
  try {
    if (!db) {
      await initDatabase();
    }
    const hashedPassword = hashPassword(plainPassword);

    await db!.executeSql(
      'UPDATE Users SET email = ?, name = ?, password = ? WHERE id = ?;',
      [email, name, hashedPassword, id],
    );
    console.log('User updated successfully with hashed password');
  } catch (error) {
    console.error('Error updating user', error);
  }
};

export const fetchUserByEmailAndPassword = async (
  email: string,
  plainPassword: string,
): Promise<{id: number; email: string; name: string} | null> => {
  try {
    if (!db) {
      await initDatabase();
    }
    const hashedPassword = hashPassword(plainPassword);

    const [results]: [ResultSet] = await db!.executeSql(
      'SELECT id, email, name FROM Users WHERE email = ? AND password = ? LIMIT 1;',
      [email, hashedPassword],
    );

    if (results.rows.length > 0) {
      const user = results.rows.item(0);
      return {id: user.id, email: user.email, name: user.name};
    } else {
      console.log('Invalid email or password');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user by email and password', error);
    return null;
  }
};

export const checkIfEmailExists = async (email: string): Promise<boolean> => {
  if (!db) {
    await initDatabase();
  }

  try {
    const [results]: [ResultSet] = await db!.executeSql(
      'SELECT 1 FROM Users WHERE email = ? LIMIT 1;',
      [email],
    );

    // If any row is returned, the email exists
    return results.rows.length > 0;
  } catch (error) {
    console.error('Error checking if email exists', error);
    return false;
  }
};
