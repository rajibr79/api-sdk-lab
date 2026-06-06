export function mapCustomer(customer: any) {

    return {
        id: customer.id,
        firstName: customer.first_name,
        lastName: customer.last_name,
        email: customer.email,
        createdAt: customer.created_at,
        updatedAt: customer.updated_at
    }
}