import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EmailIcon from '@mui/icons-material/Email';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

import MemberTable from "../../../components/table/MemberTable";
export default function Team() {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");
    const [inviteItems, setInviteItems] = useState([{ email: "", role: "user" }]);

    const handleInviteEmailChange = (index, value) => {
        inviteItems[index] = { email: value, role: inviteItems[index].role };
        setInviteItems([...inviteItems]);
    }
    const handleInviteRoleChange = (index, value) => {
        inviteItems[index] = { email: inviteItems[index].email, role: value };
        setInviteItems([...inviteItems]);

    }
    const handleInviteAdd = () => {
        setInviteItems([...inviteItems, { email: "", role: "user" }]);
    }
    const handleInviteRemove = (removeIndex) => {
        const newInviteItems = inviteItems.filter((item, index) => index !== removeIndex);
        setInviteItems(newInviteItems);
    }
    return (
        <div id="setting-team">
            <h5 className="setting-subtitle">{t('Team management (5/10)')}</h5>
            <p className="setting-subdes">{t('Manage your team members and their account permissions here.')}</p>
            <div className="tab-content-section common">
                <div className="sub-about">
                    <h6>{t('Invite team members')}</h6>
                    <p>{t('Get your projects up and running faster by inviting your team to collaborate.')}</p>
                </div>
                <div className="sub-content">
                    {inviteItems.map((item, index) =>
                        <div className="invite-item" key={index}>
                            <TextField
                                className="invite-email"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => handleInviteEmailChange(index, e.target.value)}
                                value={item.email}
                                autoComplete="false"
                                placeholder="you@example.com"
                                variant="outlined"
                            />
                            <Select
                                className="invite-role"
                                value={item.role}
                                onChange={(e) => handleInviteRoleChange(index, e.target.value)}
                            >
                                <MenuItem value="admin">admin</MenuItem>
                                <MenuItem value="user">user</MenuItem>
                            </Select>
                            <IconButton color="primary" onClick={() => handleInviteRemove(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </div>)}
                    <div id="invite-actions">
                        <Button startIcon={<AddIcon />} variant="text" onClick={handleInviteAdd}>{t('Add another')}</Button>
                        <Button startIcon={<EmailIcon />} variant="contained" color="third">{t('Send invites')}</Button>
                    </div>
                </div>
            </div>

            <div className="tab-content-section common">
                <div className="sub-about">
                    <h6>{t('Team members')}</h6>
                    <p>{t('Manage your existing team and change roles/permissions.')}</p>
                </div>
                <div className="sub-content">
                    <MemberTable />
                </div>
            </div>
        </div>
    );
}
