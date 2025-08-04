const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '102.130.125.52',
  port: 3306,
  user: 'impulsep_root',
  password: '@bo9511221.qwerty',
  database: 'impulsep_securex'
});

console.log('Testing database connection...');

connection.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  }
  
  console.log('✅ Database connection successful!');
  
  // Test a simple query
  connection.query('SELECT 1 as test', (err, results) => {
    if (err) {
      console.error('❌ Query failed:', err.message);
    } else {
      console.log('✅ Query successful:', results);
    }
    
    connection.end();
  });
}); 