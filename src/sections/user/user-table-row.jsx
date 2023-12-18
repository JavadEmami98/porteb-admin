import { useState } from "react";
import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import Label from "src/components/label";
import Iconify from "src/components/iconify";

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  _id,
  avatarUrl,
  createdAt,
  isAdmin,
  phoneNumber,
  accountExpiryDate,
  status,
  handleClick,
  first_name,
  last_name,
  national_code,
}) {
  /*   const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  }; */

  return (
    <>
      <TableRow
        hover
        tabIndex={-1}
        sx={{ width: "100%" }}
        role="checkbox"
        selected={selected}
      >
        <TableCell padding="checkbox">
          {/*    <Checkbox disableRipple checked={selected} onChange={handleClick} /> */}
        </TableCell>
        <TableCell>{first_name}</TableCell>
        <TableCell>{last_name}</TableCell>
        <TableCell>{national_code}</TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            {/*  <Avatar alt={_id} src={avatarUrl} /> */}
            <Typography variant="subtitle2" noWrap>
              {_id}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{createdAt}</TableCell>

        <TableCell>{phoneNumber}</TableCell>

        <TableCell align="center">
          {accountExpiryDate ? accountExpiryDate : "-"}
        </TableCell>

        <TableCell align="center">
          {/*   <Label color={(status === "banned" && "error") || "success"}>
            {status} 7
          </Label> */}{" "}
          7
        </TableCell>

        <TableCell align="left">
          {isAdmin ? "ادمین" : "کاربر"}
          {/* <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton> */}
        </TableCell>
      </TableRow>

      {/* <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          ویرایش
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: "error.main" }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          حذف
        </MenuItem>
      </Popover> */}
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  createdAt: PropTypes.any,
  first_name: PropTypes.any,
  last_name: PropTypes.any,
  national_code: PropTypes.any,
  handleClick: PropTypes.func,
  updatedAt: PropTypes.any,
  _id: PropTypes.any,
  phoneNumber: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};
