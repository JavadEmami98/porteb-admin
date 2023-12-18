import SvgColor from "src/components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "داشبورد",
    path: "/",
    icon: icon("ic_analytics"),
  },
  {
    title: "کاربران",
    path: "/user",
    icon: icon("ic_user"),
  },
  {
    title: "تراکنش ها",
    path: "/transactions",
    icon: icon("ic_cart"),
  },
  {
    title: "لاگ ها",
    path: "/blog",
    icon: icon("ic_blog"),
  },
  {
    title: "طرح ها",
    path: "/login",
    icon: icon("ic_lock"),
  },
];

export default navConfig;
