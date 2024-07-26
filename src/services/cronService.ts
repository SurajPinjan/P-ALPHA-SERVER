import { CronType } from "../types/databaseTypes";

const testCron: CronType = {
    cron: '*/1 * * * *',
    job: () => {
        console.log('This is a test cron job')
    }
}

export { testCron }