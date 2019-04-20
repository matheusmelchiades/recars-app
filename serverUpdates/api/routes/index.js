
module.exports = (app) => {

    app.route('/')
        .get((req, res) => res.status(200).send(`SERVER RUNNING`));
};
