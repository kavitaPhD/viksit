const { Client } = require('pg');

var exec = function (query, params) {
    return new Promise((resolve, reject) => {

        if (!query) {

            return reject("Query not found");
        }
        //console.log('1');
        var connection = "postgres://postgres:1234@localhost:5432/";

        const client = new Client({
            connectionString: connectionString
        });



        client.connect(function (err) {

            if (err) {

                return reject(err);


            }

            var q = client.query(query, params, function (err, results) {

                //connection.end();
                if (err) { return reject(err); }
                return resolve(results);
            });
        });


    });
};