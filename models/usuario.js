const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    friends: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Usuario',
                required: true,
            },
        ],
    },
    photoUrl: {
        type: String,
    },
    description: {
        type: String
    },
    online: {
        type: Boolean,
        default: false,
    },
});

UsuarioSchema.method('toJSON', function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Usuario', UsuarioSchema);
