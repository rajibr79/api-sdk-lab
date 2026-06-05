import { Request, Response } from 'express';
import { CustomerService } from '../services/customerService';
import { error } from 'console';

const service = new CustomerService();

export class CustomerController {
    async create(
        req: Request,
        res: Response
    ) {
       try{

        const {
            firstName,
            lastName,
            email
        }  = req.body;

        if (!firstName || !lastName || !email) {
            return res.status(400).json({ message: 'firstname, Lastname and email are required' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }   
        

       const customer = await service.createCustomer(
            req.body.firstName,
            req.body.lastName,
            req.body.email
        );
        res.status(201).json(customer);
        } 
          catch (error: any ) {
            throw error;
          }
       /* 
        catch (error: any) {
            console.error(error);
            if (error.code === '23505') { // Unique violation
                return res.status(409).json({ message: 'Customer email already exists' });
            }
            res.status(500).json({ message: 'Internal server error' });

        }
            */
    }

        async getAll(
            req:Request,
            res: Response
        ) {
            const customers = await service.getAlllCustomers();
            res.json(customers);
        }

    async getById(
        req: Request <{id: string}>,
        res: Response
    ) {
        const customer = await service.getCustomerById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(customer);
    }

    async update(
        req: Request<{id: string}>,
        res: Response
    ) {
        const updatedCustomer = await service.updateCustomer(req.params.id, req.body);
        if (!updatedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(updatedCustomer);
    }

    async delete(
        req: Request<{id: string}>,
        res: Response
    ) {
        const deletedCustomer = await service.deleteCustomer(req.params.id);
        if (!deletedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(deletedCustomer);
    }
}