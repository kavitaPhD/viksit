const express = require('express'); 
const router = express.Router();
const Joi = require('joi');
var mysql = require('../mysql');



router.get('/getthemes_name', async (req, res) => 
{

    var query = `SELECT themes_name 
	                FROM themes order by themes_name asc`;
    try {
        let result = await mysql.exec(query);
        if (result.length == 0) 
        {
            return res.json
                ({
                    "status": 200, "data": [], "error": true, "message": "Data Not Found"
                });
        }
        else
        {
            return res.json(result);
        }      

    } 
    catch (err) 
    {
        return res.json
            ({
                "status": 400, "data": [], "error": false, "message": err.message
            });
    }
});

//////////////////////////////////////////////////////////////////

router.get('/getdeptwise_initiative/:id', async (req, res) => 
{
    var id = req.params.id;

    var query = `SELECT
                    mi.initiative_id,
                    mi.initiative_title,
                    mi.dept_id,
                    mi.owner,
                    CASE mi.owner
                        WHEN 'P' THEN 'Primary Owner'
                        WHEN 'S' THEN 'Secondary Owner'
                        ELSE 'Unknown'  
                    END AS owner_description,
                    mi.term,
                    CASE mi.term
                        WHEN 'S' THEN 'Short Term (2030)'
                        WHEN 'M' THEN 'Mid Term (2035)'
                        WHEN 'L' THEN 'Long Term (2047)'
                        ELSE 'Unknown'  
                    END AS term_description
                FROM
                    master_initiative mi
                WHERE mi.dept_id = ? 
                AND mi.owner = 'P'
                AND mi.active_status='Y'
                ORDER BY
                    CASE mi.term
                        WHEN 'S' THEN 1  
                        WHEN 'M' THEN 2   
                        WHEN 'L' THEN 3   
                        ELSE 4
                    END,
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

//////////////////////////////////////////////////////

router.get('/getinitiativedata/:id', async (req, res) => 
{
    var id = req.params.id;

    var query = `SELECT initiative_id, initiative_title, dept_id, term, 
                owner, update_on FROM master_initiative where initiative_id = ? and active_status='Y' `;

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

////////////////////////////////////////////////////////

router.get('/getscheme_name', async (req, res) => 
{

    var query = `SELECT scheme_id, schemename, scheme_type
	                FROM master_scheme  order by scheme_id desc`;
    try {
        let result = await mysql.exec(query);
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



router.get('/getscheme_data/:id', async (req, res) => 
{
    var id = req.params.id;

    var query = `SELECT sd.id, sd.department, sd.dept_id, sd.scheme_code, sd.scheme_name, sd.objective
	             FROM schemedata sd WHERE sd.dept_id = ?`;
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

/////////////////////////////////////////////////////////////////////

router.get('/getdeptforinitiative', async (req, res) => {

    var query = `SELECT dept_id, dept_name, dept_name_unicode, description, short_term_initiatives, 
                        mid_term_initiatives, long_term_initiatives, total_initiatives, created_at
	                FROM master_departments`;
    try {
        let result = await mysql.exec(query);
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

////////////////////////////////////////////////////////////////////


router.get('/gettotalinitiative/:id', async (req, res) => 
{
    var id = req.params.id;

    var query = `SELECT COUNT(*) AS totalinitiative FROM master_initiative mi 
                    WHERE mi.dept_id = ? AND mi.owner = 'P' and active_status='Y'`;
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

///////////////////////////////////////////////////////////////////////

router.get('/getinitiativewisekpi/:id', async (req, res) => 
{
    var id = req.params.id;

    var query = `SELECT initiative_id, kpi_type, kpi_description
	                FROM initiatives_kpis where initiative_id = ?`;
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

////////////////////////////////////////////////

router.get('/getdepartmentdata/:id', async (req, res) => 
{
    var id = req.params.id;

    var query = `SELECT dept_id, dept_name, dept_name_unicode, 
                 description, short_term_initiatives, mid_term_initiatives, long_term_initiatives, total_initiatives, created_at
                FROM master_departments where dept_id =?`;
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

/////////////////////////////////////////////////////////////////////

router.get('/getdepartment', async (req, res) => {

    var query = `SELECT dept_id, deptname_hn, deptname_en, isactive, officeaddress,
                    websitelink, logourl, contactno, display, ipaddress
                        FROM allied_departments`;
    try {
        let result = await mysql.exec(query);
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

router.get('/getallieddepartmentbyid/:id', async (req, res) => 
{
    var id = req.params.id;
    var query = `SELECT dept_id, deptname_hn, deptname_en, isactive, officeaddress,
                    websitelink, logourl, contactno, display, ipaddress
                        FROM allied_departments where dept_id=?`;
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

///////////////////////////////////////////////////////////////////////

router.get('/getkpimasterdata/:id/:id1', async (req, res) => 
{
    var id = req.params.id;
    var id1 = req.params.id1;

    var query = `SELECT  mk.kpi_id,mk.kpi_name,mk.kpi_type,mk.dept_id,mk.initiative_id,mk.target_goal_term,mk.target_value, mk.target_accomplishment_date,mk.unit_of_measurement,
                mk.data_source,mk.numerator,mk.denominator, mk.allieddepartment,ad.deptname_en,
                mk.otherallieddepartment, mk.active_status, mk.created_on, mk.updated_on
                FROM master_kpi AS mk
                LEFT JOIN allied_departments AS ad 
                    ON ad.dept_id = mk.allieddepartment 
                WHERE mk.active_status = 'Y'
                AND mk.dept_id = ?
                AND mk.initiative_id = ?`;
    try {
        let result = await mysql.exec(query, [id,id1]);
        if (result.length == 0) 
        {
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


router.get('/getkpimasterbykpiid/:id', async (req, res) => 
{
    var id = req.params.id;

    var query = `SELECT mk.kpi_id,mk.scheme,mk.kpi_cat,mk.kpi_name,mk.kpi_type,mk.dept_id,mk.initiative_id,mk.target_goal_term,mk.target_value, mk.target_accomplishment_date,mk.unit_of_measurement,
                mk.data_source,mk.numerator,mk.denominator, mk.allieddepartment,ad.deptname_en,
                mk.otherallieddepartment, mk.active_status, mk.created_on, mk.updated_on
                FROM master_kpi AS mk
                LEFT JOIN allied_departments AS ad 
                    ON ad.dept_id = mk.allieddepartment 
                WHERE mk.active_status = 'Y'
                AND mk.kpi_id = ?`;
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

/////////////////////////////////////////////////////////////////

router.get('/getsdgdata/:id', async (req, res) => 
{
    var id = req.params.id;

    var query = `SELECT DISTINCT md.dept_name,sm.indicator_id ,sm.dept_id ,sd.department_name,  st.sdg_goal_master_id,st.sif_target_desc,
                    sm.sdg_dept_id , sm.indicator_desc, sm.kpi_target2030,sm.uom,sm.progress_year_data_source,
                    sm.denominator,sm.numerator
                    FROM sdg_indicator_master sm
                    LEFT JOIN master_departments md ON md.dept_id=sm.dept_id
                    LEFT JOIN sif_target_master st ON st.sif_target_id = sm.sif_target_id
                    LEFT JOIN sdg_department_master sd ON sd.dept_id=sm.sdg_dept_id WHERE sm.dept_id  = ?`;
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


router.get('/getsdgdatabyindicator/:id', async (req, res) => 
{
    var id = req.params.id;
    var query = `SELECT DISTINCT md.dept_name,sm.indicator_id ,sm.dept_id ,sd.department_name,  st.sdg_goal_master_id,st.sif_target_desc,
                    sm.sdg_dept_id , sm.indicator_desc,sm.kpi_target2030,sm.uom,sm.progress_year_data_source                    ,
                    sm.progress_year_data_source,sm.indicator_source,
                    sm.computation_description_of_indicator,sm.denominator,sm.numerator
                    FROM sdg_indicator_master sm
                    LEFT JOIN master_departments md ON md.dept_id=sm.dept_id
                    LEFT JOIN sif_target_master st ON st.sif_target_id = sm.sif_target_id
                    LEFT JOIN sdg_department_master sd ON sd.dept_id=sm.sdg_dept_id WHERE sm.indicator_id  = ?`;
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

////////////////////////////////////////////////////////////////////////////////

router.get('/getsdgdatabyid/:id/:id1', async (req, res) => 
{
    var id = req.params.id;
    var id1 = req.params.id1;

    var query = `SELECT DISTINCT md.dept_name,sm.indicator_id ,sm.dept_id ,sd.department_name,  st.sdg_goal_master_id,st.sif_target_desc,
                    sm.sdg_dept_id , sm.indicator_desc,sm.kpi_target2030,sm.uom,sm.progress_year_data_source,sm.computation_description_of_indicator
                    FROM sdg_indicator_master sm
                    LEFT JOIN master_departments md ON md.dept_id=sm.dept_id
                    LEFT JOIN sif_target_master st ON st.sif_target_id = sm.sif_target_id
                    LEFT JOIN sdg_department_master sd ON sd.dept_id=sm.sdg_dept_id WHERE sm.dept_id  = ? and sm.indicator_id = ?`;
    try {
        let result = await mysql.exec(query, [id, id1]);
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


////////////////////////////////////////////////////////////////////////////////


router.get('/getshorttermcount', async (req, res) => 
{
    var query = `SELECT 
                    t.dept_id,
                    t.dept_name,
                    t.dept_count,
                    0 AS dept_completed,
                    totals.total_count
                FROM (
                    SELECT 
                        mi.dept_id,
                        md.dept_name,
                        COUNT(*) AS dept_count
                    FROM master_initiative mi
                    LEFT JOIN master_departments md 
                        ON md.dept_id = mi.dept_id
                    WHERE mi.owner = 'P'
                    AND mi.term = 'S'
                    GROUP BY mi.dept_id, md.dept_name
                ) t
                CROSS JOIN (
                    SELECT COUNT(*) AS total_count
                    FROM master_initiative
                    WHERE owner = 'P'
                    AND term = 'S'
                ) totals
                ORDER BY t.dept_name ASC`;

    try {
        let result = await mysql.exec(query);
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


router.get('/getdeptwise_shortterminitiative/:id', async (req, res) => {
    var id = req.params.id;

    var query = `SELECT
                    mi.initiative_id,
                    mi.initiative_title,
                    mi.dept_id,
                    mi.owner,
                    CASE mi.owner
                        WHEN 'P' THEN 'Primary Owner'
                        WHEN 'S' THEN 'Secondary Owner'
                        ELSE 'Unknown'  
                    END AS owner_description,
                    mi.term,
                    CASE mi.term
                        WHEN 'S' THEN 'Short Term (2030)'
                        WHEN 'M' THEN 'Mid Term (2035)'
                        WHEN 'L' THEN 'Long Term (2047)'
                        ELSE 'Unknown'  
                    END AS term_description
                FROM
                    master_initiative mi
                WHERE mi.dept_id = ? 
                AND mi.owner = 'P'
                AND mi.active_status='Y'
                AND mi.term = 'S'
                ORDER BY
                    CASE mi.term
                        WHEN 'S' THEN 1  
                        WHEN 'M' THEN 2   
                        WHEN 'L' THEN 3   
                        ELSE 4
                    END,
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


router.get('/getkpidata/:id', async (req, res) => 
{
    var id = req.params.id;
    var query = `SELECT kpi_id, kpi_name, kpi_type, dept_id, initiative_id, target_goal_term, target_value, 
                target_accomplishment_date, unit_of_measurement, data_source, numerator, denominator, allieddepartment, 
                otherallieddepartment, active_status, kpi_cat, scheme, created_on, updated_on
                FROM master_kpi where initiative_id  = ?`;
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