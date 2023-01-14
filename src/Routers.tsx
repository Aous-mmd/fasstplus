import React from 'react';
import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import routes from './routes';
import _ from 'lodash';
import { Loader } from './components';
import { Box } from '@mui/material';

const Routers = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Box height='100%' display='flex' justifyContent='center' alignItems='center' padding={6}>
                <Routes>
                    {routes.map((route, idx) => {
                        return (
                            route.element && (
                                <Route
                                    key={`${idx}${_.uniqueId()}`}
                                    path={route.path}
                                    element={<route.element />}
                                />
                            )
                        )
                    })}
                    <Route path="/" element={<Navigate to="dashboard" replace />} />
                    <Route path="*" element={<Navigate to="404" />} />
                </Routes>
            </Box>
        </Suspense>
    )
}

export default Routers