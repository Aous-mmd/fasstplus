import { DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { dialogAction } from '../../store/atom';

type Props = {
    name: string;
}
const ConfirmForm = (props: Props) => {
    const { t } = useTranslation();
    const dialogActionState = useRecoilState(dialogAction);
    return (
        <>
            <DialogTitle>
                {t('ConfirmMsg')}{" "}{dialogActionState[0].block ? t('Block/UnBlock') : dialogActionState[0].delete ? t('Delete') : t('Activate/deActivate')}?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {t('Reminder')}{" "}{dialogActionState[0].block ? t('Block/UnBlock') : dialogActionState[0].activate ? t('Activate/deActivate') : t('Delete')}{" "}{props.name}
                </DialogContentText>
            </DialogContent>
        </>
    )
}

export default ConfirmForm