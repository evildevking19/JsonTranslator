import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { InputAdornment, Grid, TextField, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
// import ReactCountryFlagsSelect, { Us } from 'react-country-flags-select';
// import TimezoneSelect from 'react-timezone-select';
import Avatar from '@mui/material/Avatar';
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
export default function Profile() {
    const { setUserInfo } = useAuth();
    const [profile, setProfile] = useState({});
    const { t } = useTranslation();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    // const [username, setUsername] = useState("");
    // const [website, setWebsite] = useState("");
    // const [description, setDescription] = useState("");
    // const [country, setCountry] = useState(null);
    // const [selectedTimezone, setSelectedTimezone] = useState(
    //     Intl.DateTimeFormat().resolvedOptions().timeZone
    // )
    // const [timezone, setTimezone] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [avatarImg, setAvatarImg] = useState(null);
    const avatarRef = useRef(null);

    const [dragActive, setDragActive] = useState(false);
    // handle drag events
    const handleAvatarDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleAvatarDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setAvatar(e.dataTransfer.files[0]);
        }
    };

    // triggers when file is selected with click
    const handleAvatarChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setAvatar(e.target.files[0]);
            console.log(e.target.files);
        }
    };

    // triggers the input when the button is clicked
    const handleAvatarClick = () => {
        avatarRef.current.click();
    };

    useEffect(() => {
        const loadProfile = async () => {
            axios.get(`/api/account/getProfile`)
                .then(res => {
                    setProfile(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        loadProfile();
    }, [])

    const displayProfile = () => {
        setFirstname(profile.firstname ? profile.firstname : "");
        setLastname(profile.lastname ? profile.lastname : "");
        setEmail(profile.email ? profile.email : "");
        setAvatarImg(profile.avatar ? profile.avatar : "");
    }

    useEffect(() => {
        displayProfile();
    }, [profile])

    const handleCancel = () => {
        displayProfile();
    }

    const handleSave = () => {
        const formData = new FormData();
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("email", email);
        formData.append("avatar", avatar);

        axios.post("/api/account/saveProfile", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then(res => {
            setProfile(res.data);
            setUserInfo(res.data);
            localStorage.setItem("jtrans-user", JSON.stringify(res.data));
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <div id="setting-profile">
            <h5 className="setting-subtitle">{t('Personal info')}</h5>
            <p className="setting-subdes">{t('Update your photo and personal details here.')}</p>
            <div className="tab-content-section profile-section">
                <div className="content-body">
                    <Grid container spacing={2}>
                        <Grid item sm={6} xs={12}>
                            <div className="form-group">
                                <label>{t('First name')}</label>
                                <TextField
                                    type="text"
                                    className="input-common"
                                    onChange={(e) => setFirstname(e.target.value)}
                                    value={firstname}
                                    autoComplete="false"
                                    placeholder={t('First name')}
                                    variant="outlined"
                                />
                            </div>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <div className="form-group">
                                <label>{t('Last name')}</label>
                                <TextField
                                    type="text"
                                    className="input-common"
                                    onChange={(e) => setLastname(e.target.value)}
                                    value={lastname}
                                    autoComplete="false"
                                    placeholder={t('Last name')}
                                    variant="outlined"
                                />
                            </div>
                        </Grid>
                        <Grid item sm={12} xs={12}>
                            <div className="form-group">
                                <label>{t('Email address')}</label>
                                <TextField
                                    className="input-common"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon color="white" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    autoComplete="false"
                                    placeholder={t('Email address')}
                                    variant="outlined"
                                />
                            </div>
                        </Grid>
                        <Grid item sm={12}>
                            <div className="profile-avatar-section">
                                <Avatar src={avatarImg} alt="avatar" style={{ width: "64px", height: "64px" }} />
                                <div className="avatar-dropdown" onDragEnter={handleAvatarDrag}>
                                    <input
                                        style={{ display: "none" }}
                                        ref={avatarRef}
                                        type="file"
                                        onChange={handleAvatarChange}
                                    />
                                    <img src="/assets/imgs/icon-upload-cloud.png" alt="upload" />
                                    <div>
                                        <Button variant="text" color="third" onClick={handleAvatarClick}>{t('Click to upload')}</Button> or drag and drop
                                    </div>
                                    <p>{t('SVG, PNG, JPG or GIF (max, 800*400px)')}</p>
                                </div>
                                {dragActive && (
                                    <div
                                        id="drag-file-element"
                                        onDragEnter={handleAvatarDrag}
                                        onDragLeave={handleAvatarDrag}
                                        onDragOver={handleAvatarDrag}
                                        onDrop={handleAvatarDrop}
                                    ></div>
                                )}
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className="content-footer">
                    <Button variant="contained" color="white" onClick={handleCancel}>{t('Cancel')}</Button>
                    <Button variant="contained" color="third" onClick={handleSave}>{t('Save changes')}</Button>
                </div>
            </div>

            {/* <h5 className="setting-subtitle">{t('Personal info')}</h5>
            <p className="setting-subdes">{t('Update your photo and personal details here.')}</p>
            <div className="tab-content-section profile-section">
                <div className="content-body">
                    <Grid container spacing={2}>
                        <Grid item sm={12}>
                            <div className="form-group inline">
                                <Switch defaultChecked />
                                <div>
                                    <p>{t('Available for projects')}</p>
                                    <p>{t('I’m open and available for work.')}</p>
                                </div>
                            </div>
                        </Grid>
                        <Grid item sm={12}>
                            <div className="form-group">
                                <label>{t('Username')}</label>
                                <TextField
                                    type="text"
                                    className="input-common"
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                    autoComplete="false"
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">{t('untitledui.com/')}</InputAdornment>,
                                    }}
                                />
                            </div>
                        </Grid>
                        <Grid item sm={12}>
                            <div className="form-group">
                                <label>{t('Website')}</label>
                                <TextField
                                    type="text"
                                    className="input-common"
                                    onChange={(e) => setWebsite(e.target.value)}
                                    value={website}
                                    autoComplete="false"
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">{t('http://', { nsSeparator: null })}</InputAdornment>,
                                    }}
                                />
                            </div>
                        </Grid>
                        <Grid item sm={12}>
                            <div className="form-group">
                                <label>{t('Description')}</label>
                                <TextField
                                    className="input-common"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                    multiline
                                    rows={4}
                                    autoComplete="false"
                                    variant="outlined"
                                />
                            </div>
                        </Grid>
                        <Grid item sm={12}>
                            <div className="form-group" id="country-select">
                                <label>{t('Country')}</label>
                                <ReactCountryFlagsSelect
                                    selected={country}
                                    onSelect={setCountry}
                                    fullWidth
                                    searchable
                                    selectHeight={45}
                                />
                            </div>
                        </Grid>
                        <Grid item sm={12}>
                            <div className="form-group" id="timesone-select">
                                <label>{t('Timezone')}</label>
                                <TimezoneSelect
                                    value={selectedTimezone}
                                    onChange={setSelectedTimezone}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className="content-footer">
                    <Button variant="contained" color="white">{t('Cancel')}</Button>
                    <Button variant="contained" color="third">{t('Save changes')}</Button>
                </div>
            </div> */}
        </div>
    );
}
