import {v4 as uuidv4} from 'uuid';
import { CustomerRepository } from '../repositories/customerRepository';
import { Customer } from '../models/customer';

export class CustomerService {
    private repository = new CustomerRepository();

    async createCustomer(
        firstName: string,
        lastName: string,
        email: string
    ) {
        const customer = {
            id: uuidv4(),
            firstName,
            lastName,
            email
        };
        
        return await this.repository.create(customer);
    }   

    async getAlllCustomers() {
        return await this.repository.findAll();
    }

    async getCustomerById(id: string){
        return await this.repository.findById(id);
    }

    async updateCustomer(id: string, customer: Partial<Customer>) {
        return await this.repository.update(id, customer);
    }

    async deleteCustomer(id: string) {
        return await this.repository.delete(id);
    }
}
