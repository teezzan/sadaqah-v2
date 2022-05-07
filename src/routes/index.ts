import { Server } from 'restify'
import pingRoute from './pingRoute'

const Route = (server: Server) => {
    pingRoute(server)
}

export default Route