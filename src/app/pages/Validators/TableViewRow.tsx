import * as React from 'react'
import { TableRow, TableCell, Chip, Typography, Box } from '@mui/material'
import { Field } from 'app/components/DetailsField'
import { ValidatorType } from 'types/store'
import moment from 'utils/helpers/moment'
import Tooltip from '@mui/material/Tooltip'
import CopyButton from './../../components/CopyToClipboardButton'
import useFeatureFlags from '../../../context/featureFlagProvider'

export const TableViewRow = ({ validator }: { validator: ValidatorType }) => {
    const { checkNodeVersionFlag } = useFeatureFlags()

    const formatUptime = React.useCallback(
        (uptime: string) => {
            if (checkNodeVersionFlag) {
                // debugger
                // Format base on version: v0.4.10-rc1
                // TODO Remove Feature flag when no longer needed
                const value = checkNodeVersionFlag('0.4.10-rc3')
                    ? Math.round(parseFloat(uptime)) + ' %'
                    : Math.round(parseFloat(uptime) * 100) + ' %'

                return value
            }
        },
        [checkNodeVersionFlag],
    )

    return (
        <TableRow>
            <TableCell align="left" sx={{ maxWidth: { xs: '10px', md: '100px', lg: '80px' } }}>
                <Chip
                    label={validator.status}
                    style={{ width: 100, maxWidth: 100 }}
                    sx={{
                        borderRadius: '7px',
                        color: 'grey.900',
                        backgroundColor:
                            validator.status === 'Connected' ? 'success.main' : 'error.main',
                    }}
                    data-cy="validator-status"
                />
            </TableCell>
            <TableCell sx={{ maxWidth: { xs: '10px', md: '80px', lg: '165px' } }} align="center">
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                    <Typography
                        variant="body2"
                        component="span"
                        noWrap={true}
                        fontWeight="fontWeightRegular"
                        sx={{ width: '100%', display: 'block' }}
                        data-cy="nodeId"
                    >
                        {validator.nodeID}
                    </Typography>
                    <CopyButton value={validator.nodeID} bordered={false} />
                </Box>
            </TableCell>
            <TableCell align="center">
                <Tooltip
                    title={
                        'Days since validator start:' +
                        moment(validator.startTime).fromNow().replace(' ago', '')
                    }
                >
                    <span data-cy="startTime" style={{ cursor: 'pointer' }}>
                        {moment(validator.startTime).format('MMM D, YYYY')}
                    </span>
                </Tooltip>
            </TableCell>
            <TableCell align="center">
                <Tooltip
                    title={
                        'Days until validator stops:' +
                        moment(validator.endTime).fromNow().replace('in ', '')
                    }
                >
                    <span data-cy="endTime" style={{ cursor: 'pointer' }}>
                        {moment(validator.endTime).format('MMM D, YYYY')}
                    </span>
                </Tooltip>
            </TableCell>
            <TableCell align="center">
                <Field dataCy="uptime" type="string" value={formatUptime(validator.uptime)} />
            </TableCell>
            <TableCell sx={{ maxWidth: { xs: '10px', md: '80px', lg: '165px' } }} align="center">
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                    <Typography
                        variant="body2"
                        component="span"
                        noWrap={true}
                        fontWeight="fontWeightRegular"
                        sx={{ width: '100%', display: 'block' }}
                        data-cy="txID"
                    >
                        {validator.txID}
                    </Typography>
                    <CopyButton value={validator.txID} bordered={false} />
                </Box>
            </TableCell>
        </TableRow>
    )
}
