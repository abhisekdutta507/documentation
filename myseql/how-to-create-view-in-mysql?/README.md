### How to create View in MySQL?

In MySQL, a view is a virtual table that is created by a query that combines the results of a SELECT statement.

#### Creating a view:

To create a view, you use the `CREATE VIEW` statement:

```sql
CREATE VIEW view_name AS
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

For example, to create a view that shows the names and salaries of employees earning more than ₹50,000, you would use:

```sql
CREATE VIEW high_earners AS
SELECT
  name,
  salary
FROM employees
  WHERE salary > 50000;
```

#### Using a view:

To query a view, we can use it just like any other table:

```sql
SELECT * FROM high_earners;
```

This would display the names and salaries of all employees earning more than ₹50,000.
