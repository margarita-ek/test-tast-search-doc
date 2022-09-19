const Document = require("../models/document");

class documentController {
    async getDocuments(req, res) { 
        try {
            const documents = await Document.find()
            res
                .status(200)
                .json(documents)
        } catch (e) { 
            console.log(e)
            res
                .status(400)
                .json({ message: "Error getting documents" })
        }
    }
}

module.exports = new documentController()