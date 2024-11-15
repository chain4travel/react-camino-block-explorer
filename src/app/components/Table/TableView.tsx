import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { Field } from '../DetailsField'
import { ColumnType } from 'app/pages/Validators'
import { useAppDispatch } from 'store/configureStore'
import { sortValidators } from 'store/validatorsSlice'

export default function TableView({
    children,
    columns,
}: {
    columns: ColumnType[]
    children: React.ReactNode
}) {
    const dispatch = useAppDispatch()
    return (
        <>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        {columns.map(column => (
                            <TableCell
                                sx={{
                                    backgroundColor: 'primary.dark',
                                    wrap: 'nowrap',
                                    cursor: 'pointer',
                                }}
                                key={column.name}
                                align={column.align}
                                onClick={() => dispatch(sortValidators(column.name))}
                            >
                                <Field
                                    type="string"
                                    value={column.label}
                                    fontWeight="fontWeightBold"
                                />
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>{children}</TableBody>
            </Table>
        </>
    )
}
