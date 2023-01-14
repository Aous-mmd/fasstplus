import React from 'react'
import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, Radio, Typography } from '@mui/material';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { Admin, TPermissions } from '../ActionsDialog';

type Props = {
    permission: TPermissions;
    selectedRadio: number[];
    selectedChecked: number[];
    setSelectedChecked: React.Dispatch<React.SetStateAction<number[]>>;
    setSelectedRadio: React.Dispatch<React.SetStateAction<number[]>>;
}

const Permissions: React.FC<Props> = ({ permission, selectedRadio, selectedChecked, setSelectedChecked, setSelectedRadio }) => {
    const { t } = useTranslation();
    const handleChangeRadio = (event: React.SyntheticEvent<Element, Event>) => {
        setSelectedRadio([...selectedRadio, parseInt((event.target as HTMLInputElement).value)]);
    };
    const handleChecked = (event: React.SyntheticEvent<Element, Event>) => {
        setSelectedChecked([...selectedChecked, parseInt((event.target as HTMLInputElement).value)]);
    };
    return (
        <FormControl fullWidth sx={{
            height: '100%'
        }}>
            <FormLabel id="demo-radio-buttons-group-label">{t('Permissions')}</FormLabel>
            {
                Object.values(permission).map((perm: Admin[]) => perm.map((per: Admin) => {
                    return (
                        <Accordion sx={{ background: 'transparent', padding: 2 }} key={per.lang.name}>
                            <AccordionSummary expandIcon={<ExpandMore />}>
                                <Typography>{per.type}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FormControlLabel value={per.id} onChange={(e) => handleChangeRadio(e)} checked={selectedRadio[selectedRadio.indexOf(per.id)] === per.id} control={<Radio />} label={per.lang.name} />
                                <Grid container spacing={2}>
                                    {
                                        per?.children?.map((child: any, index: number) => {
                                            return (
                                                <Grid item xs={2} key={_.uniqueId()}>
                                                    <FormControlLabel value={child.id} checked={selectedChecked[selectedChecked.indexOf(child.id)] === child.id} onChange={(e) => handleChecked(e)} disabled={selectedRadio[selectedRadio.indexOf(per.id)] !== per.id} control={<Checkbox />} label={child.lang.name} />
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    )
                }))
            }
        </FormControl >
    )
}

export default Permissions