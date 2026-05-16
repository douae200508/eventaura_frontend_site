import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Auth from '../pages/Auth.vue'
import Events from '../pages/Events.vue'
import ServiceProvider from '../pages/ServiceProvider.vue'
import Venue from '../pages/Venue.vue'
import Contact from '../pages/Contact.vue'
import CreateEvent from '../pages/CreateEvent.vue'
import CreateService from '../pages/CreateService.vue'
import MyEvents from '../pages/MyEvents.vue'
import MyServices from '../pages/MyServices.vue'
import MyTickets from '../pages/MyTickets.vue'
import Ticket from '../pages/Ticket.vue'
import Payment from '../pages/Payment.vue'
import Profile from '../pages/Profile.vue'
import Notifications from '../pages/Notifications.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/events',
    name: 'Events',
    component: Events
  },
  {
    path: '/service-provider',
    name: 'ServiceProvider',
    component: ServiceProvider
  },
  {
    path: '/venue',
    name: 'Venue',
    component: Venue
  },

  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: Notifications
  },
  // Redirection pour /service
  {
    path: '/service',
    redirect: '/service-provider'
  },
  // Événements
  {
    path: '/create-event',
    name: 'CreateEvent',
    component: CreateEvent
  },
  {
    path: '/my-events',
    name: 'MyEvents',
    component: MyEvents
  },
  // Services
  {
    path: '/create-service',
    name: 'CreateService',
    component: CreateService
  },
  {
    path: '/my-services',
    name: 'MyServices',
    component: MyServices
  },
  // Tickets et Paiement
  {
    path: '/tickets/:id',
    name: 'Ticket',
    component: Ticket
  },
  {
    path: '/my-tickets',
    name: 'MyTickets',
    component: MyTickets
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment
  }, {
  path: '/service/:id',
  name: 'ServiceDetails',
  component: () => import('../pages/ServiceDetails.vue')
},
{
  path: '/events/:id',
  name: 'EventDetails',
  component: () => import('../pages/EventDetails.vue')
},
{
  path: '/venue/:id',
  name: 'VenueDetails',
  component: () => import('../pages/VenueDetails.vue')
},


]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router