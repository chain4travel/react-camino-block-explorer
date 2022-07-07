import { useTheme, useMediaQuery } from '@mui/material';

const useWidth = () => {
  const theme = useTheme();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isWidescreen = useMediaQuery(theme.breakpoints.up('lg'));

  return {
    isSmallMobile,
    isMobile,
    isTablet,
    isDesktop,
    isWidescreen,
  };
};

export default useWidth;
