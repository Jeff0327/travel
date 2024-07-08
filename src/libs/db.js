import { Pool } from "pg";

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  port: 5432, // PostgreSQL의 기본 포트는 5432입니다.
});

pool.connect((err, client, release) => {
  if (err) {
    console.log("Error connecting to db...");
  } else {
    console.log("Connected to db...!");
    release();
  }
});

const executeQuery = (query, arrParams) => {
  return new Promise((resolve, reject) => {
    try {
      pool.query(query, arrParams, (err, data) => {
        if (err) {
          console.log("Error in executing the query");
          reject(err);
        } else {
          console.log("------db------");
          console.log(data.rows);
          resolve(data.rows);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};

export default executeQuery;
