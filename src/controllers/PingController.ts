import * as logger from '../utils/logger'

const pingAndGetOKResponse = async(req, res, next) => {
    logger.info('request received')

    res.send({ ping: 'OK' })

    logger.info('response sent')
    return next()
}

export default {pingAndGetOKResponse}