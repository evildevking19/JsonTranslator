/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState, useRef } from 'react';
import {
    Button,
    FormControl,
    Select,
    MenuItem,
    IconButton
} from '@mui/material';
import Layout from '../layout/Layout';
import DragDropFile from '../components/DragDropFile';
import { useTranslation } from 'react-i18next';
import toastr from 'toastr';
import axios from 'axios';
import { useAuth } from "../contexts/AuthContext";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReactCountryFlag from "react-country-flag";
import { languages as countryLangs } from '../constants/countryLanguages';
import DownloadIcon from '@mui/icons-material/Download';

const Home = () => {
    const [completeStep, setCompleteStep] = useState(-2);
    const [resultItems, setResultItems] = useState([]);
    const [pendingAction, setPendingAction] = useState(false);
    const [progress, setProgress] = useState("");
    const [langItems, setLangItems] = useState([]);
    const { isLoggedIn, userInfo, setUserInfo } = useAuth();
    const fileInputRef = useRef(null);
    const { t } = useTranslation();
    const [file, setFile] = useState([]);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');

    const [srcLanguage, setSrcLanguage] = useState('global');
    const [tarLangPath, setTarLangPath] = useState('global');
    const [srcLangPath, setSrcLangPath] = useState('global');

    const onHandleFile = (data) => {
        let tmpFile = data[0];
        let fileNameParts = tmpFile.name.split('.');
        let extention = fileNameParts[fileNameParts.length - 1];

        if (extention !== 'json') {
            toastr.clear();
            toastr.warning(t('Please select the valid json file'));
            return;
        }

        let fileSize = Math.floor((1000 * tmpFile.size) / 1024 / 1024) / 1000;
        if (fileSize > 5) {
            toastr.clear();
            toastr.warning(t('The file size should be less than 5MB'));
            return;
        }

        setFile(data);
        if (file.length === 0) {
        } else {
            toastr.clear();
            toastr.success(t('The file loaded'));
        }
    };

    const handleRemoveFile = () => {
        setFile([]);
    };

    const handleSrcLanguageChange = (e) => {
        setSrcLangPath(e.target.value);
        setSrcLanguage(
            countryLangs.filter((item) => item.abbreviation === e.target.value)[0].languages[0].code
        );
    };

    const handleTarLanguageChange = (e) => {
        setTarLangPath(e.target.value);
    };

    const handleTranslate = async () => {
        if (!file[0]) {
            toastr.clear();
            toastr.warning(t('Please select the json file'));
            return;
        }
        if (tarLangPath === 'global') {
            toastr.clear();
            toastr.warning(t('Please select your target language'));
            return;
        }

        if (langItems.length === 0) {
            setPendingAction(true);
            handleAddLanguage();
            return;
        }

        if (resultItems.length !== 0) {
            setPendingAction(true);
            setResultItems([]);
            return;
        }
        // Using the Fetch API
        setLoading(true);
        setResult('');
        setCompleteStep(-1);

        let uploadedFile = null;
        setProgress(0);

        let tmpResultItems = [];
        for (let i = 0; i < langItems.length; i++) {
            const formData = new FormData();

            if (i === 0) {
                formData.append('file', file[0]);
            } else {
                formData.append('file', uploadedFile);
            }
            if (i === langItems.length - 1) {
                formData.append('end', true);
            }

            formData.append('sl', srcLanguage);
            formData.append('tl', langItems[i].languages[0].code);

            try {
                const { data: result } = await axios.post(
                    `/api/tool/transjson`,
                    formData
                );
                const { jsonData, tmpFile } = result;
                if (i === 0) uploadedFile = tmpFile;
                if (jsonData) {
                    let keys = Object.keys(jsonData);
                    let htmlResult = '<code>{</code>';
                    for (let i = 0; i < keys.length; i++) {
                        if (i < keys.length - 1)
                            htmlResult += `<code><span><span>"${keys[i]
                                }"</span>: <span>"${jsonData[keys[i]]
                                }"</span>,</span></code>`;
                        else
                            htmlResult += `<code><span><span>"${keys[i]
                                }"</span>: <span>"${jsonData[keys[i]]
                                }"</span></span></code>`;
                    }
                    htmlResult += '<code>}</code>';
                    setResult(htmlResult);

                    tmpResultItems.push(htmlResult);

                    // disable free use
                    if (userInfo.free) {
                        let newUserInfo = { ...userInfo, free: false };
                        localStorage.setItem('jtrans-user', JSON.stringify(newUserInfo));
                        setUserInfo(newUserInfo);
                    }
                }
            } catch (err) {
                console.log(err);
                toastr.clear();
                toastr.warning(t(err.response.data));
                break;
            }
            setProgress(Math.round(100 * (i + 1) / langItems.length));
            setCompleteStep(i);
            for (let j = 0; j < 10 ** 9; j++);

        }
        setResultItems(tmpResultItems);
        //setCompleteStep(9999);
        setLoading(false);

    };

    const handleCopy = () => {
        let textarea = document.getElementById('translate-result-content');
        let textContent = textarea.innerText;
        navigator.clipboard
            .writeText(textContent)
            .then(() => {
                toastr.clear();
                toastr.success(t('Content copied to clipboard!'));
            })
            .catch((err) => {
                toastr.clear();
                toastr.error(t('Unable to copy content to clipboard'));
            });
    };



    const handleAddLanguage = () => {
        if (loading) return;
        if (resultItems.length > 0) {
            setResult("");
            setCompleteStep(-2);
        }
        if (!tarLangPath || tarLangPath === "global") {
            toastr.clear();
            toastr.warning(t("Please select your target language"));
            return;
        }
        let isExist = langItems.filter(item => item.abbreviation === tarLangPath).length !== 0;
        if (isExist) return;

        let langItem = countryLangs.filter(item => item.abbreviation === tarLangPath)[0];
        setLangItems([langItem, ...langItems]);
    }

    const handleRemoveLanguage = (index) => (event) => {
        event.preventDefault();
        let newLangItems = [...langItems];
        newLangItems.splice(index, 1);
        setLangItems(newLangItems);

        let newResultItems = [...resultItems];
        newResultItems.splice(index, 1);
        setResultItems(newResultItems);
    }

    const displaySelectedResult = (index) => {
        setResult(resultItems[index]);
    }

    const handleDownload = (index) => {
        const contentElement = document.getElementById(
            'translate-result-content'
        );
        if (index !== undefined && !resultItems[index] && index > completeStep) return;

        contentElement.innerHTML = resultItems[index];
        const contentToDownload = contentElement.innerText;
        const blob = new Blob([contentToDownload], { type: 'text/html' });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `(${langItems[index].country}-${langItems[index].languages[0]['language']})-` + file[0].name;
        document.body.appendChild(a);
        a.click();

        // Clean up
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleDownloadAllFiles = () => {
        for (let i = 0; i < resultItems.length; i++) {
            setTimeout(
                () => {
                    handleDownload(i);
                },
                i * 1000 // Delay download every 200ms
            );
        }
    }

    useEffect(() => {
        if (langItems.length !== 0 && pendingAction) {
            handleTranslate();
            setPendingAction(false);
        }
    }, [langItems])

    useEffect(() => {
        if (resultItems.length === 1) {
            setResult(resultItems[0]);
        }
    }, [resultItems])


    useEffect(() => {
        if (resultItems.length === 0 && pendingAction) {
            handleTranslate();
            setPendingAction(false);
        }
    }, [resultItems])
    return (
        <Layout>
            <main>
                <div id="translate-section">
                    <form id="edit-doc-form">
                        <div id="form-title">
                            <h1>{t('trans-form-title')}</h1>
                            <p>{t('edit-form-subtitle')}</p>
                        </div>

                        <p>
                            {t(
                                'Upload your main JSON file and select  a language'
                            )}
                        </p>
                        <DragDropFile
                            onHandleFile={onHandleFile}
                            fileInputRef={fileInputRef}
                        />

                        <div className="language-selection">
                            {srcLangPath !== "global" ?
                                <ReactCountryFlag
                                    countryCode={srcLangPath}
                                    svg
                                    className="language-flag"
                                    title={srcLangPath}
                                /> : <img
                                    src={`/assets/imgs/flags/global.png`}
                                    className="flag-language"
                                    alt="language"
                                />
                            }

                            <FormControl
                                sx={{ m: 1, minWidth: 0 }}
                                size="small"
                            >
                                <Select
                                    className="form-control"
                                    labelId="select-language-label"
                                    id="select-language"
                                    value={srcLangPath}
                                    label="Language"
                                    onChange={handleSrcLanguageChange}
                                >
                                    <MenuItem value="global" disabled>
                                        {t('Select your original language')}
                                    </MenuItem>
                                    {countryLangs.map((item, key) => (
                                        <MenuItem
                                            key={item.country}
                                            value={item.abbreviation}
                                        >
                                            {item.country} - {item.languages[0].language}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        <p className="output-languages">{t('Output language(s)')}</p>
                        <div className="language-selection">
                            {tarLangPath !== "global" ?
                                <ReactCountryFlag
                                    countryCode={tarLangPath}
                                    svg
                                    className="language-flag"
                                    title={tarLangPath}
                                /> : <img
                                    src={`/assets/imgs/flags/global.png`}
                                    className="flag-language"
                                    alt="language"
                                />
                            }
                            <FormControl
                                sx={{ m: 1, minWidth: 0 }}
                                size="small"
                            >
                                <Select
                                    className="form-control select-language"
                                    labelId="select-language-label"
                                    value={tarLangPath}
                                    label="Language"
                                    onChange={handleTarLanguageChange}
                                >
                                    <MenuItem value="global" name="global" disabled>
                                        {t('Select your target language')}
                                    </MenuItem>
                                    {countryLangs.map((item, key) => (
                                        <MenuItem
                                            key={item.country}
                                            value={item.abbreviation}
                                        >
                                            {item.country} - {item.languages[0].language}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        {file.length !== 0 && (
                            <div className="files-action">
                                <span className="filename">{file[0].name}</span>
                                <button
                                    type="button"
                                    className="btn-file-action btn-remove"
                                    onClick={handleRemoveFile}
                                >
                                    Remove
                                </button>
                                <span className="filesize">
                                    {Math.floor(
                                        (1000 * file[0].size) / 1024 / 1024
                                    ) / 1000}
                                    MB
                                </span>
                            </div>
                        )}
                        <Button
                            variant="outlined"
                            onClick={handleAddLanguage}
                            className="btn-add-language"
                        >
                            + {t('ADD EXTRA OUTPUT LANGUAGE')}
                        </Button>
                        <Button
                            onClick={handleTranslate}
                            className="btn-common btn-operate"
                        >
                            {t('Start translation')}
                            <img
                                src="/assets/imgs/icon-edit.png"
                                alt="ai"
                                className={
                                    'edit-icon' +
                                    (loading ? ' loading' : '')
                                }

                            />
                            <span className="trans-progress">{progress !== "" ? `${progress} %` : ""}</span>
                        </Button>
                        {isLoggedIn && userInfo.free && <p style={{ color: "#33a68e" }}>{t('*** You can try one file for free. ***')}</p>}

                        {langItems.length !== 0 && <div className="trans-lang-items-box">
                            <Button className="btn-download-all" variant="text" onClick={handleDownloadAllFiles}>{t('Download all files')}</Button>
                            {langItems.map((item, index) =>
                                <div className={"trans-lang-item" + (completeStep >= index ? " complete" : "")} key={index}>
                                    <div>
                                        <ReactCountryFlag
                                            countryCode={item.abbreviation}
                                            svg
                                            className="language-flag"
                                            title={item.abbreviation}
                                        />
                                        <span className="item-language">{item.languages[0].language}</span>
                                    </div>
                                    <div>
                                        <span className="item-download" onClick={() => handleDownload(index)}>
                                            <span>{t('Download file')}</span>
                                            <DownloadIcon />
                                        </span>
                                        <img src="/assets/imgs/icon-edit.png" className={"edit-icon" + ((completeStep + 1 === index && loading) ? " loading" : "")} alt="ai" />
                                    </div>
                                    <IconButton onClick={handleRemoveLanguage(index)}>
                                        <DeleteOutlineIcon color="white" />
                                    </IconButton>
                                </div>
                            )}
                        </div>}
                    </form>

                    {file.length !== 0 && result && (
                        <div id="translate-result-section" className={langItems.length > 1 ? "hidden" : ""}>
                            <img
                                src="/assets/imgs/icon-copy.png"
                                alt="Copy"
                                id="btn-trans-copy"
                                onClick={handleCopy}
                            />

                            <pre
                                id="translate-result-content"
                                dangerouslySetInnerHTML={{ __html: result }}
                            ></pre>
                        </div>
                    )}

                    {file.length !== 0 && result && langItems.length === 1 && (
                        <div id="files-action-section">
                            {file.length !== 0 && (
                                <div className="files-action">
                                    <span className="filename">
                                        {file[0].name}
                                    </span>
                                    <button
                                        className="btn-file-action btn-download"
                                        onClick={handleDownload}
                                    >
                                        {t('Download')}
                                    </button>
                                    <span className="filesize">
                                        {Math.floor(
                                            (1000 * file[0].size) / 1024 / 1024
                                        ) / 1000}
                                        MB
                                    </span>
                                    <Button
                                        onClick={handleDownload}
                                        className="btn-common btn-operate"
                                        endIcon={
                                            <img
                                                src="/assets/imgs/icon-download.png"
                                                alt="ai"
                                                className="edit-icon"
                                            />
                                        }
                                    >
                                        {t('Download')}
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </Layout>
    );
};
export default Home;
