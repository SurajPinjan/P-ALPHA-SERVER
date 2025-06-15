import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Clear existing roles if needed
  await knex("user_roles").del();

  // Insert a super admin role
  await knex("user_roles").insert([
    {
      uid: '1', // Use actual UUID or a generated one
      role_name: 'super_admin',
      createDate: new Date(),
      createBy: 'system', // or admin user ID
      updateDate: new Date(),
      updateBy: 'system',
      isDeleted: false,
    },
  ]);
}