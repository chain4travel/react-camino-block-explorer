import React, { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useWidth from 'app/hooks/useWidth';
import axios from 'axios';
import {
  MenuItem,
  MenuList,
  ListItemIcon,
  Avatar,
  ClickAwayListener,
} from '@mui/material';
import { useTheme } from '@mui/material';
import { SearchMenuItem } from 'types/search-menu';
import { mapToItem } from './utils/search-utils';
import { debounce } from './utils/debounce';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/configureStore';
import { selectMagellanAddress } from 'store/app-config';
import { searchApi } from 'utils/magellan-api-utils';

function OutlinedSearchInput() {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [menuItems, setMenuItems] = useState([] as SearchMenuItem[]);
  const [timer, setTimer] = useState(0 as unknown as NodeJS.Timeout);
  const magellanAddress = useAppSelector(selectMagellanAddress);
  const navigate = useNavigate();

  const handleSearch = () => {
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      debouncedSearch(search);
    }, 500);
    setTimer(newTimer);
  };

  const debouncedSearch = debounce(
    async search => {
      if (!search || search.length < 1) {
        setMenuItems([]);
        return;
      }
      const data = await (
        await axios.get(`${magellanAddress}${searchApi}?query=${search}`)
      ).data;
      setMenuItems([]);
      const numberOfResults =
        data.results.length > 10 ? 10 : data.results.length;
      for (let i = 0; i < numberOfResults; i++) {
        const mapItem = (await mapToItem(
          data.results[i].type,
          data.results[i].data,
        )) as SearchMenuItem;
        setMenuItems(prev => [...prev, mapItem]);
      }
    },
    250,
    search.length === 0,
  );

  useEffect(() => {
    handleSearch();
  }, [search]); // eslint-disable-line

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(prev => !prev);
  };
  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '40px',
        [theme.breakpoints.down('md')]: {
          height: '50px !important',
        },
      }}
    >
      <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={handleClickAway}
      >
        <Box
          sx={{
            height: '40px',
            [theme.breakpoints.down('md')]: {
              height: '50px',
            },
          }}
        >
          <OutlinedInput
            placeholder="Search by Address / Hash / Block / Token"
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: '8px',
              p: '8px 16px',
              backgroundColor: 'primary.light',
              color: 'primary.contrastText',
              borderWidth: '0px',
              fontSize: '15px',
              lineHeight: '24px',
              fontWeight: 400,
              '.MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              [theme.breakpoints.down('md')]: {
                height: '50px',
              },
            }}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            onFocus={handleClick}
            onChange={e => {
              setSearch(e.target.value);
            }}
            onKeyUp={e => {
              if (e.key === 'Enter' && menuItems.length > 0) {
                navigate(menuItems[0].link);
              }
            }}
          />
          {open && menuItems.length > 0 ? (
            <Box
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: '300px',
                position: 'absolute',
                zIndex: 999,
                top: '100%',
                overflowY: 'scroll',
                overflowX: 'hidden',
                borderRadius: '7px',
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
                marginTop: '8px',
              }}
            >
              <MenuList>
                {menuItems.map(item => (
                  <MenuItem
                    key={item.label}
                    onClick={() => {
                      window.location.href = item.link;
                    }}
                    sx={{ gap: '10px' }}
                  >
                    <ListItemIcon>
                      <Avatar
                        style={{
                          backgroundColor: item.avatarColor,
                          color: 'primary.contrastText',
                          width: 30,
                          height: 30,
                        }}
                      >
                        <Typography variant="caption">{item.avatar}</Typography>
                      </Avatar>
                    </ListItemIcon>
                    <Typography variant="body2" component="p" noWrap>
                      {item.label}
                    </Typography>
                  </MenuItem>
                ))}
              </MenuList>
            </Box>
          ) : null}
        </Box>
      </ClickAwayListener>
    </Box>
  );
}

export default function SearchInput() {
  const { isDesktop } = useWidth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();

  return (
    <>
      {!isDesktop ? (
        <div>
          <SearchIcon
            onClick={handleOpen}
            sx={{
              color: 'primary.contrastText',
            }}
          />
          <Modal
            open={open}
            onClose={handleClose}
            disableEscapeKeyDown
            disableEnforceFocus
            disableAutoFocus
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'primary.dark',
                boxShadow: 24,
                width: '500px',
                maxWidth: '70%',
                padding: '1rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '40px',
                borderRadius: '12px',
                height: '40px',
                [theme.breakpoints.down('md')]: {
                  height: 'auto',
                },
                [theme.breakpoints.down('sm')]: {
                  maxWidth: '95%',
                },
              }}
            >
              <Typography variant="h5" component="h5">
                Search for anything
              </Typography>
              <OutlinedSearchInput />
            </Box>
          </Modal>
        </div>
      ) : (
        <Box
          sx={{
            width: '450px',
            height: '40px',
            '@media (max-width:1199px)': {
              width: '325px',
            },
          }}
        >
          <OutlinedSearchInput />
        </Box>
      )}
    </>
  );
}
