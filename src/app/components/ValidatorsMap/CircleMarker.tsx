import React, { Fragment, useState, useRef } from 'react'
import { Marker } from 'react-simple-maps'
import './styles/CircleMarker.css'
import Typography from '@mui/material/Typography'
import Popper, { PopperPlacementType } from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'

interface nodes {
    value: string
}
const CircleMarker = ({
    country,
    lng,
    lat,
    rValue,
    city,
    sValue,
    nodes,
}: {
    country: string
    lng: string
    lat: string
    rValue: number
    city: string
    sValue: number
    nodes: nodes[]
}) => {
    let cityNodes = nodes
    const [changeColor, setChangeColor] = useState(false)
    const anchorEl = useRef(null)
    const [open, setOpen] = useState(false)
    const [placement] = useState<PopperPlacementType>()

    const id = open ? 'simple-popover' : undefined

    const isFirefox = navigator.userAgent.indexOf('Firefox') !== -1 ? true : false

    return (
        <Fragment>
            <Marker ref={anchorEl} coordinates={[lng, lat]} aria-describedby={id}>
                <circle
                    className="animated flash"
                    fill={changeColor === true ? '#000000' : '#4782da'}
                    stroke="#fff"
                    fillOpacity="1"
                    strokeWidth={sValue / 2}
                    r={rValue / 2}
                    strokeOpacity="0.4"
                    cursor="pointer"
                    onMouseOver={() => {
                        setOpen(true)
                        setChangeColor(true)
                    }}
                    onMouseOut={e => {
                        setOpen(false)
                        setChangeColor(false)
                    }}
                />
            </Marker>

            <Popper open={open} anchorEl={anchorEl.current} placement={placement} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                            <Typography sx={{ p: 2 }}>
                                <div
                                    style={{
                                        marginLeft: isFirefox ? 15 : 5,
                                        marginRight: isFirefox ? 15 : 5,
                                    }}
                                >
                                    <li>
                                        <b>Country:</b>
                                        {country}
                                    </li>
                                    <li>
                                        <b>City:</b>
                                        {city}
                                    </li>
                                    <li>
                                        <b>Nodes:</b>
                                        <br />
                                        {cityNodes.map((value: string, index: number) => (
                                            <>
                                                {index < 3 ? (
                                                    <>
                                                        {value}
                                                        <br />
                                                    </>
                                                ) : null}
                                            </>
                                        ))}
                                        {cityNodes.length > 3 ? (
                                            <>{cityNodes.length - 3} more validators</>
                                        ) : null}
                                    </li>
                                </div>
                            </Typography>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </Fragment>
    )
}

export default CircleMarker
