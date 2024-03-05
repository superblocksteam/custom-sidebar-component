import { useSuperblocksContext, useSuperblocksIsLoading } from "@superblocksteam/custom-components";
import { type Props, type EventTriggers } from "./types";

import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowRight from '@mui/icons-material/ArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Home from '@mui/icons-material/Home';
import Settings from '@mui/icons-material/Settings';
import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';

const ICON_MAP: { [key: string]: any } = {
  People: <People />,
  Dns: <Dns />,
  PermMedia: <PermMedia />,
  Public: <Public />,
  // ... add other icons to the map
};

const FireNav = styled(List)<{ component?: React.ElementType }>({
  '& .MuiListItemButton-root': {
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 15
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

export default function Component({
  items,
  selectedItem,
  theme
}: Props) {
  // If any of your component's properties are connected to APIs, you might want to show a loading indicator while the data is
  // loading. The `useSuperblocksIsLoading` hook returns a boolean that indicates whether this is the case.
  const isLoading = useSuperblocksIsLoading();
  const {
    updateProperties,
    events: {
      onItemSelect,
    },
  } = useSuperblocksContext<Props, EventTriggers>();

  // Event handler: onItemSelect()
  const selectItem = (item: any) => {
    // use the provided updateProperties() method to set the *item* property
    updateProperties({ selectedItem: item });
    // trigger the onItemSelect event
    onItemSelect();
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      border: '1px solid #E8EAED',
      borderRadius: '4px',
      height: '100%'
    }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: theme?.mode === "DARK" ? "dark" : "light",
            primary: { main: 'rgb(102, 157, 246)' },
            background: { paper: 'rgb(5, 30, 52)' },
          },
        })}
      >
        <Paper
          elevation={0}
          sx={{
            maxWidth: 256,
            background: "none !important",
            backgroundColor: "none !important",
          }}
        >
          <FireNav component="nav" disablePadding>
          <div>
              {items.map((item: any) => {
                return (
                  <div key={item.key} style={{ paddingBottom: "8px" }}>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: 400,
                        lineHeight: "16px",
                        color: theme?.colors?.neutral700,
                        padding: "8px 16px",
                        marginBottom: "2px",
                        fontFamily: "Inter"
                      }}
                    />
                    {item.children.map((child: any) => {
                      const isSelected = child.label === selectedItem;
                      return (
                        <ListItemButton
                          key={child.key}
                          sx={{
                            py: 0,
                            minHeight: 32,
                            borderRadius: "4px",
                            backgroundColor: "",
                            color: theme?.colors?.neutral700,
                            marginBottom: "2px",
                            fontFamily: "Inter",
                            "&:hover": {
                              backgroundColor: isSelected
                                ? theme?.colors?.neutral900
                                : theme?.colors?.neutral100,
                              color: isSelected
                                ? theme?.colors?.neutral
                                : theme?.colors?.neutral900,
                            },
                          }}
                          onClick={() => selectItem(child.label)}
                        >
                          <ListItemIcon sx={{ color: "inherit" }}>
                            {ICON_MAP[child.icon]}
                          </ListItemIcon>
                          <ListItemText
                            primary={child.label}
                            primaryTypographyProps={{
                              fontSize: 14,
                              fontWeight: 500,
                              color: "inherit",
                            }}
                          />
                        </ListItemButton>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}
