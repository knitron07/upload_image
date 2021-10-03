import React, { useState } from 'react';
import "./UploadImage.css";
import { storage } from '../../Firebase setup/firebaseSetup';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {
    TextField,
    Button,
    Stack,
    Box,
    CircularProgress,
    Snackbar,
    Alert,
} from '@mui/material';

function UploadImage() {
    const [files, setFiles] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progressState, setProgressState] = useState(0);
    const [snackStatus, setSnackStatus] = useState({
        open: false,
        msg: '',
        severity: 'info',
    });

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackStatus((prev) => ({
            ...prev,
            open: false,
        }));
    };
    const handleChange = (e) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleUpload = () => {
        if (files.length === 0) return;
        files.forEach((file) => {
            const storageRef = ref(
                storage,
                `images_rough/${Date.now()}/${file.name}`,
            );
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const { bytesTransferred, totalBytes } = snapshot;
                    setProgressState((bytesTransferred / totalBytes) * 100);
                },
                (error) => {
                    // Handle unsuccessful uploads
                    setSnackStatus({
                        open: true,
                        msg: error,
                        severity: 'error',
                    });
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUrls((prev) => [...prev, { fileName: file.name, downloadURL }]);
                        setSnackStatus({
                            open: true,
                            msg: `${file.name} uploaded!`,
                            severity: 'success',
                        });
                    });
                },
            );
        });
    };
    return (

        <div>
            <div className="uploadImg">
                <Button classNmae="button_img" variant="contained" component="label">
                    {files.length === 0 ? 'Select files' : 'Files selected'}
                    <input
                        hidden
                        type="file"
                        multiple
                        accept=".png,.jpeg,.jpg,.img"
                        onChange={handleChange}
                    />
                </Button>
                <Button classNmae="button_img" onClick={handleUpload} variant="contained" spacing={1}>
                    Upload
                </Button>
                <CircularProgress
                    classNmae="button_img"
                    variant="determinate"
                    value={progressState % 100}
                    size={30}
                />
            </div>
            <Box
                sx={{
                    '& .MuiTextField-root': { m: 3, width: '25ch' },
                }}
            >
                {urls.map((url, idx) => {
                    return (
                        <Stack
                            key={idx}
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            className="urls-upload"
                        >
                            <TextField
                                id={url.fileName}
                                label={url.fileName}
                                type="url"
                                value={url.downloadURL}
                                readOnly
                                size="small"
                            />
                            <Button
                                className="copyURL"
                                variant="contained"
                                onClick={() => {
                                    navigator.clipboard.writeText(urls[idx].downloadURL);
                                }}
                            >
                                Copy
                            </Button>
                        </Stack>
                    );
                })}
            </Box>
            <Snackbar
                open={snackStatus.open}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    variant="filled"
                    severity={snackStatus.severity}
                >
                    {snackStatus.msg}
                </Alert>
            </Snackbar>
        </div>
    );

}

export default UploadImage;


{/* <div>
<div className="uploadImg">
    <Button variant="contained" component="label">
        {files.length === 0 ? 'Select files' : 'Files selected'}
        <input
            hidden
            type="file"
            multiple
            accept=".png,.jpeg,.jpg,.img"
            onChange={handleChange}
        />
    </Button>
    <Button onClick={handleUpload} variant="contained" spacing={1}>
        Upload
    </Button>
    <CircularProgress
        variant="determinate"
        value={progressState % 100}
        size={30}
    />
</div>
<Box
    sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
>
    {urls.map((url, idx) => {
        return (
            <Stack
                key={idx}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                className="urls-upload"
            >
                <TextField
                    id={url.fileName}
                    label={url.fileName}
                    type="url"
                    value={url.downloadURL}
                    readOnly
                    size="small"
                />
                <Button
                    className="copyURL"
                    variant="contained"
                    onClick={() => {
                        navigator.clipboard.writeText(urls[idx].downloadURL);
                    }}
                >
                    Copy
                </Button>
            </Stack>
        );
    })}
</Box>
<Snackbar
    open={snackStatus.open}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    autoHideDuration={3000}
    onClose={handleSnackbarClose}
>
    <Alert
        onClose={handleSnackbarClose}
        variant="filled"
        severity={snackStatus.severity}
    >
        {snackStatus.msg}
    </Alert>
</Snackbar>
</div>; */}