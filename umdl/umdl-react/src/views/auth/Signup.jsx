import {useEffect, useRef, useState} from "react";
import axiosClient from "../../axios_client.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import {useTranslation} from "react-i18next";
import {Avatar, Box, Button, Grid, TextField} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

export default function Signup() {

    const firstnameRef = useRef();
    const middlenameRef = useRef();
    const lastnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const {setUser, setToken} = useStateContext();

    const [FirstNameInvalid, setFirstNameInvalid] = useState({});
    const [MiddleNameInvalid, setMiddleNameInvalid] = useState({});
    const [LastNameInvalid, setLastNameInvalid] = useState({});
    const [ImageInvalid, setImageInvalid] = useState({});
    const [EmailInvalid, setEmailInvalid] = useState({});
    const [PasswordInvalid, setPasswordInvalid] = useState({});
    const [PasswordConfirmInvalid, setPasswordConfirmInvalid] = useState({});

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const {t} = useTranslation();

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage))
        }
    }, [selectedImage]);

    function setErrorData(errors)
    {
        for (const error_prop in errors) {
            if (error_prop === "first_name") setFirstNameInvalid({
                state: true,
                message: errors[error_prop][0]
            })
            if (error_prop === "middle_name") setMiddleNameInvalid({
                state: true,
                message: errors[error_prop][0]
            })
            if (error_prop === "last_name") setLastNameInvalid({
                state: true,
                message: errors[error_prop][0]
            })
            if (error_prop === "image") setImageInvalid({
                state: true,
                message: errors[error_prop][0]
            })
            if (error_prop === "email") setEmailInvalid({
                state: true,
                message: errors[error_prop][0]
            })
            if (error_prop === "password") setPasswordInvalid({
                state: true,
                message: errors[error_prop][0]
            })
            if (error_prop === "password_confirmation") setPasswordConfirmInvalid({
                state: true,
                message: errors[error_prop][0]
            })
        }
    }

    const onSubmit = (ev) => {
        ev.preventDefault()

        setFirstNameInvalid({state: false, message: ''})
        setMiddleNameInvalid({state: false, message: ''})
        setLastNameInvalid({state: false, message: ''})
        setImageInvalid({state: false, message: ''})
        setEmailInvalid({state: false, message: ''})
        setPasswordInvalid({state: false, message: ''})
        setPasswordConfirmInvalid({state: false, message: ''})

        const payload = {
            first_name: firstnameRef.current,
            middle_name: middlenameRef.current,
            last_name: lastnameRef.current,
            image: selectedImage,
            email: emailRef.current,
            password: passwordRef.current,
            password_confirmation: passwordConfirmationRef.current,
        }
        console.log(payload)
        axiosClient.post('/signup', payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrorData(response.data.errors)
                    }
                }
            })
    }

    return (
        <div className="signup-form animated fadeInDown">

            <div className="form">
                <h1>{t('signup_form.title')}</h1><br/>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <TextField inputRef={firstnameRef}
                                       label={t('user_form.first_name')} variant="outlined" margin="dense"
                                       style={{width: 250}}
                                       error={FirstNameInvalid.state}
                                       helperText={FirstNameInvalid.state && FirstNameInvalid.message}/>
                            &nbsp;&nbsp;&nbsp;
                            <TextField inputRef={middlenameRef}
                                       label={t('user_form.middle_name')} variant="outlined" margin="dense"
                                       style={{width: 150}}
                                       error={MiddleNameInvalid.state}
                                       helperText={MiddleNameInvalid.state && MiddleNameInvalid.message}/>
                            &nbsp;&nbsp;&nbsp;
                            <TextField inputRef={lastnameRef}
                                       label={t('user_form.last_name')} variant="outlined" margin="dense"
                                       style={{width: 250}}
                                       error={LastNameInvalid.state}
                                       helperText={LastNameInvalid.state && LastNameInvalid.message}/>
                            <TextField inputRef={emailRef}
                                       label={t('user_form.email')} variant="outlined" margin="dense"
                                       style={{width: 668}}
                                       error={EmailInvalid.state}
                                       helperText={EmailInvalid.state && EmailInvalid.message}/>
                            <TextField inputRef={passwordRef} type="password"
                                       label={t('user_form.password')} variant="outlined" margin="dense"
                                       style={{width: 668}}
                                       error={PasswordInvalid.state}
                                       helperText={PasswordInvalid.state && PasswordInvalid.message}/>
                            <TextField inputRef={passwordConfirmationRef}
                                       type="password"
                                       label={t('user_form.password_confirmation')} variant="outlined"
                                       margin="dense" style={{width: 668}}
                                       error={PasswordConfirmInvalid.state}
                                       helperText={PasswordConfirmInvalid.state && PasswordConfirmInvalid.message}/>
                            <br/>&nbsp;<br/>
                            <Button type="submit" color="secondary" variant="outlined" size="large"
                                    style={{width: 250}} margin="dense"
                                    startIcon={<SaveIcon/>}>
                                {t('general.save')}
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <input
                                accept="image/*"
                                type="file"
                                id="select-image"
                                style={{display: "none"}}
                                onChange={(e) => setSelectedImage(e.target.files[0])}
                            />

                            <Box mt={2} sx={{height: 230}}>
                                {imageUrl && selectedImage && (
                                    <Avatar src={imageUrl} alt={selectedImage.name} sx={{ width: 230, height: 230 }}/>
                                )}
                            </Box>
                            <label htmlFor="select-image">
                                <br/>&nbsp;<br/>
                                <Button variant="outlined" color="secondary" size="large" style={{width: 250}}
                                        margin="dense"
                                        component="span" startIcon={<AddPhotoAlternateIcon/>}>
                                    {t('user_form.upload_avatar')}
                                </Button>
                            </label>

                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    )
}
