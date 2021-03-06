const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.json'))[env];
const db = {};

const sequelize = config.production
  ? new Sequelize(process.env[config.production], config)
  : new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.user = sequelize.import('Users.js');
db.presentations = sequelize.import('Presentations.js');
db.pdfs = sequelize.import('Pdfs.js');
db.slides = sequelize.import('Slides.js');
db.audio = sequelize.import('Audio.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
