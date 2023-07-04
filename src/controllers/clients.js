const { Clients } = require('../../models');
const path = require('path');
const fs = require('fs');

exports.get = async (req, res) => {
    try {
        const clients = await Clients.findAll();
        res.status(200).send({
            msg: 'OK',
            data: clients,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            msg: 'Internal Server Error',
        });
    }
};

exports.getById = async (req, res) => {
    try {
        const clients = await Clients.findOne({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).send({
            msg: 'OK',
            data: clients,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            msg: 'Internal Server Error',
        });
    }
};

// Menambahkan clients baru
exports.post = async (req, res) => {
    try {
        const reqBody = req.body;

        let image;

        if (req.files && req.files.image_path) {
            const clientImage = req.files.image_path[0];
            image =
                req.protocol +
                '://' +
                req.get('host') +
                '/' +
                clientImage.path.replace(/\\/g, '/');
        }

        const newClient = await Clients.create({
            ...reqBody,
            image_path: image,
        });

        res.status(200).send({
            msg: 'OK',
            data: newClient,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            msg: 'Internal Server Error',
        });
    }
}

// Mengubah data clients
exports.edit = async (req, res) => {
    try {
        const reqBody = req.body;
        const clientId = req.params.id;

        let image;

        if (req.files && req.files.image_path) {
            const clientImage = req.files.image_path[0];
            image =
                req.protocol +
                '://' +
                req.get('host') +
                '/' +
                clientImage.path.replace(/\\/g, '/');
        }

        const client = await Clients.findByPk(clientId);

        if (!client) {
            return res.status(404).send({
                msg: 'Client not found',
            });
        }

        client.company_name = reqBody.company_name;
        client.image_path = image;

        await client.save();

        res.status(200).send({
            msg: 'OK',
            data: client,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            msg: 'Internal Server Error',
        });
    }
}

exports.delete = async (req, res) => {
    try {
        const id = await Clients.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!id) {
            return res.status(404).send({
                msg: 'Client not found',
            });
        }

        let del = await Clients.destroy({
            where: {
                id: req.params.id,
            },
        });

        return res.status(200).send({
            msg: 'deleted!',

        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            msg: 'Internal Server Error',
        });
    }
}
