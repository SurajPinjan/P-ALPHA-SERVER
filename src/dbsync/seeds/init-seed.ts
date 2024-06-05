import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('table_u').del()

  // Inserts seed entries
  await knex('table_u').insert([
    {
      username: 'admin',
      passwordHash: '$2b$04$dGPmF1bu86gwlX/dX5lcsenm8HR5Y5zTT60FYpOtpa7CTxh9Qh9vm',
      urole: 'admin',
      createBy: 'Anonymous',
    },
    {
      username: 'opearator',
      passwordHash: '$2b$04$dGPmF1bu86gwlX/dX5lcsenm8HR5Y5zTT60FYpOtpa7CTxh9Qh9vm',
      urole: 'operator',
      createBy: 'Anonymous',
    },
  ])

  await knex('table_master').insert([
    {
      master: 'VALUE1',
      isDeleted: false,
      createBy: 'Anonymous',
    },
    {
      master: 'VALUE2',
      isDeleted: false,
      createBy: 'Anonymous',
    },
  ])

  await knex("permissions").insert([
    {
      permission: "Problem",
      perm_type: "Menu",
      isDeleted: false,
    },
    {
      permission: "Dashboard",
      perm_type: "Menu",
      isDeleted: false,
    },
    {
      permission: "Project",
      perm_type: "Menu",
      isDeleted: false,
    },
    {
      permission: "Training",
      perm_type: "Menu",
      isDeleted: false,
    },
    {
      permission: "Admin",
      perm_type: "Menu",
      isDeleted: false,
    },
    {
      permission: "Report",
      perm_type: "Menu",
      isDeleted: false,
    },
    {
      permission: "View_Problem",
      perm_type: "Problem",
      isDeleted: false,
    },
    {
      permission: "Create_Problem",
      perm_type: "Problem",
      isDeleted: false,
    },
    {
      permission: "Update_Problem",
      perm_type: "Problem",
      isDeleted: false,
    },
    {
      permission: "Count_Cards",
      perm_type: "Dashboard",
      isDeleted: false,
    },
    {
      permission: "Banner",
      perm_type: "Dashboard",
      isDeleted: false,
    },
    {
      permission: "Info_Cards",
      perm_type: "Dashboard",
      isDeleted: false,
    },
    {
      permission: "View_Project",
      perm_type: "Project",
      isDeleted: false,
    },
    {
      permission: "Edit_Project",
      perm_type: "Project",
      isDeleted: false,
    },
    {
      permission: "View_Details",
      perm_type: "Project",
      isDeleted: false,
    },
    {
      permission: "View_Training",
      perm_type: "Training",
      isDeleted: false,
    },
    {
      permission: "Configs",
      perm_type: "Admin",
      isDeleted: false,
    },
    {
      permission: "Progress_Report",
      perm_type: "Report",
      isDeleted: false,
    },
    {
      permission: "DMIAC_Report",
      perm_type: "Report",
      isDeleted: false,
    },
    {
      permission: "Saving_Report",
      perm_type: "Report",
      isDeleted: false,
    },
    {
      permission: "Define",
      perm_type: "Charter",
      isDeleted: false,
    },
    {
      permission: "Measure",
      perm_type: "Charter",
      isDeleted: false,
    },
    {
      permission: "Analyze",
      perm_type: "Charter",
      isDeleted: false,
    },
    {
      permission: "Improve",
      perm_type: "Charter",
      isDeleted: false,
    },
    {
      permission: "Control",
      perm_type: "Charter",
      isDeleted: false,
    },
    {
      permission: "View_Anecdote",
      perm_type: "Anecdote",
      isDeleted: false,
    },
    {
      permission: "Team",
      perm_type: "Define",
      isDeleted: false,
    },
    {
      permission: "Upload_Files",
      perm_type: "Define",
      isDeleted: false,
    },
    {
      permission: "Project_Schedule",
      perm_type: "Define",
      isDeleted: false,
    },
    {
      permission: "Process_Audit_Create",
      perm_type: "Measure",
      isDeleted: false,
    },
    {
      permission: "Process_Audit_Update",
      perm_type: "Measure",
      isDeleted: false,
    },
    {
      permission: "Process_Audit_Delete",
      perm_type: "Measure",
      isDeleted: false,
    },
    {
      permission: "Machine_Audit_Create",
      perm_type: "Measure",
      isDeleted: false,
    },
    {
      permission: "Machine_Audit_Update",
      perm_type: "Measure",
      isDeleted: false,
    },
    {
      permission: "Machine_Audit_Delete",
      perm_type: "Measure",
      isDeleted: false,
    },
    {
      permission: "Rejection_Graph_Create",
      perm_type: "Measure",
      isDeleted: false,
    },
    {
      permission: "Rejection_Graph_Update",
      perm_type: "Measure",
      isDeleted: false,
    },
    {
      permission: "Rejection_Graph_Delete",
      perm_type: "Measure",
      isDeleted: false,
    },
    {
      permission: "SSV_Create",
      perm_type: "Measure",
      isDeleted: false,
    },
    {
      permission: "SSV_Update",
      perm_type: "Measure",
      isDeleted: false,
    },
    {
      permission: "SSV_Delete",
      perm_type: "Measure",
      isDeleted: false,
    },
    {
      permission: "SSV_Confirmation_Create",
      perm_type: "Analysis",
      isDeleted: false,
    },
    {
      permission: "SSV_Confirmation_Update",
      perm_type: "Analysis",
      isDeleted: false,
    },
    {
      permission: "SSV_Confirmation_Delete",
      perm_type: "Analysis",
      isDeleted: false,
    },
    {
      permission: "Tools_Create",
      perm_type: "Analysis",
      isDeleted: false,
    },
    {
      permission: "Tools_Update",
      perm_type: "Analysis",
      isDeleted: false,
    },
    {
      permission: "Tools_Delete",
      perm_type: "Analysis",
      isDeleted: false,
    },
    {
      permission: "Action_Plan_Create",
      perm_type: "Improve",
      isDeleted: false,
    },
    {
      permission: "Action_Plan_Update",
      perm_type: "Improve",
      isDeleted: false,
    },
    {
      permission: "Action_Plan_Delete",
      perm_type: "Improve",
      isDeleted: false,
    },
    {
      permission: "Control_Measure_Create",
      perm_type: "Control",
      isDeleted: false,
    },
    {
      permission: "Control_Measure_Update",
      perm_type: "Control",
      isDeleted: false,
    },
    {
      permission: "Control_Measure_Delete",
      perm_type: "Control",
      isDeleted: false,
    },
    {
      permission: "Acutals",
      perm_type: "Control",
      isDeleted: false,
    },
    {
      permission: "Effective_Tracking",
      perm_type: "Control",
      isDeleted: false,
    },
    {
      permission: "TM_Create",
      perm_type: "Team",
      isDeleted: false,
    },
    {
      permission: "TM_Update",
      perm_type: "Team",
      isDeleted: false,
    },
    {
      permission: "TM_Delete",
      perm_type: "Team",
      isDeleted: false,
    },
    {
      permission: "Sci_Reason",
      perm_type: "Upload_File",
      isDeleted: true
    },
    {
      permission: "Problem_Detection",
      perm_type: "Upload_File",
      isDeleted: false,
    },
    {
      permission: "Schedule",
      perm_type: "Project_Schedule",
      isDeleted: false,
    },
    {
      permission: "Counts",
      perm_type: "Project_Schedule",
      isDeleted: false,
    },
    {
      permission: "Project_Review_Create",
      perm_type: "Project_Schedule",
      isDeleted: false,
    },
    {
      permission: "Project_Review_Update",
      perm_type: "Project_Schedule",
      isDeleted: false,
    },
    {
      permission: "Project_Review_Delete",
      perm_type: "Project_Schedule",
      isDeleted: false,
    },
    {
      permission: "Action_Points_Create",
      perm_type: "Project_Schedule",
      isDeleted: false,
    },
    {
      permission: "Action_Points_Update",
      perm_type: "Project_Schedule",
      isDeleted: false,
    },
    {
      permission: "Action_Points_Delete",
      perm_type: "Project_Schedule",
      isDeleted: false,
    }
  ]);
}
