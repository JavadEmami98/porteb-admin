import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import { useEffect } from "react";
import Card from "@mui/material/Card";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Container, Stack, TablePagination } from "@mui/material";
import Scrollbar from "src/components/scrollbar";
import { CSVLink } from "react-csv";
import UserTableToolbar from "src/sections/user/user-table-toolbar";
import { applyFilter, getComparator } from "src/sections/user/utils";
import TableNoData from "src/sections/user/table-no-data";

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {row._id.length > 7 ? `...${row._id.slice(0, 7)}` : row._id}
        </TableCell>
        <TableCell align="center">
          {row.user.length > 7 ? `...${row.user.slice(0, 7)}` : row.user}
        </TableCell>
        <TableCell align="center">{row.reasone}</TableCell>
        <TableCell
          align="center"
          style={{
            color:
              row.status === "P"
                ? "orange"
                : row.status === "S"
                ? "green"
                : "red",
          }}
        >
          {row.status === "P"
            ? "در انتظار پرداخت"
            : row.status === "S"
            ? "پرداخت موفق"
            : "ناموفق"}
        </TableCell>
        <TableCell align="center">
          {new Intl.NumberFormat("en", { maximumFractionDigits: 2 }).format(
            row.amount
          )}
          تومان
        </TableCell>
        <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
          {new Date(row.created_at).toLocaleString("fa-IR")}
        </TableCell>
        {/*  <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
          {new Date(row.createdAt).toLocaleString("fa-IR")}
        </TableCell>
        <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
          {new Date(row.updatedAt).toLocaleString("fa-IR")}
        </TableCell> */}

        <TableCell align="right">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                اطلاعات کارت
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">شماره کارت</TableCell>
                    <TableCell align="center">شماره کارت هش شده</TableCell>
                    <TableCell align="center">تاریخ پاسخ بانک</TableCell>
                    <TableCell align="center">کارمزد</TableCell>
                    <TableCell align="center">درگاه</TableCell>
                  </TableRow>
                </TableHead>
                {/*   <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell align="center" component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell align="center">
                        {historyRow.customerId}
                      </TableCell>
                      <TableCell align="center">{historyRow.amount}</TableCell>
                      <TableCell align="center">{historyRow.amount}</TableCell>
                      <TableCell align="center">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                      <TableCell align="center">{historyRow.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody> */}
                <TableBody>
                  <TableRow>
                    <TableCell align="center">{row.cardnumber}</TableCell>
                    <TableCell align="center">
                      {row.cardhashpan && row.cardhashpan.length > 7
                        ? `...${row.cardhashpan.slice(0, 7)}`
                        : row.cardhashpan}
                    </TableCell>
                    <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                      {new Date(row.bankResponseTime).toLocaleString("fa-IR")}
                    </TableCell>
                    <TableCell align="center">{row.fee}</TableCell>
                    <TableCell align="center">
                      {row.gateway === 1
                        ? "زرین پال"
                        : row.gateway === 2
                        ? "پیپینگ"
                        : ""}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    reasone: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    bankResponseTime: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    gateway: PropTypes.number.isRequired,
    cardnumber: PropTypes.string.isRequired,
    cardhashpan: PropTypes.string.isRequired,
    fee_type: PropTypes.string.isRequired,
    fee: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    refid: PropTypes.string.isRequired,
    clientrefid: PropTypes.string.isRequired,
    /*   history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired, */
  }).isRequired,
};

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
  createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
];

export default function Transactions() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [dataList, setDataList] = useState([]);

  const [filterName, setFilterName] = useState("");
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [invoices, setInvoices] = useState({
    body: [],
    header: [
      "_id",
      "user",
      "reasone",
      "status",
      "amount",
      "created_at",
      "cardnumber",
      "cardhashpan",
      "bankResponseTime",
      "fee",
      "gateway",
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/transactions`,
          {
            headers: {
              Authorization: `Bearer ${userInfo?.token}`,
            },
          }
        );
        setInvoices({
          body: response.data,
          header: [
            "_id",
            "user",
            "reasone",
            "status",
            "amount",
            "created_at",
            "cardnumber",
            "cardhashpan",
            "bankResponseTime",
            "fee",
            "gateway",
          ],
        });

        setDataList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userInfo]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  const handleFilterByName = (event) => {
    const inputValue = event.target.value;
    setPage(0);
    setFilterName(inputValue);
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
        <Typography variant="h4">تراکنش ها</Typography>
        <Button
          variant="contained"
          sx={{ color: "#fff", "&:hover": { bgcolor: "#228B22" } }}
          /*   startIcon={<Iconify icon="eva:plus-fill" />} */
        >
          <CSVLink
            filename={new Date().toLocaleDateString("fa") + "خروجی  تراکنش ها"}
            data={invoices.body}
            headers={invoices.header}
          >
            دانلود فایل اکسل
          </CSVLink>
        </Button>
      </Stack>
      {dataList.length > 0 ? (
        <Card>
          <UserTableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            dataList={dataList}
          />
          <Scrollbar>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">آیدی</TableCell>
                    <TableCell align="center"> کاربر</TableCell>
                    <TableCell align="center">دلیل</TableCell>
                    <TableCell align="center">وضعیت</TableCell>
                    <TableCell align="center">مقدار </TableCell>
                    <TableCell align="center"> زمان پرداخت</TableCell>
                    {/*       <TableCell align="center">createdAt</TableCell>
                    <TableCell align="center">updatedAt</TableCell> */}
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <Row key={row.id} row={row} />
                    ))}
                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              sx={{ display: "flex", flexDirection: "row-reverse" }}
              page={page}
              labelRowsPerPage={"تعداد ردیف ها در صفحه :"}
              labelDisplayedRows={({ from, to, count }) =>
                `نمایش ردیف‌های ${from}-${to} از کل ${count}`
              }
              component="div"
              count={dataList.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[10, 15, 50]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Scrollbar>
        </Card>
      ) : (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "20px" }}>
            در حال دریافت اطلاعات...
          </Typography>
        </Box>
      )}
    </Container>
  );
}
