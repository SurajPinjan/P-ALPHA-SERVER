// Define types for comparison operators
type ComparisonOperator = '=' | '>' | '>=' | '<' | '<=' | '!=' | 'IN' | 'BETWEEN' | 'LIKE'

// Define a type for logical operators
type LogicalOperator = 'AND' | 'OR'

// Define a type for filter value which can be a string, number, date, boolean, or an array of these
type FilterValue = string | number | Date | boolean | FilterValue[]

// Define an interface for a simple filter condition
interface SimpleFilter {
  column_name: string
  operator: ComparisonOperator
  value: FilterValue
}

// Define an interface for nested filter conditions
interface NestedFilter {
  [key: string]: Filter[]
}

// Define a union type for both simple and nested filter conditions
type Filter = SimpleFilter | NestedFilter

export { ComparisonOperator, LogicalOperator, FilterValue, SimpleFilter, NestedFilter, Filter }
