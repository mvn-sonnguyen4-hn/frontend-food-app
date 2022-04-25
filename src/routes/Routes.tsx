import BlankLayout from '@app/components/layouts/BlankLayout/BlackLayout';
import NotFound from '@app/components/layouts/NotFound/NotFound';
import { autoLoginUser } from '@app/features/auth/auth';
import { useAppDispatch, useAppSelector } from '@app/redux/store';
import { RouteItemDef, RouteWrapperConfigDef } from '@app/types/routes.types';
import { ComponentType, ElementType, memo, useEffect, useState } from 'react';
import Modal from 'react-modal';
import {
  Routes as Switch,
  Route,
  Navigate,
  useNavigate
} from 'react-router-dom';
import { PRIVATE_LIST, PUBLIC_LIST } from './routes.config';

const DefaultLayout = BlankLayout;
function Routes() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const autoLoginPromise = async () => {
      await dispatch(autoLoginUser());
    };
    autoLoginPromise();
  }, []);
  const { isAuthenticated } = useAppSelector(state => ({
    isAuthenticated: state.auth?.isAuthenticated
  }));
  const routeWrapper = (
    { id, path, layout, component }: RouteItemDef,
    { isProtectedRoute }: RouteWrapperConfigDef | undefined = {}
  ) => (
    <Route
      key={id}
      path={path}
      element={renderRoute(
        component,
        isProtectedRoute as RouteWrapperConfigDef,
        layout as ElementType
      )}
    />
  );
  const renderRoute = (
    Component: ComponentType,
    isProtectedRoute: RouteWrapperConfigDef,
    layout: ElementType
  ) => {
    if (isProtectedRoute && !isAuthenticated) {
      setIsShowModal(true)
    }
    const Layout = layout ?? DefaultLayout;
    return (
      <Layout>
        <Component />
      </Layout>
    );
  };
  const [isShowModal, setIsShowModal] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Modal
        isOpen={isShowModal}
        onRequestClose={() => setIsShowModal(false)}
        shouldCloseOnOverlayClick
        style={{
          overlay: {
            background: 'rgba(0,0,0,0.6)',
            cursor: 'pointer'
          },
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            background: '#1F1D2B',
            width: '410px',
            border: 'none',
            borderRadius: '1rem',
            height: 'fit-content'
          }
        }}
      >
        <div className="text-center text-white py-5">
          <p>Bạn cần đăng nhập để vào trang này .</p>
          <button
            className="btn-primary py-2 w-[200px] mt-5"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </Modal>
      <Switch>
        <Route path="/" element={<Navigate replace to="/home" />} />

        {PRIVATE_LIST.map(route =>
          routeWrapper(route, { isProtectedRoute: true })
        )}
        {PUBLIC_LIST.map(route => routeWrapper(route))}
        <Route
          path="*"
          element={() => (
            <DefaultLayout>
              <NotFound />
            </DefaultLayout>
          )}
        />
      </Switch>
    </>
  );
}

export default memo(Routes);
