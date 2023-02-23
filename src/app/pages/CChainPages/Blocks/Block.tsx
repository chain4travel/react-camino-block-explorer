import React from 'react'
import { Grid, TableCell, TableRow, Typography } from '@mui/material'
import { Field } from 'app/components/DetailsField'
import { BlockTableData } from 'types/block'
import useWidth from 'app/hooks/useWidth'
import AddressLink from 'app/components/AddressLink'
import FilledCard from 'app/components/FilledCard'
import { CBLOCKS } from 'utils/route-paths'
import moment from 'moment'

interface BlockProps {
    block: BlockTableData
}

const Block = React.forwardRef<HTMLTableRowElement, BlockProps>((props, ref) => {
    const blockBody = <CustomRow block={props.block} />
    const { isDesktop, isWidescreen } = useWidth()
    let content
    if (isDesktop || isWidescreen)
        content = ref ? (
            <TableRow ref={ref}>{blockBody}</TableRow>
        ) : (
            <TableRow>{blockBody}</TableRow>
        )
    else
        content = ref ? (
            <FilledCard ref={ref}>
                <GridItem block={props.block} />
            </FilledCard>
        ) : (
            <FilledCard>
                <GridItem block={props.block} />
            </FilledCard>
        )
    return content
})

export default Block

const GridItem = ({ block }: { block: BlockTableData }) => {
    return (
        <>
            <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                    Block
                </Typography>
                <AddressLink
                    to={`${CBLOCKS}/${block.number}`}
                    value={block.number}
                    typographyVariant="body1"
                    truncate={false}
                />
            </Grid>
            <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                    Age
                </Typography>
                <Field type={'timestamp'} value={block.timestamp.toString()}></Field>
            </Grid>
            <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                    # of tx
                </Typography>
                <Field type="number" value={block.numberOfTransactions} />
            </Grid>
            <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                    hash
                </Typography>
                <Field type="hexdata" value={block.hash} />
            </Grid>
            <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                    Gas Used
                </Typography>
                <Field type="string" value={block.gasUsed} />
            </Grid>
            <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                    Gas Limit
                </Typography>
                <Field type="string" value={block.gasLimit} />
            </Grid>
        </>
    )
}

const CustomRow = ({ block }: { block: BlockTableData }) => {
    return (
        <>
            <TableCell>
                <AddressLink
                    to={`${CBLOCKS}/${block.number}`}
                    value={block.number}
                    typographyVariant="body1"
                    truncate={false}
                />
            </TableCell>
            <TableCell align="left">
                <Typography variant="body2" component="span" noWrap={true}>
                    {moment(block.timestamp).fromNow()}
                </Typography>
            </TableCell>
            <TableCell sx={{ maxWidth: '50px' }} align="left">
                <Field type="number" value={block.numberOfTransactions} />
            </TableCell>
            <TableCell align="left" sx={{ maxWidth: { xs: '180px', md: '300px', lg: 'fit' } }}>
                <Field type="string" value={block.hash} />
            </TableCell>
            <TableCell align="left">
                <Field type="number" value={block.gasUsed} />
            </TableCell>
            <TableCell align="left">
                <Field type="number" value={block.gasLimit} />
            </TableCell>
        </>
    )
}
