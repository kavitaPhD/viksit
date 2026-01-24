const express = require('express'); //Load express moudule which returns a function express
const router = express.Router();
const Joi = require('joi');//joi module return a Class and By covention class name start with capital letter
var mysql = require('../mysql');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const saltRounds = 10;


router.get('/validdata/:username/:id', async (req, res) => 
{
    var id1 = req.params.username;
    var id2 = req.params.id;

    var query = `SELECT ud.salt  FROM users ud 
                    WHERE ud.username = ? and ud.id= ?`;
    try {
        let result = await mysql.exec(query, [id1, id2]);
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


router.put('/changePassword', async (req, res) => 
{
    var username = req.body.username;
    var id = req.body.id;
    var newpassword = req.body.new_password;
   
    var query = `SELECT ud.districtcode as districtcode,ud.username as username,ud.password, 
                    ud.roleid as role, ud.id, ud.dept_id as dept_id , ud.salt  FROM users ud 
                    WHERE ud.username = ? and ud.id = ? `;

    try {
        let result = await mysql.exec(query, [username, id]);
        if (result.length == 0) 
        {
            return res.json
                ({
                    "status": 200, "data": [], "error": true, "message": "Data Not Found"
                });
        }
        else 
        {
            var hashpassword = req.body.current_password.toString().concat(result[0].salt.toString())
            hashpassword = bcrypt.hashSync(hashpassword, result[0].salt);
            if (hashpassword.toString() == result[0].password) 
            {
                bcrypt.genSalt(saltRounds, async function (err, salt) 
                {
                    var hashedpassword = newpassword.toString().concat(salt.toString());
                    bcrypt.hash(hashedpassword, salt, async function (err, hash) {
                        var query = "update users set password = ? , salt = ? where username = ? AND id = ?";
                        try {
                            let data = await mysql.exec(query, [hash, salt, username, id]);

                            if (data.affectedRows < 1) {
                                return res.status(404).send('error');
                            }
                            res.json({ success: "Data" });
                        }
                        catch
                        {
                            return res.json
                                ({
                                    "status": 400, "data": [], "error": false, "message": err.message
                                });
                        }
                    });                   
                });
            }
            else 
            {
                res.json({ success: false, message: 'Password Mismatch' });
            }
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


router.post('/', async (req, res) => 
{
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            success: 0,
            message: 'Username and password are required.'
        });
    }
    const query = `
        SELECT ud.districtcode, ud.username, ud.password, ud.roleid as role, 
               ud.id, ud.dept_id, ud.salt, md.dept_name
        FROM users ud 
        LEFT JOIN master_departments md ON md.dept_id=ud.dept_id
        WHERE ud.username = ?`;

    try {
       
        let result = await mysql.exec(query, [username]);
        if (!result || result.length === 0) {
            return res.status(401).json({ 
                success: 0,
                message: `Wrong username or user not found.`
            });
        }

        const user = result[0];
        const hashpasswordWithSalt = password.toString().concat(user.salt.toString());
        const hashpassword = bcrypt.hashSync(hashpasswordWithSalt, user.salt.toString());
        console.log("Password Hash Check:", hashpassword === user.password);

        if (hashpassword === user.password) 
        {            
            let tokenPayload = 
            {
                username: user.username,
                dept_id: user.dept_id,
                districtcode: user.districtcode,
                id: user.id,
                role: user.role,
                dept_name: user.dept_name,
                key: 'RNA%&456'
            };
            const token = jwt.sign(tokenPayload, 'SECreTIsAlwaYSSecRET', {
                expiresIn: '12h'
            });

            // 8. Send Success Response
            res.json({
                token: token,
                success: 1,
                role: user.role,
                message: 'Login Success'
            });
        } else {
            // 9. Wrong Password
            return res.status(401).json({ // Use 401 for Unauthorized
                success: 0,
                message: `Wrong Password`
            });
        }
    } catch (err) {
        // 10. Handle Database/Server Errors
        console.error("Login Error:", err);
        return res.status(500).json({ // Use 500 for Internal Server Error
            success: 0,
            message: 'An internal server error occurred during login.',
            error: err.message
        });
    }
});



module.exports = router;