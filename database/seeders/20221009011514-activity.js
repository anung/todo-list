"use strict";
const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    let newData = [];
    for (let i = 0; i < 1000; i++) {
      let data = {
        title: faker.name.fullName(),
        email: faker.internet.email(),
        created_at: new Date(),
        updated_at: new Date(),
      };
      newData.push(data);
    }
    await queryInterface.bulkInsert("activities", newData, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("activities", null, {});
  },
};
