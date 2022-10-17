import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";

const headersData = [
  {
    label: "Ganhar com email",
    href: "/email",
  },
  {
    label: "Ganhar indicando",
    href: "/invite",
  },
];

export default function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <header>
      <AppBar variant="outlined" color="transparent">
        <Toolbar>
          <Link href="/">
            <a
              style={{
                textDecoration: "none",
              }}
            >
              <Typography color="textPrimary" variant="h4" component="h1">
                Exchange My Data For Followers
              </Typography>
            </a>
          </Link>
          <Box
            style={{
              marginLeft: "auto",
            }}
          >
            <Tooltip title="Ver mais">
              <Button variant="text" onClick={handleOpenUserMenu}>
                <MenuIcon />
              </Button>
            </Tooltip>

            <Menu
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box style={{ display: "flex", flexDirection: "column" }}>
                {headersData.map(({ label, href }: any) => (
                  <Box
                    key={label}
                    style={{
                      width: "200px",
                    }}
                  >
                    <Link href={href}>
                      <a
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        <Button
                          style={{
                            width: "100%",
                          }}
                          color="primary"
                        >
                          {label}
                        </Button>
                      </a>
                    </Link>
                  </Box>
                ))}
              </Box>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </header>
  );
}
