import { Link, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/LoadingSpinner";
import auth from "../../hooks/firebase.init";
import { BsDot } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";
import Logo from "../../components/Logo";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import DashboardHeader from "../../components/DashboardHeader";
import ScrollToTop from "../../components/ScrollToTop";
import defaultUserImage from "../../assets/images/defaultUser.png";
import dasboardMenus from "../../hooks/useDashboardMenu";
import DashboardFooter from "../../components/DashboardFooter";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);

  console.log(user)

  // set website title
  useWebsiteTitle("Bhojon | Dashboard");

  // console.log(userInfo)

  loading && <LoadingSpinner />;

  error &&
    Swal.fire({
      icon: "error",
      title: "Error",
      text: `${error}`,
    });

  return (
    <div data-theme="light">
      <div className="drawer drawer-mobile">
        <input id="sidebar" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <DashboardHeader />

          <div className="mx-2 mt-2 mb-10">
            <Outlet />
          </div>

          {/*    to top button */}
          <ScrollToTop />

          <div className="flex flex-col justify-end h-screen">
            {/* footer is always bottom */}
            <DashboardFooter />
          </div>
        </div>

        <div className="drawer-side w-72">
          <label htmlFor="sidebar" className="drawer-overlay"></label>
          <div className="flex flex-col justify-between bg-[#2c3136]">
            <div>
              <Logo customClass="flex gap-x-4 items-center justify-center text-2xl text-center text-stone-100 font-semibold uppercase p-4" />

              <div className="text-gray-50 border-t">
                <Link to="/user" className="flex gap-x-3 items-center p-4">
                  <img
                    alt="Default user"
                    src={user?.photoURL ? user?.photoURL : defaultUserImage}
                    className="h-16 w-16 rounded-full object-cover"
                  />

                  <div className="flex flex-col items-start gap-y-2">
                    <p className="flex items-center text-sm text-success">
                      {user?.displayName ? user?.displayName : "Default User"}{" "}
                      <BsDot className="text-xl" />
                    </p>
                    <p className="text-xs underline">
                      {" "}
                      {user?.email ? user?.email : "user@email.com"}{" "}
                    </p>
                  </div>
                </Link>
              </div>

              <nav
                aria-label="Main Nav"
                className="mt-6 p-2 flex flex-col space-y-1"
              >
                <>
                  {dasboardMenus?.map((sideMenu) =>
                    sideMenu?.subMenus ? (
                      <details className="group" key={sideMenu?.name}>
                        <summary className="flex cursor-pointer items-center px-4 py-2 text-gray-100 hover:bg-gray-100 hover:text-error focus:border-l-4 border-l-error">
                          {sideMenu?.icon}

                          <span className="ml-3 text-sm font-medium">
                            {" "}
                            {sideMenu?.name}{" "}
                          </span>

                          <span className="ml-auto shrink-0 transition duration-300 group-open:-rotate-180">
                            <IoIosArrowUp />
                          </span>
                        </summary>

                        <nav
                          aria-label="Teams Nav"
                          className="mt-1.5 ml-8 flex flex-col"
                        >
                          {sideMenu?.subMenus?.map((subMenu) =>
                            subMenu?.subSubMenus ? (
                              <details className="group" key={subMenu?.link}>
                                <summary className="flex cursor-pointer items-center px-4 py-2 text-gray-100 hover:bg-gray-100 hover:text-error focus:border-l-4 border-l-error">
                                  {subMenu?.icon}

                                  <span className="ml-3 text-sm font-medium">
                                    {" "}
                                    {subMenu?.name}{" "}
                                  </span>

                                  <span className="ml-auto shrink-0 transition duration-300 group-open:-rotate-180">
                                    <IoIosArrowUp />
                                  </span>
                                </summary>

                                <nav
                                  aria-label="Teams Nav"
                                  className="mt-1.5 ml-8 flex flex-col"
                                >
                                  {subMenu?.subSubMenus?.map((subSubMenu) => (
                                    <Link
                                      key={subSubMenu?.link}
                                      to={subSubMenu?.link}
                                      className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-100 hover:text-error focus:border-l-4 border-l-error"
                                    >
                                      {subSubMenu?.icon}

                                      <span className="ml-3 text-sm font-medium">
                                        {" "}
                                        {subSubMenu?.name}{" "}
                                      </span>
                                    </Link>
                                  ))}
                                </nav>
                              </details>
                            ) : (
                              <Link
                                key={subMenu?.link}
                                to={subMenu?.link}
                                className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-100 hover:text-error focus:border-l-4 border-l-error"
                              >
                                {subMenu?.icon}

                                <span className="ml-3 text-sm font-medium">
                                  {" "}
                                  {subMenu?.name}{" "}
                                </span>
                              </Link>
                            )
                          )}
                        </nav>
                      </details>
                    ) : (
                      <Link
                        key={sideMenu?.link}
                        to={sideMenu?.link}
                        className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-100 hover:text-error focus:border-l-4 border-l-error"
                      >
                        {sideMenu?.icon}

                        <span className="ml-3 text-sm font-medium">
                          {" "}
                          {sideMenu?.name}{" "}
                        </span>
                      </Link>
                    )
                  )}
                </>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
