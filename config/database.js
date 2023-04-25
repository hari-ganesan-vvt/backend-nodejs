import mysql from "mysql";

const db = mysql.createConnection({
  // host: "localhost",
  // user: "root",
  // password: "",
  // database: "blog",
  host: "43.204.17.92",
  user: "root",
  password: "Achyuta@)(^$%&(!*#",
  database: "blog",
});

db.connect((error) => {
  if (error) {
    throw error;
  } else {
    console.log("Database is connected successfully!");
  }
});

export default db;
