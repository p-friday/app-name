import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Start from '../Home/Start';
import Plans from '../Plans/plans';
import Header from '../Header/Header';


const RoutesController = () => {

    return (
        <>
            <Routes>
                <Route index element={<Start />} />
                <Route path='home/*' element={<Home />} />
                <Route path='plans/*' element={<Plans />} />
                <Route path='header/*' element={<Header />} />
            </Routes>
        </>
    )
}

export default RoutesController;