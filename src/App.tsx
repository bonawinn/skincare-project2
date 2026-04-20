import { AppStateProvider } from './lib/AppState';
import { RouterProvider, useRouter } from './lib/router';
import Masthead from './components/Masthead';
import Footer from './components/Footer';
import WelcomeWash from './components/WelcomeWash';
import CartDrawer from './components/CartDrawer';
import SearchOverlay from './components/SearchOverlay';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Brand from './pages/Brand';
import Community from './pages/Community';
import Account from './pages/Account';
import Quiz from './pages/Quiz';
import { Login, Register } from './pages/Auth';

function Router() {
  const { route } = useRouter();
  const path = route.path;

  if (path === '/' || path === '') return <Home />;
  if (path === '/shop') return <Shop />;
  if (path.startsWith('/shop/')) return <ProductDetail id={path.slice('/shop/'.length)} />;
  if (path === '/brand') return <Brand />;
  if (path === '/community') return <Community />;
  if (path === '/account') return <Account />;
  if (path === '/login') return <Login />;
  if (path === '/register') return <Register />;
  if (path === '/ritual/quiz' || path === '/ritual') return <Quiz />;

  return (
    <div className="min-h-[60vh] flex items-center justify-center text-sz-concrete-dark">
      page not found — <a href="#/" className="underline underline-offset-4 ml-1">go home</a>
    </div>
  );
}

function Shell() {
  const { route } = useRouter();
  const hideChrome = route.path === '/login' || route.path === '/register' || route.path.startsWith('/ritual');
  return (
    <>
      <WelcomeWash />
      {!hideChrome && <Masthead />}
      <Router />
      {!hideChrome && <Footer />}
      <CartDrawer />
      <SearchOverlay />
    </>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppStateProvider>
        <Shell />
      </AppStateProvider>
    </RouterProvider>
  );
}
