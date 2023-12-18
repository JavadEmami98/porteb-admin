import { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import { users } from "src/_mock/user";

import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";
import "moment/locale/fa";

import TableNoData from "../table-no-data";
import UserTableRow from "../user-table-row";
import UserTableHead from "../user-table-head";
import TableEmptyRows from "../table-empty-rows";
import UserTableToolbar from "../user-table-toolbar";
import { emptyRows, applyFilter, getComparator } from "../utils";
import { useSelector } from "react-redux";
import axios from "axios";
import { CSVLink } from "react-csv";
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

export default function UserPage() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [dataList, setDataList] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [invoices, setInvoices] = useState({
    body: [],
    header: [
      "first_name",
      "last_name",
      "national_code",
      "_id",
      "createdAt",
      "phoneNumber",
      "accountExpiryDate",
      "status",
      "isAdmin",
    ],
  });

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dataList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/all`,
          {
            headers: {
              Authorization: `Bearer ${userInfo?.token}`,
            },
          }
        );

        setInvoices({
          body: response.data,
          header: [
            "first_name",
            "last_name",
            "national_code",
            "_id",
            "createdAt",
            "phoneNumber",
            "accountExpiryDate",
            "status",
            "isAdmin",
          ],
        });

        setDataList(response.data);
        /* setLoadingChart(false); */
      } catch (error) {
        console.error("Error fetching data:", error);
        /*         setLoadingChart(false); */
      }
    };

    fetchData();
  }, [userInfo]);

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  /*  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  }; */

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: dataList,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">کاربران</Typography>

        <Button
          variant="contained"
          sx={{ color: "#fff", "&:hover": { bgcolor: "#228B22" } }}
          /*   startIcon={<Iconify icon="eva:plus-fill" />} */
        >
          <CSVLink
            filename={new Date().toLocaleDateString("fa") + "خروجی  کاربران"}
            data={invoices.body}
            headers={invoices.header}
          >
            خروجی اکسل
          </CSVLink>
        </Button>
      </Stack>
   {dataList.length > 0 ? (
<>
      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          dataList={dataList}
        />
     
        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: "first_name ", label: "نام" },
                  { id: "last_name", label: "نام خانوادگی" },
                  { id: "national_code ", label: "کد ملی" },
                  { id: "_id", label: "آیدی" },
                  { id: "createdAt", label: "زمان ساخت اکانت" },
                  { id: "phoneNumber", label: "شماره همراه" },

                  {
                    id: "accountExpiryDate",
                    label: "تاریخ پایان اشتراک",
                    align: "center",
                  },
                  { id: "status", label: "تعداد بیماران" },
                  { id: "isAdmin", label: "نقش" },
                  /*   { id: "",label:"" }, */
                ]}
              />
              <TableBody>
                {dataList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      phoneNumber={row.phoneNumber}
                      first_name={row.first_name}
                      last_name={row.last_name}
                      national_code={row.national_code}
                      _id={row._id}
                      /*   status={row.status} */
                      createdAt={new Date(row.createdAt).toLocaleString(
                        "fa-IR"
                      )}
                      avatarUrl={row.avatarUrl}
                      accountExpiryDate={
                        row.accountExpiryDate
                          ? new Date(row.accountExpiryDate).toLocaleString(
                              "fa-IR"
                            )
                          : "-"
                      }
                      isAdmin={row.isAdmin}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                {/*  <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                /> */}

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
         <TablePagination
          sx={{ display: "flex", flexDirection: "row-reverse" }}
          page={page}
          labelRowsPerPage={"تعداد ردیف ها در صفحه :"}
          labelDisplayedRows={({ from, to, count }) => `نمایش ردیف‌های ${from}-${to} از کل ${count}`}
          component="div"
          count={dataList.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> 
       
      
      </Card></>  ) : (
      <Box sx={{display:"flex",height:"100%",width:"100%",justifyContent:"center",alignItems:"center"}}>
        <Typography sx={{fontSize:"20px"}}>در حال دریافت اطلاعات...</Typography>
        </Box>
      )}
    </Container>
  );
}
