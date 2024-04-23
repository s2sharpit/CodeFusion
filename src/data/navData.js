import {
  MdOutlineAutoAwesomeMosaic,
  MdOutlineHome,
  MdOutlinePerson,
} from "react-icons/md";

export const navData = [
  {
    name: "Home",
    path: "/",
    icon: <MdOutlineHome />,
  },
  {
    name: "Projects",
    path: "/projects",
    icon: <MdOutlineAutoAwesomeMosaic />,
  },
  {
    name: "Devs",
    path: "/devs",
    icon: <MdOutlinePerson />,
  },
];
