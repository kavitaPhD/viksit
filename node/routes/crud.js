const express = require('express'); //Load express moudule which returns a function express
const router = express.Router();
const Joi = require('joi');//joi module return a Class and By covention class name start with capital letter
var mysql = require('../mysql');


router.post('/schemeinsert', async (req, res) => 
{
    var values = req.body;
    var query = "INSERT INTO master_scheme SET ? ";
    try {
        let data = await mysql.exec(query, values);
        res.json({
            id: data.insertId
        });
    } catch (err) {
        return res.status(404).json(err);
    }
});

///////////////////////////////////////////////////////////////////////////////////


router.post('/master_initiative_insert', async (req, res) => 
{
    var values = req.body;

    var query = "INSERT INTO master_initiative SET ? ";
    try 
    {
        let data = await mysql.exec(query, values);
        res.json({
            id: data.insertId
        });
    } catch (err) {
        return res.status(404).json(err);
    }
});


router.put('/update_master_initiative/:id', async (req, res) => 
{
    const initiative_id = req.params.id;  

    const values = req.body;
    const query = "UPDATE master_initiative SET ? WHERE initiative_id = ?";
    try 
    {
        let data = await mysql.exec(query, [values, initiative_id]);

        if (data.affectedRows < 1) {
            return res.status(404).send('No data found with the given ID');
        }

        return res.json({ success: "Data updated successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/delete_master_initiative/:id', async (req, res) => 
{
    const initiative_id = req.params.id;
    const { active_status } = req.body; 

    const query = "UPDATE master_initiative SET active_status = 'N' WHERE initiative_id = ? and active_status = 'Y'";

    try 
    {
        const data = await mysql.exec(query, [initiative_id, active_status]);

        if (data.affectedRows < 1) 
        {
            return res.status(404).send('No data found with the given ID');
        }

        return res.json({ success: "Data updated successfully" });

    } 
    catch (err) 
    {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


//////////////////////////////////////////////////////////////////////////////////////////////


router.post('/kpi_master_insert', async (req, res) => 
{
    var values = req.body;
    var query = "INSERT INTO master_kpi SET ? ";
    try {
        let data = await mysql.exec(query, values);
        res.json({
            id: data.insertId
        });
    } catch (err) {
        return res.status(404).json(err);
    }
});


router.put('/delete_master_kpi/:id', async (req, res) => 
{
    const kpi_id = req.params.id;

    const query = "UPDATE master_kpi SET active_status = 'N' WHERE kpi_id = ?";

    try {
        const data = await mysql.exec(query, [kpi_id]);

        if (data.affectedRows < 1) {
            return res.status(404).send('No data found with the given ID');
        }

        return res.json({ success: "Data updated successfully" });

    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


router.put('/update_master_kpi/:id', async (req, res) => 
{
    const kpi_id = req.params.id;
    const values = req.body;
    const query = "UPDATE master_kpi SET ? WHERE kpi_id = ?";
    try 
    {
        let data = await mysql.exec(query, [values, kpi_id]);
        
        if (data.affectedRows < 1) 
        {
            return res.status(404).send('No data found with the given ID');
        }

        return res.json({ success: "Data updated successfully" });

    } 
    catch (err) 
    {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


/////////////////////////////////////////////////////////////////////////////////////////////


// router.post('/initiativedetails_insert', async (req, res) => 
// {
//     var values = req.body;
//     var query = "INSERT INTO initiative_details SET ? ";
//     try {
//         let data = await mysql.exec(query, values);
//         res.json({
//             id: data.insertId
//         });
//     } catch (err) {
//         return res.status(404).json(err);
//     }
// });

///////////////////////////////////////////////////////////////////////////////////////////


function validateStudentDetails(studentdetails) 
{
    const schema = Joi.object({
        student_name: Joi.string().min(3).required(),
        dob: Joi.date().required(),
        course_id: Joi.number().required(),
        mobile_no: Joi.number().min(10).required()
    }).unknown(true);
    return schema.validate(studentdetails);

}



module.exports = router;