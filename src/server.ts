import express from 'express';
import customerRoutes from './routes/customerRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());
app.use('/customers', customerRoutes);

app.use(errorHandler);

app.get('/health', (_, res) => {
    res.json({
        status: 'UP'
    });    
})

app.listen(3001, () => {
    console.log('Server is running on port 3001');      

})




