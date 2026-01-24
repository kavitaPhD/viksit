const express = require('express'); //Load express moudule which returns a function express
const router = express.Router();
const Joi = require('joi');//joi module return a Class and By covention class name start with capital letter
var mysql = require('../mysql');

//////////////MAIN-DASHBOARD-NITIAAYOG///////////////////////////

router.get('/getdeptwise_modifyinitiative/:id', async (req, res) => 
{
    var id = req.params.id;

    var query = `SELECT 
                    mi.id, 
                    mi.initiative_title as initiativeTitle, 
                    mi.dept_id, 
                    dm.dept_name AS department,
                    mi.term, 
                    mi.modify_term as type,
                    mi.modify_by, 
                    mi.status, 
                    mi.update_on
                FROM 
                    initiative_term_modify mi 
                LEFT JOIN master_departments dm ON dm.dept_id=mi.dept_id
                WHERE  mi.dept_id = ? AND mi.owner='P' and mi.status = 'U'
                ORDER BY
                mi.initiative_title`;

    try {
        let result = await mysql.exec(query, [id]);
        if (result.length == 0) {
            return res.json
                ({
                    "status": 200, "data": [], "error": true, "message": "Data Not Found"
                });
        }
        else {
            return res.json(result);
        }

    }
    catch (err) {
        return res.json
            ({
                "status": 400, "data": [], "error": false, "message": err.message
            });
    }
});

module.exports = router;