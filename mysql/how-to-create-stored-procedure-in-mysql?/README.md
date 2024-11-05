### How to create Stored Procedure in MySQL?

A stored procedure in MySQL is a set of pre-compiled SQL statements that are stored in the database and can be executed as a single unit.

#### Example

Create a stored procedure named `get_payments` that should return the payments made by the clients using specific payment_method.

```sql
DROP PROCEDURE IF EXISTS get_payments;

DELIMITER $$
CREATE PROCEDURE get_payments(
	client_id INT,
  payment_method_id TINYINT
)
BEGIN
	SELECT * FROM sql_invoicing.payments p
	WHERE p.client_id = IFNULL(client_id, p.client_id) AND p.payment_method = IFNULL(payment_method_id, p.payment_method);
END$$

DELIMITER ;
```

Usage,

```sql
CALL get_payments(1, 1);
-- or
CALL get_payments(NULL, 1);
-- or
CALL get_payments(NULL, NULL);
-- or
CALL get_payments(5, NULL);
```
