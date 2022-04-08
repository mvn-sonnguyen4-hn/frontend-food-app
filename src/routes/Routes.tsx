import BlankLayout from "@app/components/layouts/BlankLayout/BlackLayout";
import NotFound from "@app/components/layouts/NotFound/NotFound";
import { useAppSelector } from "@app/redux/store";
import { RouteItemDef, RouteWrapperConfigDef } from "@app/types/routes.types";
import { ComponentType, ElementType, memo } from "react";
import { Routes as Switch, Route, Navigate } from "react-router-dom";
import { PRIVATE_LIST, PUBLIC_LIST } from "./routes.config";

const DefaultLayout = BlankLayout;
const Routes = () => {
  const { isAuthenticated } = useAppSelector((state) => ({
    isAuthenticated: state.auth?.isAuthenticated,
  }));
  const routeWrapper = (
    { id, path, layout, component }: RouteItemDef,
    { isProtectedRoute }: RouteWrapperConfigDef | undefined = {}
  ) => {
    return (
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
  };
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

      {PRIVATE_LIST.map((route) => routeWrapper(route,{isProtectedRoute:true}))}
      {PUBLIC_LIST.map((route) => routeWrapper(route))}
      <Route
        path="*"
        element={() => (
          <DefaultLayout>
            <NotFound />
          </DefaultLayout>
        )}
      ></Route>
    </Switch>
  );
};

export default memo(Routes);
