interface ModelAttributes {
  uid: number
  createDate?: Date
  createBy: string
  updateDate?: Date
  updateBy?: string
  isDeleted?: boolean
}

interface CronType {
  cron: string
  job: () => void
}

export { CronType, ModelAttributes }
