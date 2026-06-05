import { pool } from '../database';
import { Customer } from '../models/customer';

export class CustomerRepository {
    async create(customer: Customer) {
        const query = ` INSERT INTO customers 
        (
            id,
            first_name,
            last_name,
            email,
            created_at,
            updated_at
            )
            VALUES 
            (
                $1, $2, $3, $4, NOW(), NOW()
            )
                RETURNING *
            `;
    

    const result = await pool.query(
        query,
        [
            customer.id,
            customer.firstName,
            customer.lastName,
            customer.email
        ]
    );

    return result.rows[0];

    }

    async findAll() {
        const result = await pool.query(
            `SELECT * FROM customers`
        );
        return result.rows;
    }

    async findById(id: string) {
        const result = await pool.query(
            `SELECT * FROM customers WHERE id = $1`, 
            [id]
        );
        return result.rows[0];
    }

    async update(id: string, customer: Partial<Customer>) {

    const columnMap: Record<string, string> = {
        firstName: 'first_name',
        lastName: 'last_name',
        email: 'email'
    };

    const fields: string[] = [];
    const values: any[] = [];

    let index = 1;

    for (const key in customer) {
        const dbColumn = columnMap[key] || key;

        fields.push(`${dbColumn} = $${index}`);
        values.push((customer as any)[key]);

        index++;
    }

    fields.push('updated_at = CURRENT_TIMESTAMP');

    const query = `
        UPDATE customers
        SET ${fields.join(', ')}
        WHERE id = $${index}
        RETURNING *
    `;

    values.push(id);

    const result = await pool.query(query, values);

    return result.rows[0];
}

    async delete(id: string) {
        const result = 
        await pool.query(
            `DELETE FROM customers WHERE id = $1 RETURNING *`, 
            [id]
        );
        return result.rows[0];
        
    }


}