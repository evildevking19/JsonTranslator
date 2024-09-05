import React from 'react';
import iconUpload from '../assets/imgs/icon-upload-cloud.png';
import { useTranslation } from 'react-i18next';

// drag drop file component
export default function DragDropFile(props) {
    const { i18n, t } = useTranslation();
    // drag state
    const [dragActive, setDragActive] = React.useState(false);
    // ref
    const inputRef = props.fileInputRef;
    const handleFile = props.onHandleFile;

    // handle drag events
    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files);
        }
    };

    // triggers when file is selected with click
    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            // const file = e.target.files[0];
            // const reader = new FileReader();

            // reader.onload = function (e) {
            //     const fileContent = e.target.result;
            //     console.log('File content:', fileContent);
            // };
            // reader.readAsText(file);
            // console.log(reader);

            handleFile(e.target.files);
        }
    };

    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <div id="form-file-upload" onDragEnter={handleDrag}>
            <input
                ref={inputRef}
                type="file"
                id="input-file-upload"
                onChange={handleChange}
            />
            <div
                id="label-file-upload"
                className={dragActive ? 'drag-active' : ''}
            >
                <div id="file-upload-description">
                    <img src={iconUpload} alt="upload" />
                    <div>
                        <p>{t('edit-form-guide1')}</p>
                        <p>{t('edit-form-guide2')}</p>
                    </div>
                </div>
                <button
                    type="button"
                    className="upload-button"
                    onClick={onButtonClick}
                >
                    {t('select-file')}
                </button>
            </div>
            {dragActive && (
                <div
                    id="drag-file-element"
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                ></div>
            )}
        </div>
    );
}
