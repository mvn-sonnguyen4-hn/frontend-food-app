import BlankLayout from "@app/components/layouts/BlankLayout/BlackLayout";
import NotFound from "@app/components/layouts/NotFound/NotFound";
import { autoLoginUser } from "@app/features/auth/auth";
import { useAppDispatch, useAppSelector } from "@app/redux/store";
import { RouteItemDef, RouteWrapperConfigDef } from "@app/types/routes.types";
import { ComponentType, ElementType, memo, useEffect } from "react";
import {
  Routes as Switch,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { PRIVATE_LIST, PUBLIC_LIST } from "./routes.config";

const DefaultLayout = BlankLayout;
function Routes() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const autoLoginPromise = async () => {
      const response = await dispatch(autoLoginUser());
      if (autoLoginUser.fulfilled.match(response)) {
        navigate("/");
      }
    };
    autoLoginPromise();
  }, []);
  const { isAuthenticated } = useAppSelector((state) => ({
    isAuthenticated: state.auth?.isAuthenticated,
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
      return <Navigate to="/login" />;
    }
    const Layout = layout ?? DefaultLayout;
    return (
      <Layout>
        <Component />
      </Layout>
    );
  };

  return (
    <Switch>
      <Route path="/" element={<Navigate replace to="/home" />} />

      {PRIVATE_LIST.map((route) =>
        routeWrapper(route, { isProtectedRoute: true })
      )}
      {PUBLIC_LIST.map((route) => routeWrapper(route))}
      <Route
        path="*"
        element={() => (
          <DefaultLayout>
            <NotFound />
          </DefaultLayout>
        )}
      />
    </Switch>
  );
}

export default memo(Routes);
