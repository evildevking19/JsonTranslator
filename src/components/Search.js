import React, { FunctionComponent, useState } from 'react';

import {createStyles, makeStyles} from '@mui/styles';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { t } from 'i18next';

const useStyles = makeStyles(() => {
    return createStyles({
        search: {
            border: '1px solid #ddd!important',
            borderRadius: '8px',
            width: '400px'
        },
        clear: {
            cursor: 'pointer'
        }
    });
});

const TypeSearch = (props) => {
    const { search, clear } = useStyles();

    const [showClearIcon, setShowClearIcon] = useState('none');

    const handleChange = (event) => {
        setShowClearIcon(event.target.value === '' ? 'none' : 'flex');
        props.handleChange(event);
    };

    const handleClick = () => {
        // TODO: Clear the search input
        props.handleReset();
        console.log('clicked the clear icon...');
    };

    return (
        <FormControl className={search}>
            <TextField
                size="small"
                variant="outlined"
                onChange={handleChange}
                value={props.value}
                placeholder={t('Search...')}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment
                            position="end"
                            style={{ display: showClearIcon }}
                            onClick={handleClick}
                        >
                            <ClearIcon className={clear}/>
                        </InputAdornment>
                    ),
                }}
            />
        </FormControl>
    );
};

export default TypeSearch;
