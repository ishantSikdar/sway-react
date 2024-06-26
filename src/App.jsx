import { Route, Routes, useLocation } from 'react-router-dom';
import NotFoundPage from './pages/others/NotFoundPage';
import { APP_ROUTES, ROUTE_ANY, ROUTE_LOGIN, ROUTE_SIGNUP } from './constants/routes';
import NavBar from './components/common/NavBar';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { lastVisitedRouteAtom } from './recoil/atoms/routeAtoms';
import TimerOverlay from './components/common/TimerOverlay';
import TopBar from './components/common/TopBar';
import { screenWidthAtom } from './recoil/atoms/appAtoms';
import DesktopWarning from './components/common/DesktopWarning';
import SplashLoader from './components/common/SplashLoader';

function App() {
  const location = useLocation();
  const [lastVisitedRoutes, setLastVisitedRoutes] = useRecoilState(lastVisitedRouteAtom);
  const screenWidth = useRecoilValue(screenWidthAtom);

  const outsideAppRoutes = [ROUTE_SIGNUP, ROUTE_LOGIN];
  const insideApp = !outsideAppRoutes.includes(location.pathname);

  // updates the track of last visited routes in a Map
  useEffect(() => {
    const currentRoute = `${location.pathname}${location.search}`;
    const routeKeys = Object.keys(lastVisitedRoutes);

    routeKeys.forEach((route) => {
      if (currentRoute.startsWith(route)) {
        setLastVisitedRoutes((prevRoutes) => ({
          ...prevRoutes,
          [route]: currentRoute
        }));
      }
    });

  }, [location.pathname, location.search]);

  return (
    <div className='font-mukta bg-black text-white'>
      {insideApp && <TopBar />}
      <Routes>
        {APP_ROUTES.map((route) => (
          <Route path={route.path} element={<route.element />} key={route.id} />
        ))}
        <Route path={ROUTE_ANY} element={<NotFoundPage />} />
      </Routes>
      {insideApp && <NavBar />}
      {insideApp && <TimerOverlay />}
      {screenWidth > 450 && <DesktopWarning />}
      <SplashLoader />
    </div>
  )
}

export default App;