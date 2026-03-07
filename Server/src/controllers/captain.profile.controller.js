async function getCaptainProfile(req, res) {
    res.status(200).json(req.captain);
}

module.exports = getCaptainProfile;