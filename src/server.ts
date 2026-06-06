import express from 'express';
import customerRoutes from './routes/customerRoutes';
import { errorHandler } from './middleware/errorHandler';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();

const swaggerDocument = YAML.load('./openapi.yaml');

app.use(express.json());
app.use('/customers', customerRoutes);

app.use(errorHandler);

app.get('/health', (_, res) => {
    res.json({
        status: 'UP'
    });    
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3001, () => {
    console.log('Server is running on port 3001');      

})




