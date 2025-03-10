const router = require("express").Router();

const character = require("../models/character");
// our character model

router.post("/save", async(req, res) => {
    const newCharacter = character({
        name : req.body.name,
        description : req.body.description,
        personality : req.body.personality,
        isPublic : req.body.isPublic,
        avatarUrl : req.body.avatarUrl,
    });

    try {
        const savedCharacter = await newCharacter.save();
        return res.status(200).send({succes : true, character : savedCharacter });
    } catch (error) {
        return res.status(400).send({success : false, msg : error});
    }
});



router.get("/getOne/:id", async(req, res) => {
    const filter = {_id : req.params.id};

    const data = await character.findOne(filter);

    if(data) {
        return res.status(200).send({success: true, character: data});
    } else {
        return res.status(404).send({success: false, msg : "data not found"});
    }
    // return res.json(req.params.id);
});

router.get("/getALL", async(req, res) => {
    const options = {
        sort: {
            createdAt : 1,
        },
    };

    const data = await character.find(null, null, options);
    if(data) {
        return res.status(200).send({success: true, character: data});
    } else {
        return res.status(400).send({success: false, msg : "data not found"});
    }
})

router.put('/update/:id', async (req, res) => {
    const filter = {_id : req.params.id};

    const options = {
        upsert : true,
        new : true
    };

    try {
        const result = await character.findOneAndUpdate(filter, {
                name : req.body.name,
                description : req.body.description,
                personality : req.body.personality,
                isPublic : req.body.isPublic,
                avatarUrl : req.body.avatarUrl,
            }, 
        options
        );
        return res.status(200).send({success : true, data: result});
    } catch(error) {
        return res.status(400).send({success : false, msg : error});
    }
})

router.delete("/delete/:id", async(req, res) => {
    const filter = {_id: req.params.id};

    const result = await character.deleteOne(filter);
    if(result.deletedCount > 0) {
        return res.status(200).send({success: true, data: result});
    } else {
        return res.status(404).send({success: false, msg : "data not found"});
    }
})

module.exports = router;