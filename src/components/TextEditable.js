import { createElement, useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { TextareaAutosize } from '@mui/base';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

// i18n.language
const TextEditable = (props) => {
    const { isLoggedIn, userInfo } = useAuth();
    const { i18n, t } = useTranslation();
    const [manage, setManage] = useState(userInfo?.admin); 
    const [edit, setEdit] = useState(false);
    const [textElement, setTextElement] = useState();
    const [text, setText] = useState(t(props.text));

    const classes = props.className || '';
    const handleEdit = (e) => {
        e.preventDefault();
        setEdit(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        setEdit(false);

        setTextElement({
            ...textElement,
            props: { ...textElement.props, children: text },
        });
        
        axios
            .post(`/api/admin/changelanguage`, {
                key: props.text,
                newString: text,
                language: i18n.language,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                // console.log(err);
            });
        
    };

    useEffect(() => {
        let newTextElement = createElement(
            props.type || 'p',
            {},
            t(props.text)
        );
        setTextElement(newTextElement);
    }, []);

    useEffect(() => {
        setText(t(props.text));
    }, [i18n.language]);

    useEffect(() => {
        if (!textElement) return;
        setTextElement({
            ...textElement,
            props: { ...textElement.props, children: text },
        });
    }, [text]);

    useEffect(() => {
        // setManage(isLoggedIn);
    }, [isLoggedIn])
    return (
        <div className={'text-editable ' + classes} style={props.style}>
            <div>
                {textElement}
                {manage && edit && (
                    <TextareaAutosize
                        onClick={e => e.preventDefault()}
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                    />
                )}
            </div>

            {!edit
                ? manage && <EditIcon onClick={handleEdit} />
                : manage && <SaveIcon onClick={handleSave} />}
        </div>
    );
};
export default TextEditable;
