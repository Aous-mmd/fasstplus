import React from 'react'
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { dialogAction } from '../../store/atom';
import { CGrid } from '../../components';
import { useAdminsColumns } from './hooks';
import ActionsDialog from '../../components/ActionsDialog';
import ApiList from '../../api/ApiList';

const Admins = () => {
  const columns = useAdminsColumns();
  const { t } = useTranslation();
  const stateActionType = useRecoilState(dialogAction);
  return (
    <>
      {
        stateActionType[0].open && (
          <ActionsDialog role='admin' />
        )
      }
      <CGrid
        role='admin'
        url={ApiList.AdminsList}
        columns={columns}
        addButton
        addButtonTitle={t('Add New Admin')!}
      />
    </>
  )
}

export default Admins