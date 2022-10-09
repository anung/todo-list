"use strict";
const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    let newData = [];
    for (let i = 0; i < 1000; i++) {
      let data = {
        activity_group_id: 1,
        title: faker.name.fullName(),
        is_active: true,
        priority: "very-high",
        created_at: new Date(),
        updated_at: new Date(),
      };
      newData.push(data);
    }
    await queryInterface.bulkInsert("todos", newData, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("todos", null, {});
  },
};
