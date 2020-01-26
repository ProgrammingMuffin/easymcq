const Sequelize = require('sequelize');

module.exports = (orm) => {
    //Answer DB model
    return orm.define('QuestionPool', {
        
}, {
    freezeTableName: true, //otherwise table names will be made plural
    timestamps: false //createdat field
})
}