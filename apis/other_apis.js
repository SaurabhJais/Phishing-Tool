let db = require("../db")




let getDesignName = async (projectId) => {
    let name = await db.getDb().collection("projects").findOne({ projectId: parseInt(projectId) })
    return name;
}

let getHtmlCode = async (projectName) => {
    let code = await db.getDb().collection("designs").findOne({title: projectName})
    return code
}

let getRemainingEntries = async (projectId) => {
    let remainingEntries = await db.getDb().collection("projects").findOne({projectId: parseInt(projectId)})
    remainingEntries = remainingEntries["remainingEntries"]
    return remainingEntries;
}

let decrementRemainingEntriesByOne = async (projectId) => {
    await db.getDb().collection("projects").updateOne({projectId: parseInt(projectId)}, {$inc: {remainingEntries: -1}})
}


let getTotalProjects = async (userId) => {
    let totalProjects = db.getDb().collection("projects").find({userId}).toArray()
    return totalProjects;
}


let getTotalPasswords = async (userId) => {
    let totalPasswords = db.getDb().collection("entries").find({userId}).toArray()
    return totalPasswords;
}

module.exports = {
    getDesignName,
    getHtmlCode,
    getRemainingEntries,
    decrementRemainingEntriesByOne,
    getTotalProjects,
    getTotalPasswords
}