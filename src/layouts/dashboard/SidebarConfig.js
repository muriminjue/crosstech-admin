// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "overview",
    path: "/app/dashboard",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "stock",
    path: "/app/stock",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "sales",
    path: "/app/sale",
    icon: getIcon("eva:shopping-bag-fill"),
  },
  {
    title: "blog",
    path: "/dashboard/blog",
    icon: getIcon("eva:file-text-fill"),
  },
  {
    title: "login",
    path: "/login",
    icon: getIcon("eva:lock-fill"),
  },
  {
    title: "register",
    path: "/register",
    icon: getIcon("eva:person-add-fill"),
  },
  {
    title: "Not found",
    path: "/404",
    icon: getIcon("eva:alert-triangle-fill"),
  },
];

export default sidebarConfig;
