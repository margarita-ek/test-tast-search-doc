const Router = require("express")
const controller = require("../controllers/documents-controller")

const router = new Router()

router.get("/documents", controller.getDocuments)

module.exports = router