const mongoose = require('mongoose')


const FieldsPermissionsSchema = new mongoose.Schema(
    {
        userRole: {
            type: String,
            enum: ['ADMIN', 'HELPER', 'USER']
        },
        fields: mongoose.Schema.Types.Mixed,
    }, {
        versionKey: false,
        timestamps: true,
        collection: 'fieldsPermissions'
    }
);


module.exports = (app) => mongoose.model('fieldsPermissions', FieldsPermissionsSchema);