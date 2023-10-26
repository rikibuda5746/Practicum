import { Box, Divider, List, ListItem, ListItemIcon } from "@mui/material";
import { useSelector } from "react-redux";
import { selectors } from "../../../redux/data/user";
import IListItem from "../Section/modules/constant";
import { DrawerWrapper, ListItemTextWrapper, ListItemWrapper } from "./sidebar.styles";

export interface NavProps {
    selects?: Array<string>,
    content: Array<IListItem>
}


const Sidebar = (props: NavProps) => {
    const { selects, content } = props;
    return (
        <DrawerWrapper anchor="right" variant="permanent">
            <Box sx={{ position: 'relative' }}>
                {/* <ListWrapper> */}

                    {/* @TODO need to get roleId from redux after login */}
                    {/* If role is secretary - show <SecretaryInterfaceHEADER />  else (@TODO) - create driver header*/}

                {/* </ListWrapper> */}
                <Divider />
                <List>
                    {content && content.map((item, i) => {
                        return (
                            <ListItem component="div" disablePadding key={i} >
                                <ListItemWrapper to={item.path}>
                                    <ListItemIcon>
                                        {/* <FaHome color="primary" /> */}
                                    </ListItemIcon>
                                    <ListItemTextWrapper primary={item.text} />
                                </ListItemWrapper>
                            </ListItem>
                        )
                    })}
                </List>
            </Box>
        </DrawerWrapper>
    );
};
export default Sidebar;

{/* <ListItem component="div" disablePadding>
<ListItemButton sx={{ height: 56 }}>
  <ListItemIcon>
    <Home color="primary" />
  </ListItemIcon>
  <ListItemText
    primary="Project Overview"
    primaryTypographyProps={{
      color: 'primary',
      fontWeight: 'medium',
      variant: 'body2',
    }}
  />
</ListItemButton> */}