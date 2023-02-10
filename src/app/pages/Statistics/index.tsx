import React, { FC, useState, Fragment, useEffect } from 'react';
import SubPageTitle from 'app/components/SubPageTitle';
import PageContainer from 'app/components/PageContainer';
import { Paper, useTheme } from '@mui/material';
import {
    getDailyEmissions,
    getDailyEmissionsStatus,
    getNetworkEmissions,
    getNetworkEmissionsStatus,
    getTransactionsEmissions,
    getTransactionsEmissionsStatus,
    getCountryEmissions,
    getCountryEmissionsStatus
} from 'store/co2emissionsSlice';
import { loadDailyEmissions, loadNetworkEmissions, loadTransactionsEmissions } from 'store/co2emissionsSlice/utils';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CO2ConsumptionCharts from '../../components/Statistics/CO2ConsumptionCharts/index';
import { typesMeter } from './ChartSelector';
import { loadCountryEmissions } from '../../../store/co2emissionsSlice/utils';

const Statistics: FC = () => {
    const theme = useTheme();
    const dark = theme.palette.mode === 'light' ? false : true;

    return (
        <PageContainer pageTitle="Statistics" metaContent="statistics">
            <Paper
                variant="outlined"
                square
                sx={{
                    minHeight: '544px',
                    width: 1,
                    backgroundColor: 'primary.dark',
                    borderRadius: '12px',
                    borderWidth: '1px',
                    borderColor: 'primary.light',
                    borderStyle: 'solid',
                    p: '1rem 1.5rem 1rem 1.5rem',
                }}
            >
                <SubPageTitle
                    title="CO2 Emissions"
                    style={{ marginBottom: '20px' }}
                    hiddenBackButton={true}
                />
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item md={6} xs={12}>
                            <CO2ConsumptionCharts
                                typeMeter={typesMeter.BAR}
                                darkMode={dark}
                                utilSlice={(dates) => loadDailyEmissions(dates)}
                                sliceGetter={getDailyEmissions}
                                sliceGetterLoader={getDailyEmissionsStatus}
                                titleText="Daily Emissions"
                            />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <CO2ConsumptionCharts
                                typeMeter={typesMeter.TIME_SERIES}
                                darkMode={dark}
                                utilSlice={(dates) => loadNetworkEmissions(dates)}
                                sliceGetter={getNetworkEmissions}
                                sliceGetterLoader={getNetworkEmissionsStatus}
                                titleText="Network Emissions"
                            />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <CO2ConsumptionCharts
                                typeMeter={typesMeter.TIME_SERIES}
                                darkMode={dark}
                                utilSlice={(dates) => loadTransactionsEmissions(dates)}
                                sliceGetter={getTransactionsEmissions}
                                sliceGetterLoader={getTransactionsEmissionsStatus}
                                titleText="Network Emissions Per Transaction"
                            />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <CO2ConsumptionCharts
                                typeMeter={typesMeter.COUNTRIES_BAR}
                                darkMode={dark}
                                utilSlice={(dates) => loadCountryEmissions(dates)}
                                sliceGetter={getCountryEmissions}
                                sliceGetterLoader={getCountryEmissionsStatus}
                                titleText="Country Emissions"
                            />
                        </Grid>

                    </Grid>
                </Box>
            </Paper>

        </PageContainer>
    );
};

export default Statistics;
