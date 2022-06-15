import { lazy } from 'react'

const PublicRoutes = [
  {
    path: '/',
    component: lazy(() => import('../../views/public.components/home/home')),
    exact: true,
    layout: 'CustomLayout',
    meta: {
      publicRoute: true,
    }
  },
  {
    path: '/terms-of-service',
    component: lazy(() => import('../../views/public.components/terms/terms')),
    exact: true,
    layout: 'CustomLayout',
    meta: {
      publicRoute: true,
    }
  },
  {
    path: '/privacy-policy',
    component: lazy(() => import('../../views/public.components/privacy/privacy')),
    exact: true,
    layout: 'CustomLayout',
    meta: {
      publicRoute: true,
    }
  },
  {
    path: '/page-not-found',
    component: lazy(() => import('../../views/pages/misc/Error')),
    exact: true,
    layout: 'BlankLayout',
    meta: {
      publicRoute: true,
    }
  }
]

export default PublicRoutes