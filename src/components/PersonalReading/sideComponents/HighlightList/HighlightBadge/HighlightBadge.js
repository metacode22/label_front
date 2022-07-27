import IconButton from "@mui/material/IconButton";
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import Badge from '@mui/material/Badge';

function HighlightBadge() {
    function notificationsLabel(count) {
        if (count === 0) {
            return 'no notifications';
        }
        
        if (count > 99) {
            return 'more than 99 notification';
        }
        
        return `${count} notification`;
    }
    
    return (
        <IconButton aria-label={notificationsLabel(100)}>
            <Badge badgeContent={100} color="secondary">
                <TurnedInIcon></TurnedInIcon>
            </Badge>
        </IconButton>
    )
}

export default HighlightBadge;