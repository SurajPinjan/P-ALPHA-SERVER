interface ReportEntity {
  url: string
  columnUText: string
  computedColumnA?: string
}

const setComputedColumnA = (report: ReportEntity): ReportEntity => {
  report.computedColumnA = 'unknown'
  return report
}

export { ReportEntity, setComputedColumnA }
