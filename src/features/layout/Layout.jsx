import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "./Navbar";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <div
        className={
          location?.pathname === "/" ? "page-container-fluid" : "page-container"
        }
      >
        <Suspense fallback={<SkeletonContentPage />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};
export default Layout;
