import PagesRoutes from './Pages'
import PublicRoutes from './Public';
import ProtectedRoutes from './Protected';

const TemplateTitle = 'JSONONE'
const DefaultRoute = '/'

const Routes = [
  ...PagesRoutes,
  ...PublicRoutes,
  ...ProtectedRoutes,
]

export { DefaultRoute, TemplateTitle, Routes }
