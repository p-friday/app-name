import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';

const Home = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const navigate = useNavigate();

    return (
        <>
            {cookies.user &&
                <>
                    <div className='homeBody'>
                        <TableContainer style={{ justifyContent: "center", justifyItems: "center", backgroundColor: "#1D3557" }} sx={{ width: "100%", height: "20%" }} component={Paper}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell style={{ backgroundColor: "#1D3557", color: "#F1FAEE", fontStyle: "bold", fontSize: "50px" }} align='center'>Welcome user!</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </>
            }
            {!cookies.user &&
                <>
                    {navigate("/")}
                </>
            }
        </>
    )
}

export default Home;