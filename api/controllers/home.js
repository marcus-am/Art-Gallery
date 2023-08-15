const index = async (req, res) => {
    try{
        res.send("welcome to the Art Gallery API");
    } catch(err) {
        res.status(500).send('Server Error');
    }
};

module.exports = { index }