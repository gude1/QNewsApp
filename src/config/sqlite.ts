import SQLite, {SQLiteDatabase, ResultSet} from 'react-native-sqlite-storage';
import bcrypt from 'bcryptjs';

// Enable promise support for SQLite
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

// Function to initialize the users table if it doesn't exist
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

// Function to insert a user
export const insertUser = async (
  email: string,
  name: string,
  plainPassword: string,
) => {
  if (!db) {
    await initDatabase();
  }

  try {
    // Hash the password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

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
  if (!db) {
    await initDatabase();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

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
  if (!db) {
    await initDatabase();
  }

  try {
    const [results]: [ResultSet] = await db!.executeSql(
      'SELECT id, email, name, password FROM Users WHERE email = ? LIMIT 1;',
      [email],
    );

    if (results.rows.length > 0) {
      const user = results.rows.item(0);
      const isMatch = await bcrypt.compare(plainPassword, user.password);

      if (isMatch) {
        return {id: user.id, email: user.email, name: user.name};
      }
      console.log('Invalid email and password');
      return null;
    }

    console.log('User not found');
    return null;
  } catch (error) {
    console.error('Error fetching user by email and password', error);
    return null;
  }
};
