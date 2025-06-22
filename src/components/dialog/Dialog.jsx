import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import MuiDialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import * as PropTypes from "prop-types";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';

const BootstrapDialog = styled(MuiDialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(3),
        display: 'flex',
        gap: theme.spacing(4),
        minHeight: 200,
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(2),
    },
}));

function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

const IconWrapper = styled(Box)(({ theme }) => ({
    borderRadius: '50%',
    width: 40,
    height: 40,
    backgroundColor: theme.palette.grey[200],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing(2),
    color: theme.palette.text.primary,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    flexShrink: 0,
}));

const SectionPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2.5),
    marginBottom: theme.spacing(3),
    borderRadius: 8,
    border: `1px solid ${theme.palette.divider}`,
    flexGrow: 1,
}));

export const PatientDialog = ({ open, onClose, patient }) => {
    if (!patient) return null;

    return (
        <BootstrapDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ fontWeight: 700, fontSize: 26, color: '#0B3954' }}>
                {patient.name}
            </DialogTitle>
            <DialogContent dividers>
                <Box
                    sx={{
                        flexShrink: 0,
                        width: 180,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        component="img"
                        src={patient.picture}
                        alt={patient.name}
                        sx={{
                            width: 160,
                            height: 160,
                            borderRadius: '50%',
                            border: '3px solid #0B3954',
                            objectFit: 'cover',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                        }}
                    />
                    <Typography
                        variant="subtitle1"
                        sx={{ mt: 2, fontWeight: 600, color: '#555', textAlign: 'center' }}
                    >
                        Date of birth:
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: '#777', textAlign: 'center' }}
                        gutterBottom
                    >
                        {formatDate(patient.birthDate)}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{ mt: 2, fontWeight: 600, color: '#555', textAlign: 'center' }}
                    >
                        Address:
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: '#777', textAlign: 'center', wordBreak: 'break-word' }}
                    >
                        {patient.address}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        overflow: 'auto',
                        minWidth: 0,
                    }}
                >
                    <SectionPaper elevation={0}>
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, color: '#0B3954', mb: 2, borderBottom: '1px solid #ccc', pb: 1 }}
                        >
                            Contact Information
                        </Typography>
                        <Box display="flex" alignItems="center" mb={1.5} sx={{ wordBreak: 'break-word' }}>
                            <IconWrapper>
                                <EmailOutlinedIcon fontSize="medium" />
                            </IconWrapper>
                            <Typography variant="body1" sx={{ color: '#333' }}>
                                {patient.raw.email}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" sx={{ wordBreak: 'break-word' }}>
                            <IconWrapper>
                                <LocalPhoneOutlinedIcon fontSize="medium" />
                            </IconWrapper>
                            <Typography variant="body1" sx={{ color: '#333' }}>
                                {patient.raw.phone}
                            </Typography>
                        </Box>
                    </SectionPaper>

                    <SectionPaper elevation={0}>
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, color: '#0B3954', mb: 2, borderBottom: '1px solid #ccc', pb: 1 }}
                        >
                            Diagnosis
                        </Typography>
                        <Box display="flex" alignItems="center" gap={2} sx={{ wordBreak: 'break-word' }}>
                            <IconWrapper>
                                <MedicalServicesOutlinedIcon fontSize="medium" />
                            </IconWrapper>
                            <Typography variant="body1" sx={{ color: '#333' }}>
                                {patient.diagnosis}
                            </Typography>
                        </Box>
                    </SectionPaper>
                </Box>
            </DialogContent>
            <DialogActions sx={{ paddingRight: 3, paddingBottom: 2 }}>
                <Button onClick={onClose} variant="contained" sx={{ backgroundColor: '#1abc9c', fontWeight: 700 }}>
                    Close
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
};

PatientDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    patient: PropTypes.object,
};
