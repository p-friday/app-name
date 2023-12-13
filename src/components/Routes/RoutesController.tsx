import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Start from '../Home/Start';


const RoutesController = () => {

    return (
        <>
            <Routes>
                <Route index element={<Start />} />
                <Route path='home/*' element={<Home />} />
            </Routes>
        </>
    )
}

export default RoutesController;