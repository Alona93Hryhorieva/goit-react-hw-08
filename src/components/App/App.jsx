import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
// import Layout from "./Layout/Layout";
// import { refreshUser } from "../redux/auth/operations";
// import { selectIsRefreshing } from "../redux/auth/selectors";
// import RestrictedRoute from "./RestrictedRoute";
// import PrivateRoute from "./PrivateRoute";

const ContactsPage = lazy(
  () => import("../../pages/ContactsPage/ContactsPage")
);
const RegistrationPage = lazy(
  () => import("../../pages/RegistrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));

export default function App() {
  const dispatch = useDispatch();
  // const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <div>Refreshing user please wait...</div>
  ) : (
    <Layout>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                component={<RegistrationPage />}
                redirectTo="/contacts"
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                component={<LoginPage />}
                redirectTo="/contacts"
              />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute component={<ContactsPage />} redirectTo="/login" />
            }
          />
        </Routes>
      </Suspense>
    </Layout>
  );
}
