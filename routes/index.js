const crypto = require('crypto')



var mysql = require('mysql');
// const { env } = require("process");

// VIA MYSQL SERVER (XAMPP)



var express = require('express');
var router = express.Router();
let finishError = {};
/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.redirect('/register?redirected');
});
router.get('/register', function (req, res, next) {
  res.render('register', { title: 'REGISTER' });
});

router.get('/finish', function (req, res, next) {

  res.render('finish', { code: "123" });
});




router.post('/register', function ({ body }, res, next) {


  finishError = { email: "", name: "", password: "", company: "" };
  let { email, name, password, company } = body
  let lastName = '';
  let nameSplit = name.split(" ")
  //*** Validate  :

  if (!company || !company.trim()) finishError.company = true
  if (name.length < 3) finishError.name = true
  if (!email || !email.includes("@") || !email.includes(".")) finishError.email = true
  if (!passwordValidate(password) || !includeNameValidate(password, name))
    finishError.password = true
  if (Object.values(finishError).some(error => error))
    return res.render('register', { finishError, body });

  //***Insert to DB : 

  //➠ parse name    
  if (nameSplit.length > 1) {
    console.log('nameSplit', nameSplit)
    lastName = nameSplit[nameSplit.length - 1];
    name = name.replace(lastName, "")

    console.log('lastName', lastName)

  }


  //➠ hash  password
  const md5sum = crypto.createHash('md5');
  const hash = md5sum.update(password).digest('hex');
  console.log({ hash, password });

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: process.env.DB_NAME// 'test'

  });




  con.connect(function (err) {
    let sql = "SELECT * FROM `users`"
    let insert = `INSERT INTO users (first_name, last_name, email,company, password )
  VALUES ( '${name}','${lastName}', '${email}','${company}','${hash}'  );`
    if (err) throw err;
    console.log("Connected! HI");
    con.query(insert, function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });






  res.redirect('/finish');
});



function passwordValidate(value) {
  return /[a-z]/.test(value) // has a lowercase letter
    && /[A-Z]/.test(value) // has a uppercase letter
    && /\d/.test(value) // has a digit
};

function includeNameValidate(value, nameInput) {
  let names = nameInput.split(" ")
  console.log({ names, value })
  if (value && names.some((n, index) => {

    if (value.includes(n))
      if (index == 0 || index == names.length - 1) return true // first or last
    return false // middlename
  }))
    return false;
  return true;
}

module.exports = router;




