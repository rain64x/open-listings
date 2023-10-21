import perPage from '../../config/options/perPage.js'
import { logger } from '../../utils.js'
import queries from '../services/external-apis/mongo-queries.js'
// eslint-disable-next-line no-unused-vars
import * as Types from '../../types.d.js'

/**
 * 
 * @param {Types.FastifyExtended} fastify 
 */
async function routes(fastify) {
    const { redis } = fastify
    const QInstance = new queries(redis, new logger(fastify).log)
    const queriesMethods = Object.getOwnPropertyNames(QInstance)
    queriesMethods.forEach((url) => {
        fastify.post(`/${url}`, async (request, reply) => {
            const { body } = request
            const params = body ? Object.values(body) : []
            const pagination = { perPage: perPage(), page: 1 }
            let res
            try {
                console.log(`calling /${url} with parameters ${JSON.stringify(params)}`)
                res = await QInstance[url](...params, pagination)
                reply.send({ url: url, data: res })
            } catch (error) {
                reply.send({ url: url, error: error })
            }
        })
    })
}

export default routes
