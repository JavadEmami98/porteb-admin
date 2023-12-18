import { useEffect } from "react";
import PropTypes from "prop-types";
import { IoLogOutOutline } from "react-icons/io5";
import { ImCalendar } from "react-icons/im";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";

import { usePathname } from "src/routes/hooks";
import { RouterLink } from "src/routes/components";

import { useResponsive } from "src/hooks/use-responsive";

import { account } from "src/_mock/account";

import Logo from "src/components/logo";
import Scrollbar from "src/components/scrollbar";

import { NAV } from "./config-layout";
import navConfig from "./config-navigation";
import { MenuItem } from "@mui/material";
import Time from "src/components/Time/Time";
import Hijri from "src/components/Hijri/Hijri";
import { useDispatch } from "react-redux";
import { handleLogOut } from "src/redux/action";

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const dispatch = useDispatch();
  const handleLogOuts = () => {
    dispatch(handleLogOut());
  };
  const pathname = usePathname();

  const upLg = useResponsive("up", "lg");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: "flex",
        borderRadius: 1.5,
        alignItems: "center",
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={account.photoURL} alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{account.displayName}</Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {account.role}
        </Typography>
      </Box>
    </Box>
  );

  /*   const date = new Date().toLocaleString("fa-IR"); */

  const renderTime = (
    <>
      <Box sx={{ p: 3, display: "flex", alignItems: "center" }}>
        <Box
          component={ImCalendar}
          sx={{ width: "2rem", height: "2rem", color: "#676767" }}
        />
        <Box sx={{ display: "flex", flexDirection: "column", pl: "1.25rem" }}>
          <Hijri />
          <Time />
        </Box>
      </Box>
    </>
  );

  const renderMenu = (
    <Stack
      component="nav"
      spacing={0.5}
      sx={{
        px: 2,
        /* backgroundImage: "url('image/medical.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",

        backgroundSize: "cover", */
        /*   opacity: "0.2", */
      }}
    >
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  const renderUpgrade = (
    <Box>
      <Box
        sx={{
          px: 2.5,
          pb: 3,
          mt: 15,
        }}
      >
        {/*   <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
        <Box
          component="img"
          src="/assets/illustrations/illustration_avatar.png"
          sx={{ width: 100, position: 'absolute', top: -50 }}
        />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6">Get more?</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            cdsadasas
          </Typography>
        </Box>

        <Button
          href="https://material-ui.com/store/items/minimal-dashboard/"
          target="_blank"
          variant="contained"
          color="inherit"
        >
          Upgrade to Pro
        </Button>
      </Stack> */}
      </Box>
      <MenuItem
        onClick={handleLogOuts}
        sx={{
          typography: "body1",
          height: "fit-content",
          color: "error.main",
          mb: 20,
          py: 1.5,
        }}
      >
        <Box
          component={IoLogOutOutline}
          sx={{ mr: 1, width: "1.25rem", height: "1.25rem" }}
        />
        خروج
      </MenuItem>
    </Box>
  );

  const renderContent = (
    <>
      <Scrollbar
        sx={{
          height: 1,
          "& .simplebar-content": {
            height: 1,
            display: "flex",
            flexDirection: "column",
            backgroundImage: "url('image/aks222.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          },
        }}
      >
        <Logo sx={{ mt: 3, ml: 4 }} />

        {renderAccount}
        {renderTime}
        {renderMenu}

        <Box sx={{ flexGrow: 1 }} />

        {renderUpgrade}
      </Scrollbar>
    </>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: "fixed",
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function NavItem({ item }) {
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: "body2",
        color: "text.secondary",
        textTransform: "capitalize",
        fontWeight: "fontWeightMedium",
        ...(active && {
          color: "primary.main",
          fontWeight: "fontWeightSemiBold",
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          "&:hover": {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
