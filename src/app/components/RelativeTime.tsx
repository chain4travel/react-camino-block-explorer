import * as React from 'react';
import { Typography, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import moment from 'utils/helpers/moment';
import useWidth from 'app/hooks/useWidth';

const NoMaxWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 'none',
  },
});

export default function RelativeTime({
  variant,
  value,
}: {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption';
  value: number;
}) {
  const date = new Date(value);
  const { isMobile } = useWidth();
  return (
    <>
      {!isMobile ? (
        <NoMaxWidthTooltip
          title={moment(date).format('MMM D, YYYY, h:mm:ss A ([GMT] ZZ)')}
        >
          <Typography variant={variant} color="latestList.timestamp">
            {moment(date).fromNow()}
          </Typography>
        </NoMaxWidthTooltip>
      ) : (
        <Typography variant={variant} color="latestList.timestamp">
          {moment(date).fromNow()}
        </Typography>
      )}
    </>
  );
}
