const Game = require("../models/gamesSchema.js")

const gameController = {
    getAllGames: (async (req, res) => {

        try {
            const games = await Game.find();

            if(games.length > 0) {
                res.status(200).send({msg: "Games found", games:games})
            } else {
                res.status(404).send({msg: "No games found"})
            };
        } catch (error) {
            consle.log(error);
            res.status(500).send({msg: "internal server error"});
        };

    }),
    createGame: (async (req, res) => {
        const {title, price, publisher, developer, releaseDate, status, description, shortDescription} = req.body;

        try {
            const game = new Game({
                title,
                price, 
                publisher, 
                developer, 
                releaseDate, 
                status, 
                description, 
                shortDescription
            }) 
    
            let result = await game.save();
            console.log(result);
    
            if(result.id) {
                res.status(201).send({msg: "Game created successfully"});
            } else {
                res.status(400).send({msg: "Error creating game"})
            };
        } catch (error) {
            console.log(error);
            res.status(500).send({msg: "internal server error"});
        };
        
    }),
    getGame: (async (req, res) => {
        const { id } = req.params;

        try {
            const game = await Game.findById(id);

            console.log(game);

            res.status(200).send({msg: "Game found", game:game});
        } catch (error) {
            console.log(error);
            res.status(500).send({msg: "internal server error"});
        };

    }),
    editGame: (async (req, res) => {
        const { id } = req.params;
        const updateContent = req.body;

        try {
            const game = await Game.findByIdAndUpdate(id, updateContent);

            console.log(game, "UPDATING");
            res.status(200).send({msg: "Game updated successfully"}); 
        } catch (error) {
            console.log(error)
        }
    }),

    deleteGame: (async (req, res) => {
        const { id } = req.params;

        try {
            const game = await Game.findByIdAndDelete(id);

            res.status(200).send({msg: "Game deleted"});
        } catch (error) {
            console.log(error);
            res.status(500).send({msg: "internal server error"});
        };

    }),
};

module.exports = gameController;