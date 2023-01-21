import { registerAs } from '@nestjs/config';

export default registerAs('query', () => ({
    paginationSize:  Number(process.env.QUERY_PAGINATION_SIZE)
}));