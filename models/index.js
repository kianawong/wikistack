const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false
});

const Page = db.define("page", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  status: {
    type: Sequelize.ENUM("open", "closed")
  }
});

Page.addHook("beforeValidate", page => {
  page.slug = page.title.replace(/\s+/g, `_`).replace(/\W/g, "");
  console.log("page:", page);


});



const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { isEmail: true }
  }
});


Page.belongsTo(User, { as: 'author' });


module.exports = {
  db,
  Page,
  User
};
