import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("table_u").del();

    // Inserts seed entries
    await knex("table_u").insert([
        { username: "name", passwordHash: "$2b$04$dGPmF1bu86gwlX/dX5lcsenm8HR5Y5zTT60FYpOtpa7CTxh9Qh9vm", urole: "admin", createBy: "Anonymous" }]);
};
