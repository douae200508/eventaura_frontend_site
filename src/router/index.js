import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Events from '../pages/Events.vue'
import Auth from '../pages/Auth.vue'
import Contact from '../pages/Contact.vue'
import Profile from '../pages/Profile.vue'
import MyEvents from '../pages/MyEvents.vue'
import MyTickets from '../pages/MyTickets.vue'
import MyServices from '../pages/MyServices.vue'
import Notifications from '../pages/Notifications.vue'
import CreateEvent from '../pages/CreateEvent.vue'
import CreateService from '../pages/CreateService.vue'
import EventDetails from '../pages/EventDetails.vue'
import Payment from '../pages/Payment.vue'
import PaymentSuccess from '../pages/PaymentSuccess.vue'
import ServiceProvider from '../pages/ServiceProvider.vue'
import ServiceDetails from '../pages/ServiceDetails.vue'
import Venue from '../pages/Venue.vue'
import VenueDetails from '../pages/VenueDetails.vue'
import OrganizerProfile from '../pages/OrganizerProfile.vue'
import ProviderProfile from '../pages/ProviderProfile.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/events',
    name: 'Events',
    component: Events
  },
  {
    path: '/events/:id',
    name: 'EventDetails',
    component: EventDetails
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
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
    path: '/organizer/:id',
    name: 'OrganizerProfile',
    component: OrganizerProfile
  },
  {
    path: '/provider/:id',
    name: 'ProviderProfile',
    component: ProviderProfile
  },
  {
    path: '/my-events',
    name: 'MyEvents',
    component: MyEvents
  },
  {
    path: '/my-tickets',
    name: 'MyTickets',
    component: MyTickets
  },
  {
    path: '/my-services',
    name: 'MyServices',
    component: MyServices
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: Notifications
  },
  {
    path: '/create-event',
    name: 'CreateEvent',
    component: CreateEvent
  },
  {
    path: '/create-service',
    name: 'CreateService',
    component: CreateService
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment
  },
  {
    path: '/payment-success',
    name: 'PaymentSuccess',
    component: PaymentSuccess
  },
  {
    path: '/service-provider',
    name: 'ServiceProvider',
    component: ServiceProvider
  },
  {
    path: '/service/:id',
    name: 'ServiceDetails',
    component: ServiceDetails
  },
  {
    path: '/venue',
    name: 'Venue',
    component: Venue
  },
  {
    path: '/venue/:id',
    name: 'VenueDetails',
    component: VenueDetails
  },
  {
  path: '/scan-ticket',
  name: 'ScanTicket',
  component: () => import('../pages/ScanTicket.vue')
},
{
  path: '/ticket/:id',
  name: 'TicketView',
  component: () => import('../pages/TicketView.vue')
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router