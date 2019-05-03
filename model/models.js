const sqlite3 = require('sqlite3').verbose();
const pg = require('pg');

// development
const config = {
    user: 'postgres', //this is the db user credential
    database: 'rebuild',
    password: 'root',
    port: 5432,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000,
};
// var awsDB = 'ec2-54-224-124-125.compute-1.amazonaws.com';

// production
// const config = {
//     user: 'postgres', //this is the db user credential
//     host: 'ec2-52-202-108-219.compute-1.amazonaws.com',
//     database: 'zillow',
//     password: 'postgres',
//     port: 5432,
//     max: 10, // max number of clients in the pool
//     idleTimeoutMillis: 30000,
// };


const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('connected to the Database');
});

var psqlOnChange = (req, res, bounds) => {
  console.log('bounds: ', bounds);
  console.log('bounds fixed ', bounds.se.lat);
  console.log(`SELECT * FROM neighborhood where (latitude > ${(bounds.sw.lat).toFixed(4)} and latitude < ${(bounds.se.lat).toFixed(4) + 1}) and (longitude > ${(bounds.sw.lng).toFixed(4)} and longitude < ${(bounds.nw.lng).toFixed(4)}) limit 100 `);
  var swLat = Math.floor((bounds.sw.lat).toFixed(4))
  var seLat = (bounds.se.lat).toFixed(4) + 1.0000
  var swLng = Math.floor((bounds.sw.lng).toFixed(4))
  var seLng = (bounds.se.lng).toFixed(4) + 1.0000;
  console.log(`SELECT * FROM neighborhood where (latitude > ${swLat} and latitude < ${seLat}) and (longitude > ${swLng} and longitude < ${seLng}) limit 100 `);
  var query = `SELECT * FROM neighborhood where (latitude > ${swLat} and latitude < ${seLat}) and (longitude > ${swLng} and longitude < ${seLng}) limit 100 `;
  
  pool.query(query)
  .then((data) => {
    res.send(data.rows)
  })
  .catch((err) => {
    console.log(err);
    pool.end();
  }); 
}

var psqlRetrieveAll = (req, res) => {
    var getEverything = 'SELECT * FROM neighborhood limit 200';
    
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
    
    var getOne = 'SELECT * FROM neighborhood WHERE id = ' + req.params.id;

    pool.query(getOne)
        .then((data) => {
            res.send(data.rows)
        })
        .catch((err) => {
            console.log(err);
            pool.end();
          }); 
    // let db = new sqlite3.Database(__dirname + '/../properties.db', (err) => {
    //     if (err) {
    //         console.log('error db', err);
    //     } else {
    //         db.all(getOne + req.params.id, [], (err, property) => {
    //             if (err) {
    //                 console.log(err);
    //             } else {
    //                 res.send(property);
    //             }
    //         })
    //     }
    // })
}


// var psqlRetrieveAll = (req, res) => {
//     var getEverything = 'SELECT * FROM properties limit 100';
    
//     pool.query(getEverything)
//     .then((data) => {
//       res.send(data.rows)
//     })
//     .catch((err) => {
//       console.log(err);
//       pool.end();
//     }); 
// }

// var psqlRetrieveOne = (req, res) => {
    
//     var getOne = 'SELECT * FROM properties WHERE id = ' + req.params.id;

//     pool.query(getOne)
//         .then((data) => {
//             res.send(data.rows)
//         })
//         .catch((err) => {
//             console.log(err);
//             pool.end();
//           }); 
//     // let db = new sqlite3.Database(__dirname + '/../properties.db', (err) => {
//     //     if (err) {
//     //         console.log('error db', err);
//     //     } else {
//     //         db.all(getOne + req.params.id, [], (err, property) => {
//     //             if (err) {
//     //                 console.log(err);
//     //             } else {
//     //                 res.send(property);
//     //             }
//     //         })
//     //     }
//     // })
// }

module.exports.psqlOnChange = psqlOnChange;
module.exports.psqlRetrieveAll = psqlRetrieveAll;
module.exports.psqlRetrieveOne = psqlRetrieveOne;
module.exports.pool = pool;

require('make-runnable');