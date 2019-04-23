const sqlite3 = require('sqlite3').verbose();
const pg = require('pg');

const config = {
    user: 'postgres', //this is the db user credential
    database: 'rebuild',
    password: 'root',
    port: 5432,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('connected to the Database');
});

var retrieveAll = (req, res) => {
    let db = new sqlite3.Database(__dirname + '/../properties.db', (err) => {
    
        if (err) {
            console.log('error db', err);
        } else {
            db.all("SELECT * FROM regoProperties;", [], (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(rows);
                }
            });
        }
    });    
}

var retrieveOne = (req, res) => {
    let db = new sqlite3.Database(__dirname + '/../properties.db', (err) => {
        if (err) {
            console.log('error db', err);
        } else {
            db.all("SELECT * FROM regoProperties WHERE uniqueId = " + req.params.id, [], (err, property) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(property);
                }
            })
        }
    })
}

var psqlRetrieveAll = (req, res) => {
    var getEverything = 'SELECT * FROM neighborhood limit 100';
    
    pool.query(getEverything)
    .then((data) => {
      res.send(data.rows)
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    }); 
}

var psqlRetrieveOne = (req, res) => {
    let db = new sqlite3.Database(__dirname + '/../properties.db', (err) => {
        if (err) {
            console.log('error db', err);
        } else {
            db.all("SELECT * FROM regoProperties WHERE uniqueId = " + req.params.id, [], (err, property) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(property);
                }
            })
        }
    })
}


module.exports.retrieveAll = retrieveAll;
module.exports.retrieveOne = retrieveOne;
module.exports.psqlRetrieveAll = psqlRetrieveAll;
module.exports.psqlRetrieveOne = psqlRetrieveOne;
module.exports.pool = pool;

require('make-runnable');