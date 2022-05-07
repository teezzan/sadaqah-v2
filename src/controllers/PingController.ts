import * as logger from '../utils/logger'

export async function pingAndGetOKResponse (req, res, next)  {
    logger.info('request received')

    res.send({ ping: 'OK' })

    logger.info('response sent')
    return next()
}
