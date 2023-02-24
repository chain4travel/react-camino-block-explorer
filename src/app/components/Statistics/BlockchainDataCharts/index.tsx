import React, { Fragment, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { Status } from 'types';
import CircularProgress from '@mui/material/CircularProgress';
import LinearMeter from './LinearMeter';
import IconButton from '@mui/material/IconButton';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import useWidth from 'app/hooks/useWidth';
import 'react-datepicker/dist/react-datepicker.css';
import DateRange from '../DateRange/DateRange';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import styled from 'styled-components';
import { Grid } from '@mui/material';
import moment from 'moment';
import { typeBlockchainDataChart } from '../../../../utils/statistics/ChartSelector';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import { TextBlockchainDatachart } from '../../../../utils/statistics/TextBlockchainDatachart';


const TooltipContainer = styled.div`
  display: flex;
  padding-top: 2rem;
`;
const TooltipStyle = styled(Tooltip)`
  
`
const CardHeaderStyle = styled(CardHeader)`
  margin-bottom: 0rem;
  margin-left: 0.5rem;
`;

const LinearMeterContainer = styled.div`
  margin-top: -3rem;
`;
const DateRangeContainer = styled.div`
  margin-top: 2rem;
`;
const Text = styled.p`
  margin-left: 3rem !important;
  margin-right: 1rem !important;
  margin-top: 0.5rem !important;
  margin-bottom: 0.5rem !important;
  border-radius: 0.5rem;
  background: #0f172a;
  padding: 0.5rem;
`;

const BlockchainCharts = ({
  darkMode,
  titleText,
  utilSlice,
  sliceGetter,
  sliceGetterLoader,
  typeStatistic,
  tooltipTitle,
}) => {
  const { isDesktop } = useWidth();

  const [openModal, setOpenModal] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>(new Date());

  const { isTablet, isMobile, isSmallMobile } = useWidth();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (startDate != undefined && endDate != undefined) {
      dispatch(utilSlice({
        startDate: moment(startDate).toISOString(true),
        endDate: moment(endDate).toISOString(true)
      }));
    }
  }, [startDate, endDate])

  useEffect(() => {
    setStartDate(new Date(moment().startOf('month').format('YYYY-MM-DD HH:mm:ss')));
    setEndDate(new Date(moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')));
  }, []);

  const dataStatistics: any = useAppSelector(sliceGetter);
  const loader = useAppSelector(sliceGetterLoader);

  return (
    <Fragment>
      {loader === Status.LOADING ? (
        <>
          <div style={{ textAlign: 'center' }}>
            <CircularProgress color="secondary" />
          </div>
        </>
      ) : (
        <>
          <Modal
            open={openModal}
            onClose={e => {
              setOpenModal(false);
            }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            disableScrollLock={true}
          >
            <Box
              sx={{
                backgroundColor: 'transparent',
                borderRadius: '7px',
                padding: '1.5rem',
                minWidth: isDesktop ? '1500px' : '0px',
              }}
              style={{
                maxHeight: isSmallMobile ? 550 : '80%',
                overflowY: 'scroll'
              }}
            >
              <Card style={{ backgroundColor: darkMode ? '#060F24' : 'white' }}>
                <CardHeaderStyle
                  title={titleText}
                  action={
                    <IconButton
                      color="info"
                      component="label"
                      onClick={() => setOpenModal(false)}
                      style={{ cursor: 'default', color: 'white' }}
                    >
                      <Icon path={mdiClose} size={1} />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Fragment>
                    <Grid
                      container
                      spacing={2}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Grid xs={12}>
                        <Text>{tooltipTitle}</Text>
                      </Grid>
                      {
                        dataStatistics != null && dataStatistics != undefined && (
                          <TextBlockchainDatachart Text={Text} dataStatistics={dataStatistics} endDate={endDate} startDate={startDate} typeStatistic={typeStatistic} />
                        )
                      }
                    </Grid>
                    <DateRangeContainer>
                      <DateRange
                        initialStartDate={startDate}
                        InitianEndDate={endDate}
                        setEndDate={setEndDate}
                        setStartDate={setStartDate}
                        darkMode={darkMode}
                      />
                    </DateRangeContainer>

                    {dataStatistics !== undefined && dataStatistics !== null && (
                      <LinearMeterContainer style={{ marginTop: isTablet ? 20 : 0 }}>
                        <LinearMeter
                          darkMode={darkMode}
                          titleText={titleText}
                          data={dataStatistics}
                          typeStatistic={typeStatistic}

                        />
                      </LinearMeterContainer>
                    )}
                  </Fragment>
                </CardContent>
              </Card>
            </Box>
          </Modal>

          <Card style={{ backgroundColor: darkMode ? '#060F24' : 'white' }}>
            <CardHeaderStyle
              title={
                <span>
                  {titleText}
                  <TooltipStyle title={tooltipTitle} placement="top">
                    <IconButton>
                      <InfoIcon />
                    </IconButton>
                  </TooltipStyle>
                </span>
              }
              action={
                <TooltipContainer>
                  <IconButton
                    color="info"
                    component="label"
                    onClick={() => setOpenModal(true)}
                    style={{
                      cursor: 'default',
                      color: 'GrayText',
                    }}
                  >
                    <ArrowOutwardIcon />
                  </IconButton>
                </TooltipContainer>
              }
            />

            <CardContent>
              {dataStatistics !== undefined && dataStatistics !== null ? (
                <>
                  <LinearMeter
                    darkMode={darkMode}
                    titleText={titleText}
                    data={dataStatistics}
                    typeStatistic={typeStatistic}
                  />
                </>
              ) : null}
            </CardContent>
          </Card>
        </>
      )}
    </Fragment>
  );
};

export default BlockchainCharts;
